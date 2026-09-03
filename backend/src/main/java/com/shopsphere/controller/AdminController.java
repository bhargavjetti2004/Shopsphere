package com.shopsphere.controller;

import com.shopsphere.dto.AdminDashboardResponse;
import com.shopsphere.dto.ApiResponse;
import com.shopsphere.dto.OrderStatusUpdateRequest;
import com.shopsphere.model.Order;
import com.shopsphere.model.User;
import com.shopsphere.service.AdminService;
import com.shopsphere.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse> getDashboardMetrics() {
        AdminDashboardResponse metrics = adminService.getDashboardMetrics();
        return ResponseEntity.ok(ApiResponse.success("Dashboard metrics fetched", metrics));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse> getAllUsers() {
        List<User> users = adminService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success("Users fetched successfully", users));
    }

    @PutMapping("/users/{id}/toggle-status")
    public ResponseEntity<ApiResponse> toggleUserStatus(@PathVariable String id) {
        User updatedUser = adminService.toggleUserStatus(id);
        return ResponseEntity.ok(ApiResponse.success("User status toggled", updatedUser));
    }

    @GetMapping("/orders")
    public ResponseEntity<ApiResponse> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(ApiResponse.success("All orders fetched", orders));
    }

    @PutMapping("/orders/{id}/status")
    public ResponseEntity<ApiResponse> updateOrderStatus(
            @PathVariable String id,
            @Valid @RequestBody OrderStatusUpdateRequest request
    ) {
        Order updatedOrder = orderService.updateOrderStatus(id, request.getOrderStatus());
        return ResponseEntity.ok(ApiResponse.success("Order status updated successfully", updatedOrder));
    }
}
