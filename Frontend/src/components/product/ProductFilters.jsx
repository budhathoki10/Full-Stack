import React from 'react';
import { motion } from 'framer-motion';

const ProductFilters = ({ categories, filters, onFilterChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Filters
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={filters.priceRange[1]}
            onChange={(e) => onFilterChange({ priceRange: [filters.priceRange[0], parseInt(e.target.value)] })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>$0</span>
            <span>$1000</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onFilterChange({ category: 'all', sort: 'default', priceRange: [0, 1000] })}
        className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        Clear Filters
      </button>
    </motion.div>
  );
};

export default ProductFilters;