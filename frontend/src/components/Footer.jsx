import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Github, ShieldCheck, Truck, Headphones, RefreshCw } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Features bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          paddingBottom: '2.5rem',
          marginBottom: '2.5rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Truck size={32} color="var(--primary)" />
            <div>
              <h5 style={{ color: 'var(--text-main)' }}>Free & Fast Express Delivery</h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>On all orders across India over ₹499</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ShieldCheck size={32} color="var(--accent)" />
            <div>
              <h5 style={{ color: 'var(--text-main)' }}>Secure Payment Guarantee</h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Encrypted & safe transactions</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <RefreshCw size={32} color="var(--secondary)" />
            <div>
              <h5 style={{ color: 'var(--text-main)' }}>30 Days Easy Returns</h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hassle-free return policy</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Headphones size={32} color="var(--warning)" />
            <div>
              <h5 style={{ color: 'var(--text-main)' }}>24/7 Dedicated Support</h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Live chat assistance anytime</p>
            </div>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="nav-brand" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              <ShoppingBag size={24} />
              <span>ShopSphere</span>
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '320px' }}>
              ShopSphere is a next-generation full-stack e-commerce platform designed for smooth shopping experiences.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Browse Catalog</Link></li>
              <li><Link to="/cart">My Cart</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Categories</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=Electronics">Electronics</Link></li>
              <li><Link to="/products?category=Fashion">Fashion</Link></li>
              <li><Link to="/products?category=Home%20%26%20Kitchen">Home & Kitchen</Link></li>
              <li><Link to="/products?category=Sports">Sports</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Account</h4>
            <ul className="footer-links">
              <li><Link to="/profile">My Account</Link></li>
              <li><Link to="/orders">Order History</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ShopSphere E-Commerce Platform. Built for portfolio demonstration.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
