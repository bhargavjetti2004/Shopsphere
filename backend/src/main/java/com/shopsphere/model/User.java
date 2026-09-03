package com.shopsphere.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    private String id;
    private String name;
    
    @Indexed(unique = true)
    private String email;
    
    private String password;
    private String phone;
    private ERole role;
    @Builder.Default
    private boolean enabled = true;
    
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
