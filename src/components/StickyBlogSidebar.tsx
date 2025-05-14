import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiStar, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import type { BlogPost } from '../data/blogPosts';
import { useNavigate } from 'react-router-dom';

interface StickyBlogSidebarProps {
  recentPosts: BlogPost[];
  featuredPosts: BlogPost[];
}

const StickyBlogSidebar: React.FC<StickyBlogSidebarProps> = ({ recentPosts, featuredPosts }) => {
  const navigate = useNavigate();
  
  const sidebarVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const handlePostClick = (postId: number) => {
    navigate(`/blogs/${postId}`);
  };

  const renderPost = (post: BlogPost) => (
    <motion.div
      key={post.id}
      variants={itemVariants}
      className="group flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 dark:hover:bg-gray-800 cursor-pointer relative"
      onClick={() => handlePostClick(post.id)}
      tabIndex={0}
      role="button"
      aria-label={`Read article: ${post.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handlePostClick(post.id);
        }
      }}
    >
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {post.title}
        </h4>
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <FiClock className="w-3 h-3" />
            {post.readTime}
          </div>
          <div className="flex items-center gap-1">
            <FiTrendingUp className="w-3 h-3" />
            {post.views.toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <FiArrowRight className="w-4 h-4 text-blue-500" />
      </div>
    </motion.div>
  );

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="sticky top-24 w-full lg:w-80 space-y-8"
    >
      {/* Featured Posts */}
      <motion.div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <FiStar className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Featured Posts</h3>
        </div>
        <div className="space-y-4">
          {featuredPosts.slice(0, 3).map((post) => renderPost(post))}
        </div>
      </motion.div>

      {/* Recent Posts */}
      <motion.div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <FiClock className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Posts</h3>
        </div>
        <div className="space-y-4">
          {recentPosts.slice(0, 5).map((post) => renderPost(post))}
        </div>
      </motion.div>
    </motion.aside>
  );
};

export default StickyBlogSidebar; 