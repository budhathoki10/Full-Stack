import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductGrid from '../components/product/ProductGrid';
import { products } from '../data/mockData';

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    
    if (foundProduct) {
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product not found</h2>
          <Link to="/products" className="text-primary-600 hover:text-primary-700">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const StarIcon = ({ filled }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  const HeartIcon = () => (
    <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} filled={i < Math.floor(rating)} />
    ));
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    alert('Product added to cart!');
  };

  const handleBuyNow = () => {
    onAddToCart(product, quantity);
    alert('Product added to cart! Proceed to checkout.');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <Link to="/products" className="text-primary-600 hover:text-primary-700">
            ← Back to Products
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-w-1 aspect-h-1"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.title}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating.rate)}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>

              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-6">
                ${product.price}
              </p>

              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBuyNow}
                    className="flex-1 bg-gray-900 dark:bg-white dark:text-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
                  >
                    Buy Now
                  </motion.button>
                  <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <HeartIcon />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Related Products
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                You might also like these products
              </p>
            </motion.div>
            <ProductGrid products={relatedProducts} onAddToCart={onAddToCart} />
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;