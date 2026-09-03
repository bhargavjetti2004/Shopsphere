import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import ProductGrid from '../components/ProductGrid';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodData, catData] = await Promise.all([
          productService.getFeaturedProducts(),
          categoryService.getCategories()
        ]);
        setFeaturedProducts(prodData);
        setCategories(catData);
      } catch (err) {
        console.error('Error loading homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Ultra-Modern Indian E-Commerce Hero Section */}
      <section style={{
        position: 'relative',
        padding: '5rem 0 6rem',
        background: 'radial-gradient(circle at 50% -20%, rgba(245, 158, 11, 0.25) 0%, rgba(139, 92, 246, 0.2) 40%, rgba(7, 9, 19, 0) 75%)',
        borderBottom: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}>
        {/* Glow ambient circles */}
        <div style={{
          position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '350px',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 70, 239, 0.15) 50%, rgba(139, 92, 246, 0.2) 100%)',
          filter: 'blur(130px)',
          opacity: 0.6, pointerEvents: 'none', borderRadius: '50%'
        }} />

        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.4)',
            padding: '0.5rem 1.4rem', borderRadius: 'var(--radius-full)',
            color: '#fbbf24', fontWeight: 700, fontSize: '0.88rem', marginBottom: '1.75rem',
            backdropFilter: 'blur(10px)', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.15)'
          }}>
            <span>🇮🇳</span> <span>India's Trusted Online Marketplace • Mega Deals Live</span>
          </div>

          <h1 style={{ fontSize: '3.8rem', lineHeight: '1.15', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
            Authentic Indian Brands, <br />
            <span style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f43f5e 50%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 25px rgba(245, 158, 11, 0.3))'
            }}>
              Unbeatable Rupee Prices
            </span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '720px', margin: '0 auto 2.25rem', lineHeight: '1.7' }}>
            Shop top Indian brands like <strong>boAt, Titan, Prestige, FabIndia, Cello, SG Cricket, Himalaya</strong> & more. Enjoy instant UPI checkout, Cash on Delivery, and Free Delivery across India.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <button onClick={() => navigate('/products')} className="btn btn-primary" style={{ padding: '1rem 2.25rem', fontSize: '1.05rem' }}>
              Explore All Products in ₹ <ArrowRight size={20} />
            </button>
            <a href="#categories" className="btn btn-secondary" style={{ padding: '1rem 2.25rem', fontSize: '1.05rem' }}>
              Shop by Category
            </a>
          </div>

          {/* Quick Category Discovery Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            {[
              { label: '🎧 boAt Audio', cat: 'Electronics' },
              { label: '🥻 Festive Wear', cat: 'Fashion' },
              { label: '🍳 Prestige Kitchen', cat: 'Home & Kitchen' },
              { label: '🏏 Cricket & Fitness', cat: 'Sports' },
              { label: '🌿 Himalaya Care', cat: 'Beauty' },
              { label: '✏️ Cello Stationery', cat: 'Books' }
            ].map((pill, idx) => (
              <button
                key={idx}
                onClick={() => navigate(`/products?category=${encodeURIComponent(pill.cat)}`)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: 'var(--text-main)',
                  padding: '0.4rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Trust Highlights Row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem',
            paddingTop: '2.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.75rem' }}>🚚</span>
              <div style={{ textAlign: 'left' }}>
                <h5 style={{ fontSize: '0.9rem', color: 'var(--text-main)', margin: 0 }}>Free Pan-India Delivery</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>On all orders above ₹499</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.75rem' }}>💵</span>
              <div style={{ textAlign: 'left' }}>
                <h5 style={{ fontSize: '0.9rem', color: 'var(--text-main)', margin: 0 }}>Cash on Delivery (COD)</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Pay at your doorstep</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.75rem' }}>🛡️</span>
              <div style={{ textAlign: 'left' }}>
                <h5 style={{ fontSize: '0.9rem', color: 'var(--text-main)', margin: 0 }}>100% Authentic Brands</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Direct from verified makers</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.75rem' }}>🔄</span>
              <div style={{ textAlign: 'left' }}>
                <h5 style={{ fontSize: '0.9rem', color: 'var(--text-main)', margin: 0 }}>7-Day Easy Returns</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Instant UPI / Card refunds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section id="categories" className="container" style={{ padding: '5rem 1.5rem 3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Curated Collections
            </span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '0.2rem' }}>Featured Categories</h2>
          </div>
          <button onClick={() => navigate('/products')} className="btn btn-outline btn-sm">
            View All Catalog
          </button>
        </div>

        <div className="grid-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container" style={{ padding: '2rem 1.5rem 5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Handpicked Essentials
            </span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '0.2rem' }}>Top Rated Products</h2>
          </div>
          <button onClick={() => navigate('/products')} className="btn btn-outline btn-sm">
            Explore All Products
          </button>
        </div>

        <ProductGrid products={featuredProducts} loading={loading} />
      </section>
    </div>
  );
};

export default Home;
