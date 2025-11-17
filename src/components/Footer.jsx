import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Code } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Code className="footer-logo-icon" />
              <span>Yash Lathiya</span>
            </div>
            <p className="footer-tagline">
              Software Engineer specializing in backend systems and performance optimization
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Navigation</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/projects">Projects</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Connect</h4>
              <ul className="social-links">
                <li>
                  <a href="https://github.com/yalathiy" target="_blank" rel="noopener noreferrer">
                    <Github className="social-icon" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/yash-a-lathiya" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="social-icon" />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="mailto:yalathiya.it@gmail.com">
                    <Mail className="social-icon" />
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Yash Lathiya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
