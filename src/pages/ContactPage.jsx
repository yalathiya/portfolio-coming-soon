import React from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { profileData } from '../data/mockData';
import './ContactPage.css';

const ContactPage = () => {
  const contactMethods = [
    {
      icon: Github,
      label: 'GitHub',
      value: '@yalathiy',
      link: profileData.social.github,
      color: '#333333'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Yash Lathiya',
      link: profileData.social.linkedin,
      color: '#0077b5'
    },
    {
      icon: Mail,
      label: 'Email',
      value: profileData.social.email,
      link: `mailto:${profileData.social.email}`,
      color: '#00d4ff'
    }
  ];

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p className="contact-subtitle">
            I'm always interested in hearing about new opportunities, collaborations, or just having a technical discussion.
          </p>
        </div>

        <div className="contact-content">
          <Card className="contact-info-card">
            <CardContent className="contact-info-content">
              <div className="contact-intro">
                <MapPin className="location-icon" />
                <h2>Let's Connect</h2>
                <p>
                  Whether you have a question, want to discuss a project, or just want to say hi,
                  feel free to reach out through any of these channels.
                </p>
              </div>

              <div className="contact-methods">
                {contactMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <a
                      key={method.label}
                      href={method.link}
                      target={method.label !== 'Email' ? '_blank' : undefined}
                      rel={method.label !== 'Email' ? 'noopener noreferrer' : undefined}
                      className="contact-method"
                      style={{ '--hover-color': method.color }}
                    >
                      <div className="method-icon">
                        <IconComponent />
                      </div>
                      <div className="method-info">
                        <h3>{method.label}</h3>
                        <p>{method.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="contact-cta-section">
                <h3>Quick Actions</h3>
                <div className="quick-actions">
                  <Button asChild size="lg" className="action-btn">
                    <a href={`mailto:${profileData.social.email}`}>
                      <Mail className="mr-2" />
                      Send me an email
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="action-btn">
                    <a href={profileData.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2" />
                      Connect on LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="additional-info">
            <Card className="availability-card">
              <CardContent className="availability-content">
                <h3>Availability</h3>
                <p>
                  I'm currently open to freelance opportunities and interesting projects.
                  I typically respond within 24-48 hours.
                </p>
              </CardContent>
            </Card>

            <Card className="interests-card">
              <CardContent className="interests-content">
                <h3>Interested In</h3>
                <ul>
                  <li>Backend Development Projects</li>
                  <li>System Design Consulting</li>
                  <li>Database Optimization</li>
                  <li>Technical Writing & Speaking</li>
                  <li>Open Source Collaboration</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
