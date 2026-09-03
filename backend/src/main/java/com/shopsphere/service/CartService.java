package com.shopsphere.service;

import com.shopsphere.dto.CartItemRequest;
import com.shopsphere.exception.BadRequestException;
import com.shopsphere.model.Cart;
import com.shopsphere.model.Cart.CartItem;
import com.shopsphere.model.Product;
import com.shopsphere.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductService productService;

    public Cart getCartByUserId(String userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart cart = Cart.builder()
                            .userId(userId)
                            .items(new ArrayList<>())
                            .totalAmount(0.0)
                            .updatedAt(LocalDateTime.now())
                            .build();
                    return cartRepository.save(cart);
                });
    }

    public Cart addItemToCart(String userId, CartItemRequest request) {
        Product product = productService.getProductById(request.getProductId());
        
        Cart cart = getCartByUserId(userId);
        
        Optional<CartItem> existingItemOpt = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(request.getProductId()))
                .findFirst();

        int newQuantity = request.getQuantity();
        if (existingItemOpt.isPresent()) {
            newQuantity += existingItemOpt.get().getQuantity();
        }

        if (newQuantity > product.getStock()) {
            throw new BadRequestException("Requested quantity exceeds available stock (" + product.getStock() + " available)");
        }

        if (existingItemOpt.isPresent()) {
            existingItemOpt.get().setQuantity(newQuantity);
            existingItemOpt.get().setPrice(product.getPrice());
        } else {
            CartItem newItem = CartItem.builder()
                    .productId(product.getId())
                    .quantity(request.getQuantity())
                    .price(product.getPrice())
                    .build();
            cart.getItems().add(newItem);
        }

        recalculateCartTotal(cart);
        cart.setUpdatedAt(LocalDateTime.now());
        return cartRepository.save(cart);
    }

    public Cart updateItemQuantity(String userId, String productId, int quantity) {
        if (quantity <= 0) {
            return removeItemFromCart(userId, productId);
        }

        Product product = productService.getProductById(productId);
        if (quantity > product.getStock()) {
            throw new BadRequestException("Requested quantity exceeds available stock (" + product.getStock() + " available)");
        }

        Cart cart = getCartByUserId(userId);
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new BadRequestException("Item not found in cart"));

        item.setQuantity(quantity);
        item.setPrice(product.getPrice());

        recalculateCartTotal(cart);
        cart.setUpdatedAt(LocalDateTime.now());
        return cartRepository.save(cart);
    }

    public Cart removeItemFromCart(String userId, String productId) {
        Cart cart = getCartByUserId(userId);
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        recalculateCartTotal(cart);
        cart.setUpdatedAt(LocalDateTime.now());
        return cartRepository.save(cart);
    }

    public void clearCart(String userId) {
        Cart cart = getCartByUserId(userId);
        cart.getItems().clear();
        cart.setTotalAmount(0.0);
        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart);
    }

    private void recalculateCartTotal(Cart cart) {
        double total = cart.getItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        cart.setTotalAmount(total);
    }
}
