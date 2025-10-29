import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../../data/mockData';

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={category.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link
            to={`/products?category=${category.slug}`}
            className="block group"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl">
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
              </div>
              <div className="p-6 text-center">
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {category.description}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryGrid;