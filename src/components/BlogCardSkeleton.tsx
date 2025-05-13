import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BlogCardSkeleton: React.FC = () => {
  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden h-full flex flex-col">
      <div className="relative h-48 sm:h-52 md:h-56 lg:h-64">
        <Skeleton height="100%" />
      </div>
      
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-4 mb-4">
          <Skeleton circle width={40} height={40} />
          <div className="flex-1">
            <Skeleton width={120} height={16} />
            <Skeleton width={80} height={12} style={{ marginTop: 4 }} />
          </div>
        </div>

        <Skeleton height={24} width="80%" style={{ marginBottom: 12 }} />
        <Skeleton height={24} width="60%" style={{ marginBottom: 16 }} />
        
        <Skeleton height={16} count={2} style={{ marginBottom: 16 }} />
        
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} width={60} height={24} style={{ borderRadius: '0.5rem' }} />
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} width={40} height={16} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-100">
        <Skeleton width={100} height={20} />
      </div>
    </article>
  );
};

export default BlogCardSkeleton; 