import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productService } from '../services/productService';
import CartItem from '../components/CartItem';
import LoadingSpinner from '../components/LoadingSpinner';

const Cart = () => {
  const { cart, loading, clearCart } = useCart();
  const [productDetailsMap, setProductDetailsMap] = useState({});
  const [fetchingProducts, setFetchingProducts] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCartProducts = async () => {
      if (!cart.items || cart.items.length === 0) {
        setProductDetailsMap({});
        setFetchingProducts(false);
        return;
      }
      setFetchingProducts(true);
      try {
        const productPromises = cart.items.map(item => productService.getProductById(item.productId));
        const products = await Promise.all(productPromises);
        const map = {};
        products.forEach(p => { map[p.id] = p; });
        setProductDetailsMap(map);
      } catch (err) {
        console.error('Failed to load cart products:', err);
      } finally {
        setFetchingProducts(false);
      }
    };

    loadCartProducts();
  }, [cart.items]);

  if (loading || fetchingProducts) return <LoadingSpinner text="Loading cart..." />;

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{
          maxWidth: '500px', margin: '0 auto', padding: '3rem 2rem',
          background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)'
        }}>
          <ShoppingBag size={64} color="var(--text-dim)" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>Your Cart is Empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Looks like you haven't added anything to your cart yet. Explore our wide range of products and start shopping!
          </p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem' }}>Shopping Cart ({cart.items.length} Items)</h1>
        <button onClick={clearCart} className="btn btn-secondary btn-sm" style={{ color: 'var(--danger)' }}>
          <Trash2 size={16} /> Clear Cart
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem' }}>
        {/* Cart Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.items.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              product={productDetailsMap[item.productId]}
            />
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <aside className="card" style={{ height: 'fit-content', padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Order Summary</h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
            <span>Subtotal</span>
            <span>₹{Number(cart.totalAmount).toLocaleString('en-IN')}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
            <span>Estimated Shipping</span>
            <span style={{ color: '#10b981', fontWeight: 600 }}>FREE Pan-India</span>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800 }}>
            <span>Total Amount</span>
            <span style={{ color: 'var(--primary)' }}>₹{Number(cart.totalAmount).toLocaleString('en-IN')}</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'right' }}>
            Inclusive of all Indian taxes & GST
          </p>

          <button
            onClick={() => navigate('/checkout')}
            className="btn btn-primary btn-block"
            style={{ marginTop: '1.75rem', padding: '0.9rem' }}
          >
            Proceed to Checkout <ArrowRight size={18} />
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
