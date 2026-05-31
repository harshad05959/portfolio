import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
    // Create transporter. If SMTP vars are not provided or connection fails,
    // fall back to Ethereal (dev-only) so you can test locally without real SMTP.
    let transporter;
    let usingEthereal = false;

    const hasSmtp = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
    if (hasSmtp) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
      try {
        await transporter.verify();
      } catch (err) {
        console.error('SMTP verify failed:', err.message || err);
        return res.status(500).json({
          error:
            'SMTP configuration invalid. Please check SMTP_HOST, SMTP_USER, SMTP_PASS, and use a valid Gmail App Password or SMTP provider credentials.'
        });
      }
    }

    if (!transporter) {
      // Dev/test account
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      usingEthereal = true;
    }

    const mailOptions = {
      from: process.env.FROM_EMAIL || process.env.SMTP_USER || 'no-reply@example.com',
      to: process.env.TO_EMAIL || process.env.FROM_EMAIL || 'harshadkothawale1@gmail.com',
      subject: `Portfolio contact from ${name} <${email}>`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email
    };

    const info = await transporter.sendMail(mailOptions);

    // Log detailed info for debugging
    console.log('Email sent, info:', {
      messageId: info.messageId,
      response: info.response
    });

    if (usingEthereal) {
      // Return preview URL for Ethereal so you can inspect the message
      const preview = nodemailer.getTestMessageUrl(info);
      console.log('Ethereal preview URL:', preview);
      return res.json({ ok: true, preview, messageId: info.messageId, usingEthereal: true });
    }

    return res.json({ ok: true, messageId: info.messageId, usingEthereal: false });
  } catch (err) {
    console.error('Email send error:', err);
    // Return error message to client for debugging (in dev only)
    return res.status(500).json({ error: err.message || 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Contact API listening on http://localhost:${port}`);
});
