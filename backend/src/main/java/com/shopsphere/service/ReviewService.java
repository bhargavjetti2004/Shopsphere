package com.shopsphere.service;

import com.shopsphere.dto.ReviewRequest;
import com.shopsphere.exception.ResourceNotFoundException;
import com.shopsphere.model.Product;
import com.shopsphere.model.Review;
import com.shopsphere.repository.ProductRepository;
import com.shopsphere.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;

    public Review addReview(String productId, String userId, String userName, ReviewRequest request) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        Review review = Review.builder()
                .productId(productId)
                .userId(userId)
                .userName(userName)
                .rating(request.getRating())
                .comment(request.getComment())
                .createdAt(LocalDateTime.now())
                .build();

        Review savedReview = reviewRepository.save(review);

        // Recalculate product rating
        List<Review> productReviews = reviewRepository.findByProductIdOrderByCreatedAtDesc(productId);
        double avgRating = productReviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        // Round to 1 decimal place
        avgRating = Math.round(avgRating * 10.0) / 10.0;

        product.setRating(avgRating);
        product.setReviewCount(productReviews.size());
        productRepository.save(product);

        return savedReview;
    }

    public List<Review> getReviewsByProduct(String productId) {
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId);
    }
}
