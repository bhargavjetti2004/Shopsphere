package com.shopsphere.service;

import com.shopsphere.dto.ProductRequest;
import com.shopsphere.exception.ResourceNotFoundException;
import com.shopsphere.model.Product;
import com.shopsphere.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private CloudinaryService cloudinaryService;

    public List<Product> getAllProducts(String search, String category, String brand, Double minPrice, Double maxPrice, Double minRating, String sortBy) {
        Query query = new Query();
        List<Criteria> criteriaList = new ArrayList<>();

        if (search != null && !search.trim().isEmpty()) {
            Criteria searchCriteria = new Criteria().orOperator(
                    Criteria.where("name").regex(search, "i"),
                    Criteria.where("brand").regex(search, "i"),
                    Criteria.where("category").regex(search, "i"),
                    Criteria.where("description").regex(search, "i")
            );
            criteriaList.add(searchCriteria);
        }

        if (category != null && !category.trim().isEmpty()) {
            criteriaList.add(Criteria.where("category").is(category));
        }

        if (brand != null && !brand.trim().isEmpty()) {
            criteriaList.add(Criteria.where("brand").is(brand));
        }

        if (minPrice != null || maxPrice != null) {
            Criteria priceCriteria = Criteria.where("price");
            if (minPrice != null) priceCriteria.gte(minPrice);
            if (maxPrice != null) priceCriteria.lte(maxPrice);
            criteriaList.add(priceCriteria);
        }

        if (minRating != null) {
            criteriaList.add(Criteria.where("rating").gte(minRating));
        }

        if (!criteriaList.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        }

        // Sorting
        if (sortBy != null) {
            switch (sortBy.toLowerCase()) {
                case "price_asc":
                    query.with(Sort.by(Sort.Direction.ASC, "price"));
                    break;
                case "price_desc":
                    query.with(Sort.by(Sort.Direction.DESC, "price"));
                    break;
                case "rating":
                    query.with(Sort.by(Sort.Direction.DESC, "rating"));
                    break;
                case "newest":
                default:
                    query.with(Sort.by(Sort.Direction.DESC, "createdAt"));
                    break;
            }
        } else {
            query.with(Sort.by(Sort.Direction.DESC, "createdAt"));
        }

        return mongoTemplate.find(query, Product.class);
    }

    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findTop6ByOrderByRatingDesc();
    }

    public List<Product> getRelatedProducts(String category, String productId) {
        return productRepository.findByCategoryAndIdNot(category, productId);
    }

    public Product createProduct(ProductRequest request) {
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .discount(request.getDiscount() != null ? request.getDiscount() : 0.0)
                .brand(request.getBrand())
                .category(request.getCategory())
                .stock(request.getStock())
                .imageUrl(request.getImageUrl())
                .cloudinaryPublicId(request.getCloudinaryPublicId())
                .rating(4.5)
                .reviewCount(0)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return productRepository.save(product);
    }

    public Product updateProduct(String id, ProductRequest request) {
        Product product = getProductById(id);

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        if (request.getDiscount() != null) product.setDiscount(request.getDiscount());
        product.setBrand(request.getBrand());
        product.setCategory(request.getCategory());
        product.setStock(request.getStock());
        
        if (request.getImageUrl() != null && !request.getImageUrl().isEmpty()) {
            product.setImageUrl(request.getImageUrl());
        }
        if (request.getCloudinaryPublicId() != null) {
            product.setCloudinaryPublicId(request.getCloudinaryPublicId());
        }
        
        product.setUpdatedAt(LocalDateTime.now());

        return productRepository.save(product);
    }

    public void deleteProduct(String id) {
        Product product = getProductById(id);
        if (product.getCloudinaryPublicId() != null) {
            cloudinaryService.deleteImage(product.getCloudinaryPublicId());
        }
        productRepository.delete(product);
    }
}
