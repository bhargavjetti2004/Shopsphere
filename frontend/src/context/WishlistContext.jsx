import React, { createContext, useState, useEffect, useContext } from 'react';
import { wishlistService } from '../services/wishlistService';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!isAuthenticated) {
      setWishlistProducts([]);
      return;
    }
    setLoading(true);
    try {
      const data = await wishlistService.getWishlist();
      setWishlistProducts(data);
    } catch (err) {
      console.error('Failed to fetch wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isAuthenticated]);

  const addToWishlist = async (productId) => {
    if (!isAuthenticated) {
      throw new Error('Please login to save items to your wishlist');
    }
    await wishlistService.addToWishlist(productId);
    await fetchWishlist();
  };

  const removeFromWishlist = async (productId) => {
    if (!isAuthenticated) return;
    await wishlistService.removeFromWishlist(productId);
    setWishlistProducts(prev => prev.filter(p => p.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistProducts.some(p => p.id === productId);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistProducts,
      wishlistCount: wishlistProducts.length,
      loading,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      fetchWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
