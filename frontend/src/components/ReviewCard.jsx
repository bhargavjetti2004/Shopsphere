import React from 'react';
import { Star, User } from 'lucide-react';

const ReviewCard = ({ review }) => {
  return (
    <div className="card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'var(--primary-light)', color: 'var(--primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700
          }}>
            <User size={18} />
          </div>
          <div>
            <h5 style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{review.userName}</h5>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.15rem' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              fill={star <= review.rating ? 'var(--warning)' : 'none'}
              color={star <= review.rating ? 'var(--warning)' : 'var(--text-dim)'}
            />
          ))}
        </div>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.5' }}>
        {review.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
