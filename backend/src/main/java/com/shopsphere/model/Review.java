package com.shopsphere.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {
    @Id
    private String id;
    private String productId;
    private String userId;
    private String userName;
    private int rating;
    private String comment;
    
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
