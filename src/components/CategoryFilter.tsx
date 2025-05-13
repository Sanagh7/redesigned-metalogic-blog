import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selected,
  onSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`
            px-8 py-3.5 rounded-xl text-base font-medium 
            transition-all duration-300 transform hover:scale-105
            focus:outline-none focus:ring-4 focus:ring-offset-2
            ${
              selected === category
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
                : 'bg-white text-gray-600 shadow-sm border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50/80'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
