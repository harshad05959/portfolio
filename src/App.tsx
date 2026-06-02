import { useEffect, useState } from 'react';
import ContactForm from './ContactForm';

const sections = [
  {
    id: 'about',
    title: 'About',
    description:
      'I am Harshad, a software engineer who thrives on exploring new approaches and solving hard problems with clean, high-impact solutions. I build thoughtful interfaces and backend systems that feel intuitive and perform reliably. I am open to work now and ready to contribute immediately.',
    items: [
      'Designing responsive web systems with modern front-end architecture',
      'Delivering API-driven back ends and scalable service integrations',
      'Writing maintainable code with strong quality and testing habits',
      'Improving user experiences through performance and accessibility'
    ]
  },
  {
    id: 'skills',
    title: 'Skills',
    description: 'The technology and product skills I use to bring ideas from exploration to launch.',
    items: [
      'Languages: C, C++, Java, JavaScript, SQL',
      'Developer Tools: VS Code, Eclipse, IntelliJ IDEA',
      'Technologies / Frameworks: Linux, GitHub, Express.js, React.js',
      'Databases & APIs: MongoDB, REST APIs, Node.js'
    ]
  }
];

const projects = [
  {
    title: 'Multimodal Emotion Detection System',
    stack: 'Python, BERT, CNN, MFCC, TensorFlow, MELD Dataset',
    bullets: [
      'Designed and developed a multimodal emotion recognition system combining text and audio inputs to overcome single-modality limitations and improve detection accuracy.',
      'Implemented text-based emotion recognition module using BERT algorithm for contextual understanding and emotion prediction from textual data.',
      'Built audio-based emotion recognition pipeline using MFCC feature extraction from speech signals with CNN architecture trained on the MELD dataset.',
      'Achieved superior emotion detection performance by fusing textual and vocal emotional cues, providing reliable emotion-aware insights for virtual assistants, sentiment analysis, mental health monitoring, and human-computer interaction systems.',
      'Optimized model inference to reduce latency while maintaining high accuracy across multiple emotion classes (happy, sad, angry, neutral, surprised, disgusted, fearful).'
    ]
  },
  {
    title: 'ShareMeal',
    stack: 'MongoDB, Express.js, React.js, Node.js',
    bullets: [
      'Developed a full-stack web platform to connect mess facilities with local NGOs for surplus food donations, ensuring seamless coordination across users.',
      'Designed and deployed a responsive React interface for mess owners and agencies to register, authenticate, and manage donation activities.',
      'Optimized backend performance using MongoDB with query response times below 300ms for donation logs, agency profiles, and historical records.',
      'Implemented location-based filtering to match donors with nearby NGOs in real time, improving distribution speed during high-demand periods.'
    ]
  },
  {
    title: 'Lifeline Connect',
    stack: 'MongoDB, Express.js, React.js, Node.js',
    bullets: [
      'Built a MERN-based real-time platform connecting doctors with compatible blood donors during emergencies.',
      'Implemented role-based dashboards for doctors and donors to manage requests, availability, and participation securely.',
      'Designed a responsive UI for rapid request posting and efficient emergency coordination.',
      'Integrated MongoDB to store donor profiles, blood groups, and request logs for reliable data retrieval.'
    ]
  }
];

const achievements = [
  {
    label: 'ICPC Asia West Regionalist 2025',
    value: 'Rank 272',
    detail: 'Achieved All India Rank 323 in ICPC Preliminary Round.'
  },
  {
    label: 'Coderush 4.0 Finalist',
    value: 'International Hackathon',
    detail: 'Finalist in competitive programming + technical event organized by Indus Valley Partners.'
  },
  {
    label: 'CodeChef 4-Star',
    value: 'Peak rating 1802',
    detail: 'Ranked among the top 2% of Indian users on CodeChef.'
  },
  {
    label: 'Codeforces Expert',
    value: 'Max rating 1639',
    detail: 'Achieved Expert title on Codeforces through algorithmic contest performance.'
  },
  {
    label: 'LeetCode & GFG Ratings',
    value: '1800+ / 1900+',
    detail: 'Ranked in the top 4% globally on LeetCode and maintained a strong GeeksforGeeks score.'
  }
];

