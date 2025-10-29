import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ 
  children, 
  cart, 
  cartCount, 
  user, 
  darkMode, 
  onLogout, 
  onToggleDarkMode,
  onAddToCart,
  onRemoveFromCart 
}) => {
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar 
        cart={cart}
        cartCount={cartCount}
        user={user}
        darkMode={darkMode}
        onLogout={onLogout}
        onToggleDarkMode={onToggleDarkMode}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
      />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-16 min-h-screen"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;