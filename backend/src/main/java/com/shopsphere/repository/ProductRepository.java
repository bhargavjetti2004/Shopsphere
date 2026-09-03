package com.shopsphere.repository;

import com.shopsphere.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByCategory(String category);
    
    @Query("{ 'stock': { $lte: ?0 } }")
    List<Product> findLowStockProducts(int threshold);

    List<Product> findTop6ByOrderByRatingDesc();
    
    List<Product> findByCategoryAndIdNot(String category, String id);
}
