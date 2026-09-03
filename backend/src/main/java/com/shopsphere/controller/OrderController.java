package com.shopsphere.controller;

import com.shopsphere.dto.ApiResponse;
import com.shopsphere.dto.CheckoutRequest;
import com.shopsphere.model.Order;
import com.shopsphere.security.UserDetailsImpl;
import com.shopsphere.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse> createOrder(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody CheckoutRequest checkoutRequest
    ) {
        Order order = orderService.createOrder(userDetails.getId(), checkoutRequest);
        return ResponseEntity.ok(ApiResponse.success("Order placed successfully!", order));
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getUserOrders(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<Order> orders = orderService.getUserOrders(userDetails.getId());
        return ResponseEntity.ok(ApiResponse.success("Orders fetched successfully", orders));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getOrderById(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable String id
    ) {
        Order order = orderService.getOrderById(id);
        // Authorization check: User can only view their own order (unless admin)
        if (!order.getUserId().equals(userDetails.getId()) && !userDetails.getRole().name().equals("ROLE_ADMIN")) {
            return ResponseEntity.status(403).body(ApiResponse.error("Access denied to this order"));
        }
        return ResponseEntity.ok(ApiResponse.success("Order details fetched", order));
    }
}
