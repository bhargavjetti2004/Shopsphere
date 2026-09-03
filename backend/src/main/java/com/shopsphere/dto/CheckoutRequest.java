package com.shopsphere.dto;

import com.shopsphere.model.EPaymentMethod;
import com.shopsphere.model.Order.ShippingAddress;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CheckoutRequest {
    @NotNull(message = "Shipping address is required")
    @Valid
    private ShippingAddress shippingAddress;

    @NotNull(message = "Payment method is required")
    private EPaymentMethod paymentMethod;
}
