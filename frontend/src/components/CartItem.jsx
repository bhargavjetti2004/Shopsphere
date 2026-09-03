import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item, product }) => {
  const { updateQuantity, removeFromCart } = useCart();

  if (!product) return null;

  const subtotal = (product.price * item.quantity).toFixed(2);

  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem' }}>
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
      />
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{product.name}</h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Price: ₹{Number(product.price).toLocaleString('en-IN')} | Stock: {product.stock}
        </p>
      </div>

      {/* Quantity modifier */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
        <button
          onClick={() => updateQuantity(product.id, item.quantity - 1)}
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.2rem 0.4rem' }}
        >
          <Minus size={14} />
        </button>
        <span style={{ fontWeight: 700, padding: '0 0.5rem' }}>{item.quantity}</span>
        <button
          onClick={() => updateQuantity(product.id, item.quantity + 1)}
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.2rem 0.4rem' }}
          disabled={item.quantity >= product.stock}
        >
          <Plus size={14} />
        </button>
      </div>

      <div style={{ textAlign: 'right', minWidth: '100px' }}>
        <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>₹{Number(subtotal).toLocaleString('en-IN')}</p>
      </div>

      <button
        onClick={() => removeFromCart(product.id)}
        className="btn btn-secondary btn-sm"
        style={{ color: 'var(--danger)' }}
        title="Remove item"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default CartItem;
