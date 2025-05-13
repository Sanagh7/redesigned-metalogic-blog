import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ current, total, onPageChange }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  
  const renderPageButton = (pageNum: number) => (
    <button
      key={pageNum}
      onClick={() => onPageChange(pageNum)}
      className={`
        w-10 h-10 flex items-center justify-center rounded-lg 
        transition-all duration-200 font-medium text-sm
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          current === pageNum
            ? 'bg-blue-600 text-white shadow-md focus:ring-blue-500 hover:bg-blue-700'
            : 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
        }
      `}
    >
      {pageNum}
    </button>
  );

  const renderEllipsis = (key: string) => (
    <span key={key} className="w-10 h-10 flex items-center justify-center text-gray-400">
      •••
    </span>
  );

  const renderPaginationButtons = () => {
    if (total <= 7) {
      return pages.map(renderPageButton);
    }

    const buttons = [];
    if (current <= 3) {
      for (let i = 1; i <= 3; i++) buttons.push(renderPageButton(i));
      buttons.push(renderEllipsis('ellipsis1'));
      buttons.push(renderPageButton(total));
    } else if (current >= total - 2) {
      buttons.push(renderPageButton(1));
      buttons.push(renderEllipsis('ellipsis1'));
      for (let i = total - 2; i <= total; i++) buttons.push(renderPageButton(i));
    } else {
      buttons.push(renderPageButton(1));
      buttons.push(renderEllipsis('ellipsis1'));
      buttons.push(renderPageButton(current - 1));
      buttons.push(renderPageButton(current));
      buttons.push(renderPageButton(current + 1));
      buttons.push(renderEllipsis('ellipsis2'));
      buttons.push(renderPageButton(total));
    }
    return buttons;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={() => current > 1 && onPageChange(current - 1)}
        disabled={current === 1}
        className={`
          w-10 h-10 flex items-center justify-center rounded-lg 
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
          ${
            current === 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }
        `}
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>
      
      {renderPaginationButtons()}
      
      <button
        onClick={() => current < total && onPageChange(current + 1)}
        disabled={current === total}
        className={`
          w-10 h-10 flex items-center justify-center rounded-lg 
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
          ${
            current === total
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }
        `}
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
