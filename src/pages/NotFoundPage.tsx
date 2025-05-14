import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle, FiArrowLeft } from 'react-icons/fi';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <FiAlertTriangle className="mx-auto h-24 w-24 text-yellow-500 animate-pulse" />
        </div>
        <h1 className="mt-6 text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          404
        </h1>
        <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300">
          Page Not Found
        </h2>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-6">
          <Link
            to="/blogs"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            <FiArrowLeft className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
            Back to Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 