const experience = [
  {
    date: 'Upcoming',
    title: 'Upcoming — Software Engineer at Barclays',
    bullets: [
      'Joining Barclays as a Software Engineer — focused on scalable services and front-end reliability.',
      'Ready to contribute to cross-functional teams and delivery of production-grade systems.'
    ]
  },
  {
    date: 'Jan 2026 – Present',
    title: 'Sears - SDE Intern',
    bullets: [
      'Integrated REST APIs into frontend components to fetch and manage application data using React.',
      'Developed responsive frontend pages and implemented efficient client-side logic for dynamic data rendering.',
      'Implemented unit tests using Vitest, improving reliability and maintainability of frontend components.',
      'Created and configured technical offers for the rewards system, enabling automated promotional and incentive campaigns.',
      'Collaborated with cross-functional teams using Git-based workflows for feature development and code reviews.'
    ]
  },
  {
    date: 'Aug 2025 – Sept 2025',
    title: 'GeeksforGeeks - DSA Mentor Intern',
    bullets: [
      'Guided 50+ learners in mastering Data Structures & Algorithms with strong focus on coding interviews.',
      'Delivered 1:1 mentorship and group sessions on problem-solving, competitive programming, and optimization techniques.',
      'Helped reduce average problem-solving time by 30% through structured practice and personalized feedback.',
      'Explained competitive programming and interview-based problems, boosting students algorithmic thinking.'
    ]
  }
];

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme') as 'light' | 'dark' | null;
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const nextTheme = saved || preferred;
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home">
          Harshad Kothavale
        </a>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#achievements">Achievements</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </header>

      <main>
        <section className="hero fade-up" id="home">
          <div className="hero-copy">
            <div className="hero-badge">Open to work now</div>
            <span className="eyebrow">Software Engineer • Full Stack Developer</span>
            <h1>Exploring problems and building elegant solutions that feel fast, clear, and dependable.</h1>
            <p>
              I solve real product challenges with thoughtful UI, robust back-end systems, and a collaborative engineering approach. Every page and interaction is built to be delightful, accessible, and efficient.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="/Harshad_Kothavale_Resume_ IT.pdf" target="_blank" rel="noreferrer">
                Download Resume
              </a>
              <a className="button secondary" href="#contact">
                Contact Me
              </a>
            </div>
          </div>
          <div className="hero-panel fade-up card-panel">
            <div className="panel-card">
              <h2>What I solve</h2>
              <p>Customer-facing journeys, growth-focused features, and the technical foundations behind smooth product experiences.</p>
            </div>
            <div className="panel-grid">
              <div className="stat-card">
                <span>Fresher</span>
                <p>Experience</p>
              </div>
              <div className="stat-card">
                <span>10+</span>
                <p>Projects shipped</p>
              </div>
              <div className="stat-card">
                <span>10+</span>
                <p>Tools mastered</p>
              </div>
            </div>
            <div className="panel-card open-card">
              <h3>Open to work now</h3>
              <p>Actively available for software engineering roles and ready to start new projects immediately.</p>
              <a className="button tertiary" href="https://codolio.com/profile/codefun" target="_blank" rel="noreferrer">
                View Codolio highlights
              </a>
            </div>
          </div>
        </section>

        {sections.map((section) => (
          <div key={section.id}>
            <section className="section fade-up" id={section.id}>
              <div className="section-header">
                <span>{section.title}</span>
                <h2>{section.title === 'Skills' ? 'Core strengths' : 'About me'}</h2>
              </div>
              <div className="section-body">
                <div className="section-copy">
                  <p>{section.description}</p>
                </div>
                <div className="section-list">
                  {section.items.map((item) => (
                    <div className="section-card fade-up" key={item}>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {section.id === 'about' && (
              <section className="section achievements-section fade-up" id="achievements">
                <div className="section-header">
                  <span>Achievements</span>
                  <h2>Impact highlights</h2>
                </div>
                <div className="achievements-grid">
                  {achievements.map((achievement) => (
                    <div className="achievement-card" key={achievement.label}>
                      <strong>{achievement.value}</strong>
                      <p className="achievement-label">{achievement.label}</p>
                      <p>{achievement.detail}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        ))}

        <section className="section projects-section fade-up" id="projects">
          <div className="section-header">
            <span>Projects</span>
            <h2>Recent work</h2>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <div className="project-card fade-up" key={project.title}>
                <h3>{project.title}</h3>
                <p className="project-stack">{project.stack}</p>
                <ul>
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="section experience-section fade-up" id="experience">
          <div className="section-header">
            <span>Experience</span>
            <h2>Professional journey</h2>
          </div>
          <div className="timeline">
            {experience.map((item) => (
              <div className="timeline-item" key={item.title}>
                <span className="timeline-date">{item.date}</span>
                <div>
                  <h3>{item.title}</h3>
                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section contact-section fade-up" id="contact">
          <div className="section-header">
            <span>Contact</span>
            <h2>Ready to collaborate?</h2>
          </div>
            <div className="contact-grid">
            <div className="contact-copy">
              <p>If you have a project or opportunity, let&rsquo;s connect. I respond quickly and enjoy working with teams to turn ideas into polished products.</p>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:harshadkothawale1@gmail.com">harshadkothawale1@gmail.com</a>
              </p>
              <p>
                <strong>Resume:</strong>{' '}
                <a href="/Harshad_Kothavale_Resume_ IT.pdf" target="_blank" rel="noreferrer">
                  Download resume
                </a>
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-left">
            <a href="/Harshad_Kothavale_Resume_ IT.pdf" target="_blank" rel="noreferrer">Resume</a>
            <span className="sep">•</span>
            <a href="mailto:harshadkothawale1@gmail.com">harshadkothawale1@gmail.com</a>
          </div>
          <div className="footer-center">
            <nav className="footer-nav">
              <a href="#about">About</a>
              <a href="#achievements">Achievements</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#experience">Experience</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
          <div className="footer-right">
            <a href="https://codolio.com/profile/codefun" target="_blank" rel="noreferrer">Codolio</a>
            <span className="sep">•</span>
            <span>© {new Date().getFullYear()} Harshad Kothavale</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
