import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiHome, FiBookOpen, FiInfo, FiPhone } from 'react-icons/fi';

interface NavbarProps {
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, onDarkModeToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: 'Home', href: '/', icon: FiHome },
    { label: 'Blog', href: '/blogs', icon: FiBookOpen },
    { label: 'About', href: '/about', icon: FiInfo },
    { label: 'Contact', href: '/contact', icon: FiPhone },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Check if current page is blog or blog detail page
  const isBlogPage = location.pathname === '/blogs' || location.pathname.startsWith('/blogs/');

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Background styles based on scroll position and page
  const getNavbarBackground = () => {
    if (!scrolled && isBlogPage) {
      // Completely transparent when on blog pages and at the top
      return 'bg-transparent border-transparent';
    }
    return isDarkMode
      ? 'bg-gray-900/95 backdrop-blur-sm border-gray-800'
      : 'bg-white/95 backdrop-blur-sm border-gray-200';
  };

  // Text and icon color styles
  const getTextColorClass = (active: boolean) => {
    if (!scrolled && isBlogPage) {
      return active ? 'text-white' : 'text-white/80 hover:text-white';
    }
    return active
      ? isDarkMode
        ? 'text-white'
        : 'text-gray-900'
      : isDarkMode
      ? 'text-gray-300 hover:text-white'
      : 'text-gray-600 hover:text-gray-900';
  };

  // Logo color
  const getLogoColorClass = () => {
    if (!scrolled && isBlogPage) {
      return 'text-white';
    }
    return isDarkMode ? 'text-white' : 'text-gray-900';
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 ${getNavbarBackground()} border-b transition-all duration-300`}
      style={{ 
        position: 'absolute',
        background: !scrolled && isBlogPage ? 'transparent' : undefined,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className={`text-2xl font-bold transition-colors duration-300 flex items-center gap-2 ${getLogoColorClass()}`}
            >
              <img 
                src="/images/metalogo.png" 
                alt="Meta Logic Logo" 
                className="h-12 w-12"
              />&nbsp;
              <span className="transition-all duration-300 tapaikofontnaihamrofont tracking-widest">
              MetaLogic
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-2 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-1.5 relative ${getTextColorClass(active)}`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full
                        ${!scrolled && isBlogPage ? 'bg-white' : 'bg-blue-500'}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Dark Mode Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDarkModeToggle}
              className={`p-2 rounded-full transition-colors duration-200 flex items-center justify-center ${
                !scrolled && isBlogPage
                  ? 'text-white/90 hover:text-white hover:bg-white/10'
                  : isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors duration-200 ${
                !scrolled && isBlogPage
                  ? 'text-white/90 hover:text-white hover:bg-white/10'
                  : isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className={`px-2 pt-2 pb-3 space-y-1 ${
              !scrolled && isBlogPage 
                ? 'bg-blue-900/95 backdrop-blur-md' 
                : isDarkMode 
                  ? 'bg-gray-900/95 backdrop-blur-md' 
                  : 'bg-white/95 backdrop-blur-md'
            }`}>
              {menuItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`flex items-center gap-2 px-4 py-3 text-base font-medium relative ${
                      active
                        ? (!scrolled && isBlogPage)
                          ? 'text-white'
                          : isDarkMode
                          ? 'text-white'
                          : 'text-gray-900'
                        : (!scrolled && isBlogPage)
                          ? 'text-white/80 hover:text-white'
                          : isDarkMode
                          ? 'text-gray-300 hover:text-white'
                          : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {active && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full
                          ${!scrolled && isBlogPage ? 'bg-white' : 'bg-blue-500'}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 