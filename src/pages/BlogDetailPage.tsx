import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiCalendar, FiEye, FiHeart, FiTag, FiShare2, FiBookmark, FiCheck } from 'react-icons/fi';
import StickyBlogSidebar from '../components/StickyBlogSidebar';
import { blogPosts, BlogPost } from '../data/blogPosts';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  
  // Find the blog post by id
  useEffect(() => {
    const blogPost = blogPosts.find(post => post.id === Number(id));
    if (blogPost) {
      setPost(blogPost);
      // Set page title
      document.title = `${blogPost.title} | Metalogics Blog`;
      // Initialize like count from the post data
      setLikeCount(blogPost.likes);
    }
    
    return () => {
      document.title = 'Metalogics Blog';
    };
  }, [id]);

  // Handle scroll and mouse effects
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

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  // Redirect if post not found
  useEffect(() => {
    if (id && !blogPosts.some(post => post.id === Number(id))) {
      navigate('/not-found');
    }
  }, [id, navigate]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // Sort posts by date for recent posts
  const recentPosts = [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featuredPosts = blogPosts.filter(post => post.featured);
  
  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Toggle bookmark
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Toggle like
  const toggleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  // Share functionality
  const handleShare = () => {
    // Mock share functionality - copy URL to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShowShareTooltip(true);
      setTimeout(() => {
        setShowShareTooltip(false);
      }, 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-purple-900 pt-16 pb-12 lg:pt-24 lg:pb-20"
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
        <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/blogs')}
            className="group mb-8 inline-flex items-center text-white/90 hover:text-white transition-colors duration-200 rounded-lg px-4 py-2 hover:bg-white/10 backdrop-blur-sm"
            aria-label="Back to blogs"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Blog
          </button>
          
          <div className="mt-6 max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={post.author.avatar}
                  alt={`${post.author.name}'s profile picture`}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/80 shadow-lg ring-2 ring-white/30"
                />
                <div>
                  <h3 className="text-sm font-medium text-white/90">{post.author.name}</h3>
                  <p className="text-xs text-white/70">{post.author.role}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm relative"
                    aria-label="Share this article"
                    onClick={handleShare}
                  >
                    <FiShare2 className="w-5 h-5" />
                  </motion.button>
                  {showShareTooltip && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-1">
                        <FiCheck className="w-3 h-3" />
                        <span>Link copied!</span>
                      </div>
                    </motion.div>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleBookmark}
                  className={`p-2 rounded-full hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm ${isBookmarked ? 'text-yellow-400' : 'text-white/80 hover:text-white'}`}
                  aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this article"}
                >
                  <FiBookmark className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            
            <div className="mb-3">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-600/80 text-white rounded-full backdrop-blur-sm shadow-lg">
                {post.category}
              </span>
            </div>
            
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight"
              style={{
                transform: `translate3d(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px, 0)`,
                transition: 'transform 0.2s ease-out'
              }}
            >
              {post.title}
            </h1>
            
            <p className="text-lg text-white/85 mb-6 font-light leading-relaxed max-w-4xl">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm mb-6">
              <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <FiCalendar className="mr-2 w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <FiClock className="mr-2 w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <FiEye className="mr-2 w-4 h-4" />
                <span>{post.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <FiHeart className="mr-2 w-4 h-4 text-red-400" />
                <span>{post.likes.toLocaleString()} likes</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-6" data-aos="fade-up" data-aos-delay="200">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30"
                >
                  <FiTag className="mr-1 w-3 h-3" aria-hidden="true" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <motion.div 
            className="flex-1 lg:w-3/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-10">
              <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={`Cover image for article: ${post.title}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {post.featured && (
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-yellow-500/90 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-lg font-medium shadow-lg">
                      Featured
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6 md:p-8 lg:p-10">
                <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-xl" data-aos="fade-up">
                  <div className="mt-6 text-gray-700 dark:text-gray-300">
                    {post.content}
                    
                    {/* Additional example content since the content field is very short in the data */}
                    <p className="mb-6 text-lg">
                      Performance is a crucial aspect of user experience in web development. With the growing complexity of web applications and the increasing expectations of users, optimizing web performance has become more important than ever. In this guide, we'll explore various techniques and best practices for improving your website's performance.
                    </p>
                    
                    <p className="mb-6">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lacus sit amet diam sagittis pulvinar. Curabitur vel risus nec est pulvinar fringilla eu sed neque. Sed vitae nisl eget nisl convallis commodo. Vivamus quis congue arcu. Sed sed nulla at eros consequat luctus. Nulla facilisi. Nulla vitae justo ac tortor posuere iaculis.
                    </p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl my-8 border-l-4 border-blue-500">
                      <p className="text-blue-800 dark:text-blue-200 italic mb-0">
                        "Performance isn't just a technical metric; it's a critical factor in user experience, SEO, and business success."
                      </p>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4 mt-8">Key Performance Metrics to Monitor</h2>
                    <p className="mb-4">
                      To effectively optimize your website's performance, you need to understand the key metrics that impact user experience:
                    </p>
                    
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li>
                        <strong>First Contentful Paint (FCP):</strong> Measures the time from navigation to when the browser renders the first piece of content
                      </li>
                      <li>
                        <strong>Largest Contentful Paint (LCP):</strong> Measures loading performance by timing when the largest content element becomes visible
                      </li>
                      <li>
                        <strong>Cumulative Layout Shift (CLS):</strong> Quantifies how much elements on the page move around during loading
                      </li>
                      <li>
                        <strong>First Input Delay (FID):</strong> Measures interactivity by timing how long it takes for the browser to respond to user input
                      </li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold mb-4 mt-8">Optimization Strategies</h2>
                    <p className="mb-4">
                      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed finibus eros vel nibh laoreet, vel tincidunt nisi pellentesque. In hac habitasse platea dictumst. Nam quis rutrum urna, vel dapibus odio. Donec id nulla nec nunc suscipit pulvinar.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl">
                        <h3 className="text-xl font-bold mb-3">Frontend Optimization</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Minimize and compress JavaScript and CSS</li>
                          <li>Implement lazy loading for images and components</li>
                          <li>Use efficient CSS selectors and animations</li>
                          <li>Optimize critical rendering path</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl">
                        <h3 className="text-xl font-bold mb-3">Backend Optimization</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Implement efficient caching strategies</li>
                          <li>Optimize database queries and indexes</li>
                          <li>Use CDNs for content delivery</li>
                          <li>Compress and minify server responses</li>
                        </ul>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4 mt-8">Measuring Impact</h2>
                    <p className="mb-4">
                      After implementing performance optimizations, it's essential to measure their impact to ensure they're delivering the expected results. Tools like Lighthouse, WebPageTest, and Google Analytics can help you track performance metrics over time.
                    </p>
                    
                    <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl my-8">
                      <h3 className="text-xl font-bold mb-4">Performance Optimization Checklist</h3>
                      <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li className="mb-2">Optimize images and use next-gen formats like WebP</li>
                        <li className="mb-2">Minimize render-blocking resources</li>
                        <li className="mb-2">Implement code splitting and lazy loading</li>
                        <li className="mb-2">Use browser caching effectively</li>
                        <li className="mb-2">Reduce server response times</li>
                        <li className="mb-2">Optimize CSS delivery and critical path</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Article footer with interactive buttons */}
                <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={post.author.avatar}
                        alt={`${post.author.name}'s profile picture`}
                        className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700"
                      />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Written by</p>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">{post.author.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{post.author.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleLike}
                        className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${
                          isLiked 
                            ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <FiHeart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-red-500'}`} />
                        <span>{isLiked ? 'Liked' : 'Like'}</span>
                        <span className="bg-gray-200 dark:bg-gray-600 rounded-full px-2 py-0.5 text-xs">
                          {likeCount.toLocaleString()}
                        </span>
                      </motion.button>
                      
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleShare}
                        className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium flex items-center gap-2 relative"
                      >
                        <FiShare2 className="w-4 h-4" />
                        <span>Share</span>
                        {showShareTooltip && (
                          <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: -28 }}
                            className="absolute -top-1 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                          >
                            <div className="flex items-center gap-1">
                              <FiCheck className="w-3 h-3" />
                              <span>Link copied!</span>
                            </div>
                          </motion.div>
                        )}
                      </motion.button>
                      
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleBookmark}
                        className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${
                          isBookmarked 
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <FiBookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                        <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sticky Sidebar */}
          <div className="lg:w-1/4 flex-shrink-0">
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

export default BlogDetailPage; 