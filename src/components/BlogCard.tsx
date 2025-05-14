import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiArrowRight, FiEye, FiHeart, FiTag } from 'react-icons/fi';
import type { BlogPost } from '../data/blogPosts';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const cardRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blogs/${post.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleReadMore();
    }
  };

  return (
    <article 
      ref={cardRef}
      className="group bg-white rounded-2xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full flex flex-col focus-within:ring-2 focus-within:ring-blue-500 focus-within:outline-none"
      tabIndex={0}
      role="article"
      aria-labelledby={`article-title-${post.id}`}
      onKeyDown={handleKeyDown}
    >
      <div className="relative h-48 sm:h-52 md:h-56 lg:h-64 overflow-hidden">
        <img
          src={post.imageUrl}
          alt={`Cover image for article: ${post.title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-60" aria-hidden="true"></div>
        {post.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-yellow-500/90 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-lg font-medium shadow-lg animate-float" role="badge" aria-label="Featured article">
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className="bg-blue-600/90 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg font-medium shadow-lg transition-all duration-300 group-hover:bg-blue-500/90" role="badge" aria-label={`Category: ${post.category}`}>
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-4 mb-4 transform transition-all duration-300 group-hover:translate-x-2">
          <img
            src={post.author.avatar}
            alt={`${post.author.name}'s profile picture`}
            className="w-10 h-10 rounded-full border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-110"
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">{post.author.name}</h3>
            <p className="text-xs text-gray-500" aria-label={`Role: ${post.author.role}`}>{post.author.role}</p>
          </div>
        </div>

        <h2 
          id={`article-title-${post.id}`}
          className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200"
        >
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-200 flex-grow">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Article tags">
          {post.tags.map((tag) => (
            <span
              key={tag}
              role="listitem"
              className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
            >
              <FiTag className="mr-1 w-3 h-3" aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto" role="contentinfo" aria-label="Article metrics">
          <div className="flex items-center gap-4">
            <div className="flex items-center transition-transform duration-200 hover:scale-105">
              <FiClock className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-xs" aria-label={`Reading time: ${post.readTime}`}>{post.readTime}</span>
            </div>
            <div className="flex items-center transition-transform duration-200 hover:scale-105">
              <FiEye className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-xs" aria-label={`${post.views.toLocaleString()} views`}>{post.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center transition-transform duration-200 hover:scale-105">
              <FiHeart className="mr-1.5 w-3.5 h-3.5 text-red-500 transition-transform duration-300 group-hover:scale-125" aria-hidden="true" />
              <span className="text-xs" aria-label={`${post.likes.toLocaleString()} likes`}>{post.likes.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50/50 to-white/50 transition-colors duration-300 group-hover:bg-blue-50/50">
        <button 
          onClick={handleReadMore}
          className="inline-flex items-center text-blue-600 text-sm font-semibold group-hover:text-blue-700 transition-all duration-200 group-hover:font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1"
          aria-label={`Read more about ${post.title}`}
        >
          Read More
          <FiArrowRight className="ml-2 w-4 h-4 transform transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};

export default BlogCard;
