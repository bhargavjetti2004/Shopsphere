package com.shopsphere.repository;

import com.shopsphere.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByProductIdOrderByCreatedAtDesc(String productId);
    boolean existsByProductIdAndUserId(String productId, String userId);
}
