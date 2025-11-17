import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { projects } from '../data/mockData';
import './ProjectsPage.css';

const ProjectsPage = () => {
  return (
    <div className="projects-page">
      <div className="container">
        <div className="projects-header">
          <h1>Projects</h1>
          <p className="projects-subtitle">
            A collection of projects showcasing my work in backend development, system design, and performance optimization
          </p>
        </div>

        <div className="projects-grid-page">
          {projects.map(project => (
            <Card key={project.id} className="project-card-page">
              <div className="project-image-page">
                <img src={project.image} alt={project.name} />
                {project.featured && (
                  <Badge className="featured-badge">Featured</Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle className="project-title-page">{project.name}</CardTitle>
                <CardDescription className="project-description-page">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="project-tech-stack">
                  {project.techStack.map(tech => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
                <div className="project-links">
                  {project.github && (
                    <Button asChild variant="outline" size="sm">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2" size={16} />
                        View Code
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button asChild size="sm">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2" size={16} />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
