import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Shield, Truck, Check, Plus, Minus } from 'lucide-react';
import { productService } from '../services/productService';
import { reviewService } from '../services/reviewService';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ReviewCard from '../components/ReviewCard';
import ProductGrid from '../components/ProductGrid';
import ErrorMessage from '../components/ErrorMessage';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  // Review Form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const prodData = await productService.getProductById(id);
        setProduct(prodData);

        const [revData, relData] = await Promise.all([
          reviewService.getProductReviews(id),
          productService.getRelatedProducts(id, prodData.category)
        ]);
        setReviews(revData);
        setRelatedProducts(relData);
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading product details..." />;
  if (error || !product) return <div className="container" style={{ padding: '4rem 1.5rem' }}><ErrorMessage message={error || 'Product not found'} /></div>;

  const inWishlist = isInWishlist(product.id);
  const discountedPrice = product.discount > 0
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price.toFixed(2);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleBuyNow = async () => {
    try {
      await addToCart(product.id, quantity);
      navigate('/cart');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleWishlistToggle = async () => {
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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to leave a review.');
      return;
    }
    setSubmittingReview(true);
    try {
      await reviewService.addReview(product.id, { rating: newRating, comment: newComment });
      setNewComment('');
      // Reload reviews and product rating
      const [updatedProd, updatedRev] = await Promise.all([
        productService.getProductById(id),
        reviewService.getProductReviews(id)
      ]);
      setProduct(updatedProd);
      setReviews(updatedRev);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      {/* Product Details Section */}
      <div className="grid-2" style={{ gap: '3rem', marginBottom: '4rem' }}>
        {/* Product Image */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '420px'
        }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ maxWidth: '100%', maxHeight: '420px', objectFit: 'contain' }}
          />
        </div>

        {/* Product Info */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            {product.category} • {product.brand}
          </span>

          <h1 style={{ fontSize: '2.2rem', lineHeight: '1.25', marginBottom: '0.75rem' }}>{product.name}</h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', color: 'var(--warning)' }}>
              <Star size={18} fill="var(--warning)" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '1rem' }}>{product.rating}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>({product.reviewCount} customer reviews)</span>
          </div>

          {/* Price */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
              ₹{Number(discountedPrice).toLocaleString('en-IN')}
            </span>
            {product.discount > 0 && (
              <>
                <span style={{ fontSize: '1.2rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </span>
                <span style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', fontWeight: 800, fontSize: '0.85rem' }}>
                  {product.discount}% OFF
                </span>
                <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.9rem' }}>
                  You save ₹{Math.round(product.price - discountedPrice).toLocaleString('en-IN')}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            {product.description}
          </p>

          {/* Stock Status */}
          <div style={{ marginBottom: '1.5rem' }}>
            {product.stock > 0 ? (
              <span style={{ color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Check size={18} /> In Stock ({product.stock} units available)
              </span>
            ) : (
              <span style={{ color: 'var(--danger)', fontWeight: 600 }}>Out of Stock</span>
            )}
          </div>

          {/* Indian Delivery & Trust Perks */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <span>🚚</span> <span><strong>Free Delivery</strong> on orders over ₹499</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <span>💵</span> <span><strong>Cash on Delivery</strong> (COD) Available</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <span>🔄</span> <span><strong>7-Day</strong> Replacement Guarantee</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <span>🛡️</span> <span><strong>100% Authentic</strong> Brand Assured</span>
            </div>
          </div>

          {/* Quantity & Actions */}
          {product.stock > 0 && (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="btn btn-secondary"
                  style={{ padding: '0.6rem 0.8rem', border: 'none' }}
                >
                  <Minus size={16} />
                </button>
                <span style={{ padding: '0 1rem', fontWeight: 700, fontSize: '1.1rem' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="btn btn-secondary"
                  style={{ padding: '0.6rem 0.8rem', border: 'none' }}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-secondary"
                style={{ padding: '0.75rem 1.75rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="btn btn-primary"
                style={{ padding: '0.75rem 2rem' }}
              >
                ⚡ Buy Now
              </button>

              <button
                onClick={handleWishlistToggle}
                className="btn btn-secondary"
                style={{ padding: '0.75rem 1rem' }}
                title="Wishlist"
              >
                <Heart size={20} fill={inWishlist ? 'var(--secondary)' : 'none'} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Customer Reviews ({reviews.length})</h2>

        {/* Submit Review Form */}
        {isAuthenticated ? (
          <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
            <h4 style={{ marginBottom: '1rem' }}>Write a Customer Review</h4>
            <form onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <label className="form-label">Rating (1 to 5 Stars)</label>
                <select
                  className="form-control"
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  style={{ maxWidth: '150px' }}
                >
                  <option value={5}>5 Stars ★★★★★</option>
                  <option value={4}>4 Stars ★★★★☆</option>
                  <option value={3}>3 Stars ★★★☆☆</option>
                  <option value={2}>2 Stars ★★☆☆☆</option>
                  <option value={1}>1 Star ★☆☆☆☆</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Review Comment</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Share details of your experience with this product..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-sm" disabled={submittingReview}>
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        ) : (
          <div className="card" style={{ marginBottom: '2rem', padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>
            Please <a href="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>login</a> to write a product review.
          </div>
        )}

        {/* Reviews List */}
        {reviews.length > 0 ? (
          reviews.map((rev) => <ReviewCard key={rev.id} review={rev} />)
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>No reviews yet. Be the first to review this product!</p>
        )}
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Related Products</h2>
          <ProductGrid products={relatedProducts.slice(0, 4)} />
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
