package com.shopsphere.controller;

import com.shopsphere.dto.ApiResponse;
import com.shopsphere.model.Product;
import com.shopsphere.model.Wishlist;
import com.shopsphere.security.UserDetailsImpl;
import com.shopsphere.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<ApiResponse> getWishlistProducts(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<Product> products = wishlistService.getWishlistProducts(userDetails.getId());
        return ResponseEntity.ok(ApiResponse.success("Wishlist fetched successfully", products));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<ApiResponse> addProductToWishlist(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable String productId
    ) {
        Wishlist wishlist = wishlistService.addProductToWishlist(userDetails.getId(), productId);
        return ResponseEntity.ok(ApiResponse.success("Product added to wishlist", wishlist));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse> removeProductFromWishlist(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable String productId
    ) {
        Wishlist wishlist = wishlistService.removeProductFromWishlist(userDetails.getId(), productId);
        return ResponseEntity.ok(ApiResponse.success("Product removed from wishlist", wishlist));
    }
}
