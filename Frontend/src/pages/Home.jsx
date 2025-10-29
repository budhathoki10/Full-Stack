import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/home/HeroCarousel';
import CategoryGrid from '../components/home/CategoryGrid';
import ProductGrid from '../components/product/ProductGrid';
import BannerAd from '../components/home/BannerAd';
import { products } from '../data/mockData';

const Home = ({ onAddToCart }) => {
  const trendingProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen">
      <section className="mb-16">
        <HeroCarousel />
      </section>

      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our wide range of products across various categories
            </p>
          </motion.div>
          <CategoryGrid />
        </div>
      </section>

      <section className="mb-16 bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trending Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Check out our most popular products this week
            </p>
          </motion.div>
          <ProductGrid products={trendingProducts} onAddToCart={onAddToCart} />
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <BannerAd />
      </section>
    </div>
  );
};

export default Home;