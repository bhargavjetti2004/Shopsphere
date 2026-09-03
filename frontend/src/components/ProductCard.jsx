import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const discountedPrice = product.discount > 0
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price.toFixed(2);

  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (inWishlist) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product.id);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(product.id, 1);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="card product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Discount Badge */}
      {product.discount > 0 && (
        <span style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
          color: '#fff',
          fontSize: '0.72rem',
          fontWeight: 800,
          padding: '0.25rem 0.7rem',
          borderRadius: 'var(--radius-full)',
          zIndex: 2,
          boxShadow: '0 4px 12px rgba(244, 63, 94, 0.4)',
          letterSpacing: '0.04em'
        }}>
          -{product.discount}% OFF
        </span>
      )}

      {/* Wishlist Floating Glass Button */}
      <button
        onClick={handleWishlistToggle}
        style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          background: 'rgba(7, 9, 19, 0.65)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 'var(--radius-full)',
          width: '38px',
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: inWishlist ? 'var(--secondary)' : '#94a3b8',
          zIndex: 2,
          cursor: 'pointer',
          transition: 'var(--transition)'
        }}
      >
        <Heart size={18} fill={inWishlist ? 'var(--secondary)' : 'none'} />
      </button>

      {/* Image Gallery */}
      <div
        onClick={() => navigate(`/products/${product.id}`)}
        style={{
          width: '100%',
          height: '220px',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          backgroundColor: 'rgba(14, 19, 34, 0.6)',
          cursor: 'pointer',
          marginBottom: '1.25rem',
          position: 'relative'
        }}
      >
        <img
          src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>

      {/* Info Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#a78bfa', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {product.category}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>
            {product.brand}
          </span>
        </div>

        <h4
          onClick={() => navigate(`/products/${product.id}`)}
          style={{
            fontSize: '1.05rem',
            lineHeight: '1.4',
            marginBottom: '0.6rem',
            cursor: 'pointer',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            fontWeight: 700
          }}
        >
          {product.name}
        </h4>

        {/* Rating Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', color: 'var(--warning)' }}>
            <Star size={15} fill="var(--warning)" />
          </div>
          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>{product.rating}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>({product.reviewCount})</span>
        </div>

        {/* Pricing & CTA */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc' }}>
                ₹{Number(discountedPrice).toLocaleString('en-IN')}
              </span>
              {product.discount > 0 && (
                <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {product.discount > 0 && (
              <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>
                Save ₹{Math.round(product.price - discountedPrice).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.45rem' }}>
            <button
              onClick={() => navigate(`/products/${product.id}`)}
              className="btn btn-secondary btn-sm"
              title="View Details"
            >
              <Eye size={15} />
            </button>

            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-sm"
              disabled={product.stock <= 0}
              title={product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
            >
              <ShoppingCart size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
