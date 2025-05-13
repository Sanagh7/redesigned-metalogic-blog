import { useState, useEffect } from 'react';
import BlogPage from './pages/BlogPage';
import Navbar from './components/Navbar';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    // Update localStorage and body class when theme changes
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleDarkModeToggle = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Navbar isDarkMode={isDarkMode} onDarkModeToggle={handleDarkModeToggle} />
      <main className="pt-16"> {/* Add padding-top to account for fixed navbar */}
        <BlogPage />
      </main>
    </div>
  );
}

export default App;
