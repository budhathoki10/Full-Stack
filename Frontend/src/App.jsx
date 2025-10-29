import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('ecommerce-cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedUser = localStorage.getItem('ecommerce-user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedTheme = localStorage.getItem('ecommerce-theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity }];
    }
    
    setCart(newCart);
    localStorage.setItem('ecommerce-cart', JSON.stringify(newCart));
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    localStorage.setItem('ecommerce-cart', JSON.stringify(newCart));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const newCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(newCart);
    localStorage.setItem('ecommerce-cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('ecommerce-cart');
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('ecommerce-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecommerce-user');
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('ecommerce-theme', newDarkMode ? 'dark' : 'light');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <Router>
      <div className="App">
        <Layout
          cart={cart}
          cartCount={cartCount}
          user={user}
          darkMode={darkMode}
          onLogout={logout}
          onToggleDarkMode={toggleDarkMode}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
        >
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} />} />
            <Route path="/products" element={<Products onAddToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cart={cart}
                  cartCount={cartCount}
                  cartTotal={cartTotal}
                  onUpdateQuantity={updateQuantity}
                  onRemoveFromCart={removeFromCart}
                  onClearCart={clearCart}
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <Checkout 
                  cart={cart}
                  cartTotal={cartTotal}
                  user={user}
                  onClearCart={clearCart}
                />
              } 
            />
            <Route path="/login" element={<Login onLogin={login} user={user} />} />
            <Route path="/register" element={<Register onLogin={login} />} />
            <Route path="/profile" element={<Profile user={user} onUpdateUser={login} />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;