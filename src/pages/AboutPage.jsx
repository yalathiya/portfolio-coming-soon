import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { profileData } from '../data/mockData';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-hero">
          <h1>About Me</h1>
          <p className="about-subtitle">Software Engineer • Backend Specialist • Performance Enthusiast</p>
        </div>

        <div className="about-content">
          <Card className="bio-card">
            <CardContent className="bio-content">
              <h2>Hello! I'm Yash Lathiya</h2>
              <p>{profileData.bio}</p>
              <p>
                My journey in software engineering has been driven by a passion for creating 
                efficient, scalable systems that can handle massive scale. I believe that 
                understanding how things work at a fundamental level - from database internals 
                to network protocols - is key to building truly performant systems.
              </p>
              <p>
                When I'm not coding, you'll find me exploring the latest database technologies, 
                reading technical papers, or contributing to open-source projects. I'm always 
                eager to learn and share knowledge with the community.
              </p>
            </CardContent>
          </Card>

          <div className="interests-detail">
            <h2>What I Focus On</h2>
            <div className="interests-list">
              {profileData.interests.map((interest, index) => (
                <Card key={index} className="interest-detail-card">
                  <CardContent className="interest-detail-content">
                    <h3>{interest}</h3>
                    <p>{getInterestDescription(interest)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="contact-cta">
            <h2>Let's Connect</h2>
            <p>I'm always open to interesting conversations and collaboration opportunities.</p>
            <div className="social-buttons">
              <Button asChild size="lg" className="social-btn">
                <a href={profileData.social.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2" />
                  GitHub
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="social-btn">
                <a href={profileData.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="social-btn">
                <a href={`mailto:${profileData.social.email}`}>
                  <Mail className="mr-2" />
                  Email Me
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getInterestDescription = (interest) => {
  const descriptions = {
    'Low Latency Data Communication': 'Optimizing data transfer and communication protocols for microsecond-level latency. Experience with TCP/UDP optimizations, zero-copy techniques, and high-performance networking.',
    'Database Internals': 'Deep understanding of database architecture, storage engines, query optimization, and indexing strategies. Exploring B-Trees, LSM-Trees, and distributed database consensus protocols.',
    'System Design': 'Designing scalable, reliable distributed systems. Focus on trade-offs, CAP theorem, consistency models, and architectural patterns for high-availability systems.',
    'Backend Development': 'Building robust, performant backend services with clean architecture. Experience with microservices, API design, caching strategies, and message queues.'
  };
  return descriptions[interest] || 'Passionate about creating efficient and scalable solutions.';
};

export default AboutPage;
