package com.shopsphere.dto;

import com.shopsphere.model.EOrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderStatusUpdateRequest {
    @NotNull(message = "Order status is required")
    private EOrderStatus orderStatus;
}
