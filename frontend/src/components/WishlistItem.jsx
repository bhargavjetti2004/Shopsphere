import React from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistItem = ({ product }) => {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = async () => {
    try {
      await addToCart(product.id, 1);
      await removeFromWishlist(product.id);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="card" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
      />
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 600 }}>
          {product.category}
        </span>
        <h4 style={{ fontSize: '1.05rem', margin: '0.2rem 0' }}>{product.name}</h4>
        <p style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1.1rem' }}>₹{Number(product.price).toLocaleString('en-IN')}</p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={handleMoveToCart} className="btn btn-primary btn-sm">
          <ShoppingCart size={16} /> Move to Cart
        </button>
        <button onClick={() => removeFromWishlist(product.id)} className="btn btn-secondary btn-sm" style={{ color: 'var(--danger)' }}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
