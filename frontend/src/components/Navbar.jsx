import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, ShoppingCart, User, LogOut, Search, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* Indian Festive Announcement Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #f59e0b 0%, #ea580c 50%, #dc2626 100%)',
        color: '#fff',
        fontSize: '0.78rem',
        fontWeight: 700,
        padding: '0.35rem 1rem',
        textAlign: 'center',
        letterSpacing: '0.03em',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem'
      }}>
        <span>🇮🇳 <strong>Great Indian Festive Sale Live!</strong></span>
        <span>•</span>
        <span>Get Extra 10% Off with Code: <strong>FESTIVE10</strong></span>
        <span>•</span>
        <span>Free Express Delivery Across India on Orders Above ₹499</span>
      </div>

      <nav className="navbar" style={{ position: 'relative' }}>
        <div className="container navbar-inner">
          {/* Brand Logo */}
          <Link to="/" className="nav-brand">
            <div style={{
              width: '38px', height: '38px', borderRadius: 'var(--radius-sm)',
              background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.5)'
            }}>
              <ShoppingBag size={22} color="#fff" />
            </div>
            <span>ShopSphere</span>
            <span style={{ fontSize: '0.65rem', background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '0.1rem 0.45rem', borderRadius: '4px', fontWeight: 800, marginLeft: '0.4rem' }}>
              INDIA
            </span>
          </Link>

          {/* Global Glass Search Bar */}
          <form onSubmit={handleSearchSubmit} className="nav-search" style={{ position: 'relative', width: '360px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search boAt, Titan, Prestige, Cello, Books..."
              value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              paddingRight: '2.5rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-color)'
            }}
          />
          <button
            type="submit"
            style={{
              position: 'absolute', right: '14px', top: '50%',
              transform: 'translateY(-50%)', background: 'none',
              color: 'var(--text-muted)'
            }}
          >
            <Search size={18} />
          </button>
        </form>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>
              Products
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link to="/admin" className="nav-link">
                <span className="admin-badge">Admin Panel</span>
              </Link>
            </li>
          )}
          <li>
            <button onClick={toggleTheme} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Toggle Theme">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
          <li>
            <Link to="/wishlist" className="nav-link">
              <Heart size={20} />
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </Link>
          </li>
          <li>
            <Link to="/cart" className="nav-link">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
          </li>

          {isAuthenticated ? (
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Link to="/profile" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-hover-overlay)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
                <User size={18} color="var(--primary)" />
                <span style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>{user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm" title="Logout">
                <LogOut size={16} />
              </button>
            </li>
          ) : (
            <li style={{ display: 'flex', gap: '0.6rem' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  </header>
  );
};

export default Navbar;
