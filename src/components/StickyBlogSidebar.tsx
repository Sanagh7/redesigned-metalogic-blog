import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiStar, FiTrendingUp } from 'react-icons/fi';
import type { BlogPost } from '../data/blogPosts';

interface StickyBlogSidebarProps {
  recentPosts: BlogPost[];
  featuredPosts: BlogPost[];
}

const StickyBlogSidebar: React.FC<StickyBlogSidebarProps> = ({ recentPosts, featuredPosts }) => {
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

  const renderPost = (post: BlogPost) => (
    <motion.div
      variants={itemVariants}
      className="group flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
    >
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {post.title}
        </h4>
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
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
      <motion.div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <FiStar className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">Featured Posts</h3>
        </div>
        <div className="space-y-4">
          {featuredPosts.slice(0, 3).map((post) => renderPost(post))}
        </div>
      </motion.div>

      {/* Recent Posts */}
      <motion.div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <FiClock className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Recent Posts</h3>
        </div>
        <div className="space-y-4">
          {recentPosts.slice(0, 5).map((post) => renderPost(post))}
        </div>
      </motion.div>
    </motion.aside>
  );
};

export default StickyBlogSidebar; 