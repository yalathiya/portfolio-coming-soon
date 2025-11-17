import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { blogPosts } from '../data/mockData';
import './BlogPage.css';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  // Get all unique tags
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

  // Filter posts based on search and tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag && post.published;
  });

  return (
    <div className="blog-page">
      <div className="container">
        <div className="blog-header">
          <h1>Technical Blog</h1>
          <p className="blog-subtitle">
            Deep dives into backend development, system design, and database internals
          </p>
        </div>

        <div className="blog-filters">
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          
          <div className="tag-filters">
            <Badge
              variant={!selectedTag ? 'default' : 'outline'}
              className="tag-filter"
              onClick={() => setSelectedTag(null)}
            >
              All Topics
            </Badge>
            {allTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? 'default' : 'outline'}
                className="tag-filter"
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="blog-list">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <Card key={post.id} className="blog-item">
                <CardHeader>
                  <div className="blog-item-meta">
                    <span className="blog-date">{post.date}</span>
                    <span className="blog-read-time">{post.readTime}</span>
                  </div>
                  <Link to={`/blog/${post.id}`}>
                    <CardTitle className="blog-item-title">{post.title}</CardTitle>
                  </Link>
                  <CardDescription className="blog-item-excerpt">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="blog-item-footer">
                    <div className="blog-item-tags">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    <Link to={`/blog/${post.id}`} className="read-more-link">
                      Read More <ArrowRight size={16} />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="no-results">
              <p>No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
