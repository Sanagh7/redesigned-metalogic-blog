import React from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <div className="relative group">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search articles..."
          className="w-full px-5 py-4 pl-14 text-gray-900 placeholder-gray-500 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 group-hover:border-gray-300"
        />
        <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 transition-transform duration-300 group-hover:scale-110">
          <FiSearch className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
