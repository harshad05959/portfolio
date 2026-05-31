# Portfolio (Harshad Kothavale)

This is a Vite + React + TypeScript portfolio with a small Express contact API using Nodemailer.

Quick local run

1. Install deps
```
npm install
```

2. Start the backend server
```
npm run server
```

3. Start the frontend dev server
```
npm run dev
```

Deployment (Vercel + Render)

1. Push this repo to GitHub (replace with your repo URL):
```
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/harshad05959/portfolio.git
git branch -M main
git push -u origin main
```

2. Backend on Render
- New → Web Service → Connect GitHub repo
- Build command: `npm install`
- Start command: `npm run server`
- Set Environment Variables from `.env.example` on Render (SMTP_* and TO_EMAIL)

3. Frontend on Vercel
- New Project → Import GitHub repo
- Framework Preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- If your backend is deployed on Render, set `VITE_API_URL=https://<your-backend>` in Vercel env and update frontend to use it.

Notes
- If you use Gmail SMTP, create an App Password and set `SMTP_PASS` to that value.
- For quick testing without real SMTP, the backend falls back to Ethereal and returns a preview URL in responses (dev-only).

If you want, I can push this code to your GitHub repo now and help connect Vercel and Render.# React Portfolio Website

This folder now contains a React-based portfolio front page built with Vite.

## Files

- `package.json` — React/Vite dependencies and scripts
- `vite.config.ts` — Vite configuration for React
- `tsconfig.json` — TypeScript settings
- `src/main.tsx` — React application entry point
- `src/App.tsx` — portfolio landing page UI
- `src/index.css` — global UI styling
- `Harshad_Kothavale_Resume_ IT.pdf` — resume file included for download

## Run locally

1. Open a terminal in this folder.
2. Run `npm install`.
3. Start the backend email API server in a separate terminal (see below).
4. Run `npm run dev`.
5. Open the local URL shown in the terminal.

## Notes

- Replace the example content with your real text, projects, and contact info.
- Update the email address in `src/App.tsx` to your actual contact email.
- The resume download link points to the PDF at the project root.

## Backend Email API

This project includes a simple Express + Nodemailer API at `server/index.js` used to send contact form messages to your email. You must provide SMTP credentials as environment variables before running the server.

Create a `.env` file in the project root with these values (example):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=harshadkothawale1@gmail.com
SMTP_PASS=your_gmail_app_password
FROM_EMAIL=harshadkothawale1@gmail.com
TO_EMAIL=harshadkothawale1@gmail.com
```

Important: copy `.env.example` to `.env` and fill in your password there. `.env.example` is only a template and is not loaded by the server.

For Gmail, use an App Password rather than your regular Gmail account password.

Start the server:

```bash
npm run server
```

Then start the frontend in a separate terminal:

```bash
npm run dev
```

The contact form in the site will POST to `http://localhost:3001/api/contact` (adjust `server/index.js` PORT if needed).
