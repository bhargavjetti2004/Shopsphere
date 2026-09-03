import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import WishlistItem from '../components/WishlistItem';
import LoadingSpinner from '../components/LoadingSpinner';

const Wishlist = () => {
  const { wishlistProducts, loading } = useWishlist();

  if (loading) return <LoadingSpinner text="Loading wishlist..." />;

  if (!wishlistProducts || wishlistProducts.length === 0) {
    return (
      <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{
          maxWidth: '500px', margin: '0 auto', padding: '3rem 2rem',
          background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)'
        }}>
          <Heart size={64} color="var(--secondary)" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>Your Wishlist is Empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Save items you love by clicking the heart icon while browsing products.
          </p>
          <Link to="/products" className="btn btn-primary">
            Explore Catalog <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '2rem' }}>My Wishlist ({wishlistProducts.length} Saved Items)</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px' }}>
        {wishlistProducts.map((product) => (
          <WishlistItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
