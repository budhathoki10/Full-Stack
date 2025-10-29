import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-64 bg-gray-300 dark:bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;