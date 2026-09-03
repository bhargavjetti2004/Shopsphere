package com.shopsphere.service;

import com.shopsphere.dto.CheckoutRequest;
import com.shopsphere.exception.BadRequestException;
import com.shopsphere.exception.ResourceNotFoundException;
import com.shopsphere.model.*;
import com.shopsphere.model.Order.OrderItem;
import com.shopsphere.repository.OrderRepository;
import com.shopsphere.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private ProductRepository productRepository;

    public Order createOrder(String userId, CheckoutRequest checkoutRequest) {
        // 1. Get user cart
        Cart cart = cartService.getCartByUserId(userId);
        if (cart.getItems().isEmpty()) {
            throw new BadRequestException("Cannot place order with an empty cart");
        }

        // 2. Validate stock for each item & prepare OrderItems
        List<OrderItem> orderItems = new ArrayList<>();
        double calculatedTotal = 0.0;

        for (Cart.CartItem cartItem : cart.getItems()) {
            Product product = productRepository.findById(cartItem.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + cartItem.getProductId()));

            if (product.getStock() < cartItem.getQuantity()) {
                throw new BadRequestException("Insufficient stock for product '" + product.getName() + "'. Available: " + product.getStock());
            }

            double itemSubtotal = product.getPrice() * cartItem.getQuantity();
            calculatedTotal += itemSubtotal;

            OrderItem orderItem = OrderItem.builder()
                    .productId(product.getId())
                    .productName(product.getName())
                    .quantity(cartItem.getQuantity())
                    .price(product.getPrice())
                    .subtotal(itemSubtotal)
                    .build();

            orderItems.add(orderItem);
        }

        // 3. Deduct product stock in MongoDB
        for (Cart.CartItem cartItem : cart.getItems()) {
            Product product = productRepository.findById(cartItem.getProductId()).get();
            product.setStock(product.getStock() - cartItem.getQuantity());
            productRepository.save(product);
        }

        // 4. Payment status initialization
        EPaymentStatus paymentStatus = checkoutRequest.getPaymentMethod() == EPaymentMethod.ONLINE 
                ? EPaymentStatus.PAID 
                : EPaymentStatus.PENDING;

        // 5. Construct Order document
        Order order = Order.builder()
                .userId(userId)
                .items(orderItems)
                .totalAmount(calculatedTotal)
                .shippingAddress(checkoutRequest.getShippingAddress())
                .paymentMethod(checkoutRequest.getPaymentMethod())
                .paymentStatus(paymentStatus)
                .orderStatus(EOrderStatus.PLACED)
                .createdAt(LocalDateTime.now())
                .build();

        Order savedOrder = orderRepository.save(order);

        // 6. Clear user cart
        cartService.clearCart(userId);

        return savedOrder;
    }

    public List<Order> getUserOrders(String userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Order getOrderById(String orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    public Order updateOrderStatus(String orderId, EOrderStatus newStatus) {
        Order order = getOrderById(orderId);
        
        // If order is newly cancelled, restore stock
        if (newStatus == EOrderStatus.CANCELLED && order.getOrderStatus() != EOrderStatus.CANCELLED) {
            for (OrderItem item : order.getItems()) {
                productRepository.findById(item.getProductId()).ifPresent(product -> {
                    product.setStock(product.getStock() + item.getQuantity());
                    productRepository.save(product);
                });
            }
            order.setPaymentStatus(EPaymentStatus.FAILED);
        } else if (newStatus == EOrderStatus.DELIVERED && order.getPaymentMethod() == EPaymentMethod.COD) {
            order.setPaymentStatus(EPaymentStatus.PAID);
        }

        order.setOrderStatus(newStatus);
        return orderRepository.save(order);
    }
}
