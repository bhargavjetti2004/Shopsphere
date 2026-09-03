package com.shopsphere.controller;

import com.shopsphere.dto.ApiResponse;
import com.shopsphere.dto.CartItemRequest;
import com.shopsphere.model.Cart;
import com.shopsphere.security.UserDetailsImpl;
import com.shopsphere.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<ApiResponse> getCart(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Cart cart = cartService.getCartByUserId(userDetails.getId());
        return ResponseEntity.ok(ApiResponse.success("Cart fetched successfully", cart));
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse> addItemToCart(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody CartItemRequest request
    ) {
        Cart cart = cartService.addItemToCart(userDetails.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Item added to cart successfully", cart));
    }

    @PutMapping("/items/{productId}")
    public ResponseEntity<ApiResponse> updateItemQuantity(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable String productId,
            @RequestParam int quantity
    ) {
        Cart cart = cartService.updateItemQuantity(userDetails.getId(), productId, quantity);
        return ResponseEntity.ok(ApiResponse.success("Cart quantity updated", cart));
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<ApiResponse> removeItemFromCart(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable String productId
    ) {
        Cart cart = cartService.removeItemFromCart(userDetails.getId(), productId);
        return ResponseEntity.ok(ApiResponse.success("Item removed from cart", cart));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse> clearCart(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        cartService.clearCart(userDetails.getId());
        return ResponseEntity.ok(ApiResponse.success("Cart cleared successfully"));
    }
}
