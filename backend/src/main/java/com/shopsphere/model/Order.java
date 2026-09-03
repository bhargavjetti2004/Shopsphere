package com.shopsphere.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {
    @Id
    private String id;
    private String userId;
    
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();
    
    private double totalAmount;
    private ShippingAddress shippingAddress;
    private EPaymentMethod paymentMethod;
    private EPaymentStatus paymentStatus;
    private EOrderStatus orderStatus;
    
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItem {
        private String productId;
        private String productName;
        private int quantity;
        private double price;
        private double subtotal;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ShippingAddress {
        private String fullName;
        private String phone;
        private String address;
        private String city;
        private String state;
        private String pincode;
    }
}
