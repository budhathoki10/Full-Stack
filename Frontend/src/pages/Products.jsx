import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import { products } from '../data/mockData';

const Products = ({ onAddToCart }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories] = useState(['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"]);
  const [filters, setFilters] = useState({
    category: 'all',
    sort: 'default',
    priceRange: [0, 1000],
  });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let filtered = [...products];

    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    if (filters.sort !== 'default') {
      switch (filters.sort) {
        case 'price-low-high':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filtered);
  }, [filters, searchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            All Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover our amazing collection of products
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <ProductFilters
              categories={categories}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {filteredProducts.length} products
              </p>
              
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange({ sort: e.target.value })}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="default">Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <ProductGrid products={filteredProducts} onAddToCart={onAddToCart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;