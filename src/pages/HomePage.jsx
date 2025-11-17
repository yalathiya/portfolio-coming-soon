import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Database, Server, Layers } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { profileData, blogPosts, projects } from '../data/mockData';
import './HomePage.css';

const HomePage = () => {
  const featuredPosts = blogPosts.filter(post => post.published).slice(0, 3);
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);

  const interestIcons = {
    'Low Latency Data Communication': Server,
    'Database Internals': Database,
    'System Design': Layers,
    'Backend Development': Code,
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{profileData.name}</h1>
            <p className="hero-subtitle">{profileData.title}</p>
            <p className="hero-tagline">{profileData.tagline}</p>
            <div className="hero-actions">
              <Button asChild size="lg" className="cta-button">
                <Link to="/projects">
                  View Projects
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="interests-section">
        <div className="container">
          <h2 className="section-title">Areas of Expertise</h2>
          <div className="interests-grid">
            {profileData.interests.map((interest) => {
              const IconComponent = interestIcons[interest] || Code;
              return (
                <Card key={interest} className="interest-card">
                  <CardContent className="interest-content">
                    <IconComponent className="interest-icon" />
                    <h3>{interest}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <Button asChild variant="ghost">
              <Link to="/projects">
                View All Projects
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.name} />
                </div>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="tech-stack">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="blog-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Latest Articles</h2>
            <Button asChild variant="ghost">
              <Link to="/blog">
                View All Posts
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
          <div className="blog-grid">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="blog-card">
                <CardHeader>
                  <div className="blog-meta">
                    <span className="blog-date">{post.date}</span>
                    <span className="blog-read-time">{post.readTime}</span>
                  </div>
                  <CardTitle className="blog-title">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="blog-tags">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                  <Link to={`/blog/${post.id}`} className="read-more">
                    Read More <ArrowRight size={16} />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
