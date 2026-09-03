package com.shopsphere.controller;

import com.shopsphere.dto.ApiResponse;
import com.shopsphere.dto.ReviewRequest;
import com.shopsphere.model.Review;
import com.shopsphere.security.UserDetailsImpl;
import com.shopsphere.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products/{productId}/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public ResponseEntity<ApiResponse> getProductReviews(@PathVariable String productId) {
        List<Review> reviews = reviewService.getReviewsByProduct(productId);
        return ResponseEntity.ok(ApiResponse.success("Reviews fetched successfully", reviews));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> addReview(
            @PathVariable String productId,
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody ReviewRequest request
    ) {
        Review review = reviewService.addReview(productId, userDetails.getId(), userDetails.getName(), request);
        return ResponseEntity.ok(ApiResponse.success("Review submitted successfully", review));
    }
}
