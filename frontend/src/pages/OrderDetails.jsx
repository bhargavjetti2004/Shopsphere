import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, MapPin, CreditCard, Package } from 'lucide-react';
import { orderService } from '../services/orderService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    orderService.getOrderById(id)
      .then(setOrder)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner text="Fetching order details..." />;
  if (error || !order) return <div className="container" style={{ padding: '4rem 1.5rem' }}><ErrorMessage message={error || 'Order not found'} /></div>;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '900px' }}>
      <Link to="/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: 600 }}>
        <ArrowLeft size={16} /> Back to Order History
      </Link>

      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Order ID</span>
            <h2 style={{ fontSize: '1.5rem', fontFamily: 'monospace' }}>#{order.id}</h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              Placed on {new Date(order.createdAt).toLocaleString()}
            </span>
          </div>

          <div>
            <span className={`status-tag status-${order.orderStatus.toLowerCase()}`} style={{ fontSize: '1rem', padding: '0.4rem 1rem' }}>
              {order.orderStatus}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
              <MapPin size={18} color="var(--primary)" /> Shipping Address
            </h4>
            <p style={{ fontWeight: 600 }}>{order.shippingAddress.fullName}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{order.shippingAddress.address}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Phone: {order.shippingAddress.phone}</p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
              <CreditCard size={18} color="var(--secondary)" /> Payment Info
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Method: <strong>{order.paymentMethod}</strong>
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Payment Status: <strong style={{ color: order.paymentStatus === 'PAID' ? 'var(--accent)' : 'var(--warning)' }}>{order.paymentStatus}</strong>
            </p>
          </div>
        </div>

        {/* Itemized list */}
        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Package size={18} /> Order Items ({order.items.length})
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {order.items.map((item) => (
            <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <p style={{ fontWeight: 600 }}>{item.productName}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Qty: {item.quantity} × ₹{Number(item.price).toLocaleString('en-IN')}</p>
              </div>
              <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                ₹{Number(item.subtotal).toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', fontSize: '1.25rem', fontWeight: 800 }}>
          <span>Total Order Price</span>
          <span style={{ color: 'var(--primary)' }}>₹{Number(order.totalAmount).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
