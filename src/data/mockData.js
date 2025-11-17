// Mock data for Yash Lathiya's Portfolio

export const profileData = {
  name: "Yash Lathiya",
  title: "Software Engineer",
  tagline: "Building scalable backend systems with focus on performance",
  bio: "I'm a passionate software engineer specializing in low latency data communication, database internals, and system design. I love diving deep into backend development and creating efficient, scalable solutions.",
  interests: [
    "Low Latency Data Communication",
    "Database Internals",
    "System Design",
    "Backend Development"
  ],
  social: {
    github: "https://github.com/yalathiy",
    linkedin: "https://www.linkedin.com/in/yash-a-lathiya",
    email: "yalathiya.it@gmail.com"
  }
};

export const blogPosts = [
  {
    id: "understanding-database-indexes",
    title: "Understanding Database Indexes: B-Trees vs LSM-Trees",
    excerpt: "A deep dive into how different database index structures work and when to use each one for optimal performance.",
    date: "2025-01-15",
    readTime: "8 min read",
    tags: ["Database", "Performance", "Data Structures"],
    markdownFile: "understanding-database-indexes.md",
    published: true
  },
  {
    id: "low-latency-communication",
    title: "Achieving Low Latency in Distributed Systems",
    excerpt: "Techniques and patterns for building ultra-low latency communication systems including TCP optimizations and zero-copy strategies.",
    date: "2025-01-10",
    readTime: "12 min read",
    tags: ["System Design", "Performance", "Networking"],
    markdownFile: "low-latency-communication.md",
    published: true
  },
  {
    id: "microservices-patterns",
    title: "Essential Microservices Patterns Every Backend Engineer Should Know",
    excerpt: "Explore critical patterns like Circuit Breaker, Saga, and API Gateway that are essential for building robust microservices architectures.",
    date: "2025-01-05",
    readTime: "10 min read",
    tags: ["Microservices", "Backend", "Architecture"],
    markdownFile: "microservices-patterns.md",
    published: true
  },
  {
    id: "postgres-query-optimization",
    title: "PostgreSQL Query Optimization Techniques",
    excerpt: "Learn how to analyze and optimize PostgreSQL queries using EXPLAIN, proper indexing strategies, and query rewriting techniques.",
    date: "2024-12-28",
    readTime: "15 min read",
    tags: ["PostgreSQL", "Database", "Optimization"],
    markdownFile: "postgres-query-optimization.md",
    published: true
  }
];

export const projects = [
  {
    id: "distributed-cache",
    name: "Distributed Cache System",
    description: "A high-performance distributed caching system built with Redis and Go, supporting consistent hashing and automatic failover.",
    techStack: ["Go", "Redis", "Docker", "Kubernetes"],
    github: "https://github.com/yalathiy/distributed-cache",
    liveUrl: null,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    featured: true
  },
  {
    id: "realtime-analytics",
    name: "Real-time Analytics Pipeline",
    description: "Stream processing pipeline for real-time analytics using Apache Kafka, processing millions of events per second with low latency.",
    techStack: ["Kafka", "Python", "ClickHouse", "Grafana"],
    github: "https://github.com/yalathiy/realtime-analytics",
    liveUrl: null,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    featured: true
  },
  {
    id: "database-profiler",
    name: "Database Query Profiler",
    description: "A tool for profiling and analyzing database query performance with detailed execution plans and recommendations.",
    techStack: ["Node.js", "PostgreSQL", "React", "D3.js"],
    github: "https://github.com/yalathiy/db-profiler",
    liveUrl: "https://db-profiler-demo.com",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    featured: true
  },
  {
    id: "api-gateway",
    name: "Lightweight API Gateway",
    description: "A fast, lightweight API gateway with rate limiting, authentication, and request routing capabilities.",
    techStack: ["Rust", "Redis", "PostgreSQL", "Docker"],
    github: "https://github.com/yalathiy/api-gateway",
    liveUrl: null,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop",
    featured: false
  }
];
