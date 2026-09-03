package com.shopsphere.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserProfileUpdateRequest {
    @NotBlank(message = "Name is required")
    private String name;
    private String phone;
}
