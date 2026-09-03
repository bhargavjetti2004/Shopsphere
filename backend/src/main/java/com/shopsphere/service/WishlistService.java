package com.shopsphere.service;

import com.shopsphere.exception.ResourceNotFoundException;
import com.shopsphere.model.Product;
import com.shopsphere.model.Wishlist;
import com.shopsphere.repository.ProductRepository;
import com.shopsphere.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private ProductRepository productRepository;

    public Wishlist getWishlistByUserId(String userId) {
        return wishlistRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Wishlist wishlist = Wishlist.builder()
                            .userId(userId)
                            .productIds(new HashSet<>())
                            .build();
                    return wishlistRepository.save(wishlist);
                });
    }

    public List<Product> getWishlistProducts(String userId) {
        Wishlist wishlist = getWishlistByUserId(userId);
        if (wishlist.getProductIds().isEmpty()) {
            return new ArrayList<>();
        }
        return productRepository.findAllById(wishlist.getProductIds());
    }

    public Wishlist addProductToWishlist(String userId, String productId) {
        // Validate product exists
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }

        Wishlist wishlist = getWishlistByUserId(userId);
        wishlist.getProductIds().add(productId);
        return wishlistRepository.save(wishlist);
    }

    public Wishlist removeProductFromWishlist(String userId, String productId) {
        Wishlist wishlist = getWishlistByUserId(userId);
        wishlist.getProductIds().remove(productId);
        return wishlistRepository.save(wishlist);
    }
}
