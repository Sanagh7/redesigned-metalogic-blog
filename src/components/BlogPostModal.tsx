import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiClock, FiEye, FiHeart, FiShare2, FiBookmark, FiMessageCircle } from 'react-icons/fi';
import type { BlogPost } from '../data/blogPosts';

interface BlogPostModalProps {
  post: BlogPost;
  isOpen: boolean;
  onClose: () => void;
}

const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the last focused element
      lastFocusedElement.current = document.activeElement as HTMLElement;
      // Focus the close button when modal opens
      closeButtonRef.current?.focus();

      // Trap focus within modal
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) || [];
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        // Restore focus when modal closes
        lastFocusedElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            role="presentation"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full h-full max-w-6xl mx-auto overflow-hidden flex flex-col">
              {/* Header */}
              <div className="relative h-96">
                <img
                  src={post.imageUrl}
                  alt={`Featured image for article: ${post.title}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" aria-hidden="true" />
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label="Close modal"
                >
                  <FiX className="w-6 h-6" aria-hidden="true" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={post.author.avatar}
                      alt={`${post.author.name}'s profile picture`}
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <div>
                      <h3 className="text-white font-semibold">{post.author.name}</h3>
                      <p className="text-white/80 text-sm" aria-label={`Role: ${post.author.role}`}>{post.author.role}</p>
                    </div>
                  </div>
                  <h1 id="modal-title" className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
                  <div className="flex items-center gap-6 text-white/80" role="list" aria-label="Article metrics">
                    <div className="flex items-center gap-2" role="listitem">
                      <FiClock className="w-4 h-4" aria-hidden="true" />
                      <span aria-label={`Reading time: ${post.readTime}`}>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2" role="listitem">
                      <FiEye className="w-4 h-4" aria-hidden="true" />
                      <span aria-label={`${post.views.toLocaleString()} views`}>{post.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center gap-2" role="listitem">
                      <FiHeart className="w-4 h-4" aria-hidden="true" />
                      <span aria-label={`${post.likes.toLocaleString()} likes`}>{post.likes.toLocaleString()} likes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto p-8">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8" role="list" aria-label="Article tags">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        role="listitem"
                        className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Main content */}
                  <div className="prose prose-lg max-w-none" role="article">
                    {post.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Engagement section */}
                  <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <button 
                          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-3 py-2"
                          aria-label="Like this article"
                        >
                          <FiHeart className="w-5 h-5" aria-hidden="true" />
                          <span>Like</span>
                        </button>
                        <button 
                          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-3 py-2"
                          aria-label="Comment on this article"
                        >
                          <FiMessageCircle className="w-5 h-5" aria-hidden="true" />
                          <span>Comment</span>
                        </button>
                        <button 
                          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-3 py-2"
                          aria-label="Share this article"
                        >
                          <FiShare2 className="w-5 h-5" aria-hidden="true" />
                          <span>Share</span>
                        </button>
                      </div>
                      <button 
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-3 py-2"
                        aria-label="Save this article"
                      >
                        <FiBookmark className="w-5 h-5" aria-hidden="true" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BlogPostModal; 