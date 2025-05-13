export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
  views: number;
  likes: number;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Scalable Web Applications with Next.js and TypeScript",
    excerpt: "Learn how to create enterprise-grade applications using Next.js and TypeScript, with best practices for performance and maintainability.",
    content: "Next.js has become the go-to framework for building modern web applications...",
    category: "Development",
    author: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      role: "Senior Developer"
    },
    date: "2024-03-15",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3",
    tags: ["Next.js", "TypeScript", "React", "Performance"],
    views: 1520,
    likes: 89,
    featured: true
  },
  {
    id: 2,
    title: "Mastering Modern CSS: A Deep Dive into New Features",
    excerpt: "Explore the latest CSS features like Container Queries, Cascade Layers, and CSS Grid that are revolutionizing web development.",
    content: "CSS has evolved significantly over the past few years...",
    category: "Design",
    author: {
      name: "Sarah Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      role: "UI/UX Designer"
    },
    date: "2024-03-14",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3",
    tags: ["CSS", "Web Design", "Frontend"],
    views: 982,
    likes: 45,
    featured: false
  },
  {
    id: 3,
    title: "Advanced State Management Patterns in React",
    excerpt: "Deep dive into modern state management solutions including Redux Toolkit, Zustand, and React Query.",
    content: "State management continues to be a crucial aspect of web development...",
    category: "Development",
    author: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      role: "Lead Developer"
    },
    date: "2024-03-13",
    readTime: "10 min read",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3",
    tags: ["React", "Redux", "State Management"],
    views: 2341,
    likes: 167,
    featured: true
  },
  {
    id: 4,
    title: "Creating Responsive and Accessible Web Designs",
    excerpt: "Learn the principles of responsive design and accessibility to create websites that work for everyone.",
    content: "In today's mobile-first world, responsive design is more important than ever...",
    category: "Design",
    author: {
      name: "Emma Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      role: "Accessibility Specialist"
    },
    date: "2024-03-12",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3",
    tags: ["Responsive Design", "Accessibility", "CSS"],
    views: 1123,
    likes: 72,
    featured: false
  },
  {
    id: 5,
    title: "Optimizing Web Performance: A Complete Guide",
    excerpt: "Comprehensive guide to improving your website's performance through various optimization techniques.",
    category: "Performance",
    author: {
      name: "Alex Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      role: "Performance Engineer"
    },
    date: "2024-03-11",
    readTime: "12 min read",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3",
    content: "Performance is a crucial aspect of user experience...",
    tags: ["Performance", "Optimization", "Web Vitals"],
    views: 3102,
    likes: 234,
    featured: true
  },
  {
    id: 6,
    title: "Building Accessible Web Applications",
    excerpt: "Learn how to create web applications that are accessible to everyone, including users with disabilities.",
    category: "Accessibility",
    author: {
      name: "Chris Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chris",
      role: "Frontend Developer"
    },
    date: "2024-03-10",
    readTime: "9 min read",
    imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3",
    content: "Web accessibility is not just a nice-to-have feature...",
    tags: ["Accessibility", "ARIA", "Semantic HTML"],
    views: 892,
    likes: 56,
    featured: false
  }
]; 