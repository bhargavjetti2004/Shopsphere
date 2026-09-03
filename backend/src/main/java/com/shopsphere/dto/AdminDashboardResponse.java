package com.shopsphere.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDashboardResponse {
    private long totalProducts;
    private long totalUsers;
    private long totalOrders;
    private double totalRevenue;
    private long pendingOrders;
    private long lowStockProducts;
}
