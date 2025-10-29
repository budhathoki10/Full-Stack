import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BannerAd = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-2xl overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Special Offer!
          </h2>
          <p className="text-xl md:text-2xl mb-6 opacity-90">
            Get 20% off on your first order. Use code: <strong>KushalDada</strong>
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-primary-600 transition-all duration-300"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BannerAd;