import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to blogs page
    navigate('/blogs');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Redirecting to blogs page...</p>
      </div>
    </div>
  );
};

export default HomePage; 