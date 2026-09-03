package com.shopsphere.service;

import com.shopsphere.dto.AdminDashboardResponse;
import com.shopsphere.exception.ResourceNotFoundException;
import com.shopsphere.model.EOrderStatus;
import com.shopsphere.model.Order;
import com.shopsphere.model.User;
import com.shopsphere.repository.OrderRepository;
import com.shopsphere.repository.ProductRepository;
import com.shopsphere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    public AdminDashboardResponse getDashboardMetrics() {
        long totalProducts = productRepository.count();
        long totalUsers = userRepository.count();
        long totalOrders = orderRepository.count();
        
        List<Order> allOrders = orderRepository.findAll();
        double totalRevenue = allOrders.stream()
                .filter(o -> o.getOrderStatus() != EOrderStatus.CANCELLED)
                .mapToDouble(Order::getTotalAmount)
                .sum();

        long pendingOrders = allOrders.stream()
                .filter(o -> o.getOrderStatus() == EOrderStatus.PLACED || o.getOrderStatus() == EOrderStatus.CONFIRMED)
                .count();

        long lowStockProducts = productRepository.findLowStockProducts(5).size();

        return AdminDashboardResponse.builder()
                .totalProducts(totalProducts)
                .totalUsers(totalUsers)
                .totalOrders(totalOrders)
                .totalRevenue(Math.round(totalRevenue * 100.0) / 100.0)
                .pendingOrders(pendingOrders)
                .lowStockProducts(lowStockProducts)
                .build();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User toggleUserStatus(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        user.setEnabled(!user.isEnabled());
        return userRepository.save(user);
    }
}
