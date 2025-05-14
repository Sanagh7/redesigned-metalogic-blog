import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BlogCard from '../components/BlogCard';
import BlogCardSkeleton from '../components/BlogCardSkeleton';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import StickyBlogSidebar from '../components/StickyBlogSidebar';
import type { BlogPost } from '../data/blogPosts';
import { blogPosts } from '../data/blogPosts';
import { FiTrendingUp, FiSearch, FiBookOpen, FiUsers, FiLoader } from 'react-icons/fi';

const POSTS_PER_PAGE = 6;

const BlogPage: React.FC = () => {
  const categories = ['All', ...new Set(blogPosts.map(p => p.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(true);

  // Filter posts based on category and search term
  const filtered = blogPosts.filter((p: BlogPost) =>
    (selectedCategory === 'All' || p.category === selectedCategory) &&
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get posts for current page
  const displayedPosts = filtered.slice(0, page * POSTS_PER_PAGE);
  const featuredPosts = blogPosts.filter(post => post.featured);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !isLoading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  // Mouse and scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [selectedCategory, searchTerm]);

  // Check if there are more posts to load
  useEffect(() => {
    setHasMore(page * POSTS_PER_PAGE < filtered.length);
  }, [page, filtered.length]);

  const loadMorePosts = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setPage(prev => prev + 1);
      setIsLoading(false);
    }, 800);
  }, [isLoading, hasMore]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  // Sort posts by date for recent posts
  const recentPosts = [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const stats = [
    { icon: FiBookOpen, label: 'Articles', value: blogPosts.length },
    { icon: FiUsers, label: 'Authors', value: new Set(blogPosts.map(p => p.author.name)).size },
    { icon: FiSearch, label: 'Categories', value: categories.length - 1 },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-purple-900 py-24 md:py-32 pt-28 md:pt-40"
      >
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
              style={{
                background: `radial-gradient(circle, ${
                  ['#60A5FA', '#818CF8', '#A78BFA', '#C084FC', '#E879F9'][i]
                } 0%, transparent 70%)`,
                width: `${Math.random() * 40 + 20}rem`,
                height: `${Math.random() * 40 + 20}rem`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                transform: `translate3d(${mousePosition.x * (i + 1)}px, ${mousePosition.y * (i + 1)}px, 0)`,
                transition: 'transform 0.2s ease-out'
              }}
            />
          ))}
        </div>

        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-black opacity-30"
          style={{ transform: `translate3d(0, ${scrollY * 0.5}px, 0)` }}
        />
        <div 
          className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20"
          style={{ transform: `translate3d(0, ${scrollY * 0.2}px, 0)` }}
        />
        
        {/* Hero Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
              style={{
                transform: `translate3d(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px, 0)`,
                transition: 'transform 0.2s ease-out'
              }}
            >
              <span className="inline-block animate-float" style={{ animationDelay: '0s' }}>
                Explore
              </span>{' '}
              <span className="inline-block animate-float" style={{ animationDelay: '0.2s' }}>
                Our
              </span>{' '}
              <span className="inline-block bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent animate-float" style={{ animationDelay: '0.4s' }}>
                Blog
              </span>
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light mb-12"
              style={{
                transform: `translate3d(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px, 0)`,
                transition: 'transform 0.2s ease-out'
              }}
            >
              Discover insights, tutorials, and updates from our team of experts
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="relative group"
                  style={{
                    transform: `translate3d(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px, 0)`,
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  <div className="absolute inset-0 bg-white/10 rounded-xl blur-xl transition-all duration-300 group-hover:bg-white/20" />
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 group-hover:bg-white/20">
                    <stat.icon className="w-8 h-8 text-white/90 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-white mb-1 animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-0 right-0 mx-auto w-fit flex flex-col items-center animate-bounce z-50">
          <div className="w-1 h-8 rounded-full bg-white/20 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-full h-full bg-white/80 animate-[scroll_2s_ease-in-out_infinite]" />
          </div>
          <span className="text-white/80 text-sm mt-2 px-4 py-1 rounded-full bg-black/10 backdrop-blur-sm">Scroll to explore</span>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <motion.div 
            className="flex-1"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Featured Posts Section */}
            {featuredPosts.length > 0 && (
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 mb-16">
                <motion.div 
                  className="flex items-center gap-3 mb-8"
                  variants={itemVariants}
                >
                  <FiTrendingUp className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Featured Posts</h2>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredPosts.map((post, i) => (
                    <motion.div
                      key={post.id}
                      variants={itemVariants}
                      className="h-full"
                      data-aos="fade-up"
                      data-aos-delay={i * 100}
                    >
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Content */}
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10"
              variants={itemVariants}
            >
              <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
              </div>
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
                onSelect={(category) => {
                  setSelectedCategory(category);
                  setPage(1);
                }}
        />
              
              {filtered.length === 0 ? (
                <motion.div 
                  className="text-center py-16"
                  variants={itemVariants}
                >
                  <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                    No posts found
                  </h2>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-10">
                    {displayedPosts.map((post, i) => (
                      <motion.div
                        key={post.id}
                        variants={itemVariants}
                        className="h-full"
                        data-aos="fade-up"
                        data-aos-delay={i * 100}
                      >
                        <BlogCard post={post} />
                      </motion.div>
                    ))}
                    {isLoading && (
                      Array(POSTS_PER_PAGE).fill(null).map((_, i) => (
                        <div key={`skeleton-${i}`} data-aos="fade-up">
                          <BlogCardSkeleton />
                        </div>
                      ))
                    )}
                  </div>
                  
                  {/* Loading indicator */}
                  {(hasMore || isLoading) && (
                    <div 
                      ref={loadingRef}
                      className="flex items-center justify-center py-12"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <FiLoader className={`w-8 h-8 text-blue-600 ${isLoading ? 'animate-spin' : ''}`} />
                        <p className="text-gray-500 text-sm">
                          {isLoading ? 'Loading more posts...' : 'Scroll to load more'}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Sticky Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <StickyBlogSidebar
              recentPosts={recentPosts}
              featuredPosts={featuredPosts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
