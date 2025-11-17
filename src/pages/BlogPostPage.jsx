import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { blogPosts } from '../data/mockData';
import './BlogPostPage.css';
import 'highlight.js/styles/atom-one-dark.css';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);

  const post = blogPosts.find(p => p.id === slug);

  useEffect(() => {
    if (post) {
      // Load markdown file
      fetch(`/blogs/${post.markdownFile}`)
        .then(response => response.text())
        .then(text => {
          setMarkdownContent(text);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading markdown:', error);
          setMarkdownContent('# Error loading article\n\nSorry, this article could not be loaded.');
          setLoading(false);
        });
    }
  }, [post]);

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="not-found">
            <h1>Article Not Found</h1>
            <p>The article you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <div className="container">
        <Button asChild variant="ghost" className="back-button">
          <Link to="/blog">
            <ArrowLeft className="mr-2" />
            Back to Blog
          </Link>
        </Button>

        <article className="blog-post">
          <header className="post-header">
            <div className="post-meta">
              <span className="meta-item">
                <Calendar size={16} />
                {post.date}
              </span>
              <span className="meta-item">
                <Clock size={16} />
                {post.readTime}
              </span>
            </div>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-tags">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </header>

          <div className="post-content">
            {loading ? (
              <div className="loading">Loading article...</div>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
              >
                {markdownContent}
              </ReactMarkdown>
            )}
          </div>
        </article>

        <div className="post-footer">
          <h3>More Articles</h3>
          <div className="related-posts">
            {blogPosts
              .filter(p => p.id !== slug && p.published)
              .slice(0, 3)
              .map(relatedPost => (
                <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="related-post-link">
                  <div className="related-post">
                    <h4>{relatedPost.title}</h4>
                    <p>{relatedPost.excerpt}</p>
                    <div className="related-meta">
                      <span>{relatedPost.date}</span>
                      <span>•</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
