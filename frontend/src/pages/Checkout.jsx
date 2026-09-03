import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';
import ErrorMessage from '../components/ErrorMessage';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2>No items in cart for checkout</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Shop
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const checkoutPayload = {
        shippingAddress: address,
        paymentMethod: paymentMethod
      };

      const res = await orderService.createOrder(checkoutPayload);
      await clearCart();
      // Redirect to Order confirmation page
      navigate(`/orders/${res.id}`);
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '2rem' }}>Checkout</h1>

      <ErrorMessage message={error} />

      <form onSubmit={handlePlaceOrder} style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2.5rem' }}>
        {/* Left Column: Address & Payment */}
        <div>
          {/* Shipping Address */}
          <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={22} color="var(--primary)" /> 1. Shipping Address
            </h3>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="John Doe"
                  value={address.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="+1 800 555 0199"
                  value={address.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Street Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="124 Grand Avenue, Suite 400"
                value={address.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid-3">
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="New York"
                  value={address.city}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  placeholder="e.g. Maharashtra, Karnataka, Delhi, Telangana"
                  value={address.state}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">PIN Code (6-Digit)</label>
                <input
                  type="text"
                  name="pincode"
                  className="form-control"
                  placeholder="e.g. 560001, 110001, 400001"
                  maxLength={6}
                  value={address.pincode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CreditCard size={22} color="var(--secondary)" /> 2. Payment Method
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1rem 1.25rem', border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)', cursor: 'pointer',
                background: paymentMethod === 'UPI' ? 'rgba(139, 92, 246, 0.15)' : 'transparent'
              }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={paymentMethod === 'UPI'}
                  onChange={() => setPaymentMethod('UPI')}
                />
                <div>
                  <h4 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>⚡ UPI (Google Pay / PhonePe / Paytm / BHIM)</span>
                    <span style={{ fontSize: '0.7rem', background: '#10b981', color: '#fff', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>FASTEST</span>
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pay instantly using any UPI App or VPA ID</p>
                </div>
              </label>

              <label style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1rem 1.25rem', border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)', cursor: 'pointer',
                background: paymentMethod === 'COD' ? 'rgba(139, 92, 246, 0.15)' : 'transparent'
              }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                />
                <div>
                  <h4 style={{ fontSize: '1rem' }}>💵 Cash on Delivery (COD)</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pay with cash or scan delivery agent's QR when package arrives</p>
                </div>
              </label>

              <label style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1rem 1.25rem', border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)', cursor: 'pointer',
                background: paymentMethod === 'CARD' ? 'rgba(139, 92, 246, 0.15)' : 'transparent'
              }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CARD"
                  checked={paymentMethod === 'CARD'}
                  onChange={() => setPaymentMethod('CARD')}
                />
                <div>
                  <h4 style={{ fontSize: '1rem' }}>💳 Credit / Debit Card (RuPay, Visa, Mastercard)</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>All Indian debit/credit cards with 3D Secure OTP</p>
                </div>
              </label>

              <label style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1rem 1.25rem', border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)', cursor: 'pointer',
                background: paymentMethod === 'NETBANKING' ? 'rgba(139, 92, 246, 0.15)' : 'transparent'
              }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="NETBANKING"
                  checked={paymentMethod === 'NETBANKING'}
                  onChange={() => setPaymentMethod('NETBANKING')}
                />
                <div>
                  <h4 style={{ fontSize: '1rem' }}>🏦 Net Banking</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>SBI, HDFC, ICICI, Axis, PNB, and 50+ Indian banks</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order CTA */}
        <aside className="card" style={{ height: 'fit-content', padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Order Review</h3>

          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Items ({cart.items.length})</p>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>
              ₹{Number(cart.totalAmount).toLocaleString('en-IN')}
            </div>
            <p style={{ fontSize: '0.78rem', color: '#10b981', marginTop: '0.3rem', fontWeight: 600 }}>
              ✓ Free Pan-India Delivery Included
            </p>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
            style={{ padding: '0.9rem', fontSize: '1.05rem' }}
          >
            {loading ? 'Processing Order...' : 'Place Order (₹' + Number(cart.totalAmount).toLocaleString('en-IN') + ')'}
          </button>

          <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <p style={{ marginBottom: '0.25rem' }}>🔒 <strong>100% Safe & Secure Checkout</strong></p>
            <p>Protected by 256-bit SSL encryption & Indian banking standards.</p>
          </div>
        </aside>
      </form>
    </div>
  );
};

export default Checkout;
