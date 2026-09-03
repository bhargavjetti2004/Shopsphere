import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products?category=${encodeURIComponent(category.name)}`)}
      className="card"
      style={{
        position: 'relative',
        height: '180px',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'flex-end'
      }}
    >
      <img
        src={category.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'}
        alt={category.name}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.4s ease'
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(11, 15, 25, 0.9) 0%, rgba(11, 15, 25, 0.2) 100%)',
          zIndex: 1
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, padding: '1.25rem', width: '100%' }}>
        <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.2rem' }}>{category.name}</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{category.description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
