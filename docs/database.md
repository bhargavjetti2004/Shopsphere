# ShopSphere Database Schema (MongoDB)

ShopSphere uses MongoDB to persist application data across 7 collections.

## Collections Overview

### 1. `users` Collection
Stores customer and admin account information.
```json
{
  "_id": "ObjectId",
  "name": "Customer User 1",
  "email": "customer1@shopsphere.com",
  "password": "$2a$10$BCryptHashedPassword...",
  "phone": "+1 800 555 0101",
  "role": "ROLE_CUSTOMER",
  "enabled": true,
  "createdAt": "2026-08-22T19:00:00.000Z"
}
```

### 2. `products` Collection
Stores product inventory, prices, ratings, and Cloudinary image references.
```json
{
  "_id": "ObjectId",
  "name": "Wireless Noise-Canceling Headphones",
  "description": "Premium over-ear Bluetooth headphones with active noise cancellation...",
  "price": 299.99,
  "discount": 15.0,
  "brand": "SoundPro",
  "category": "Electronics",
  "stock": 25,
  "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  "cloudinaryPublicId": "shopsphere/products/headphones_01",
  "rating": 4.8,
  "reviewCount": 42,
  "createdAt": "2026-08-22T19:00:00.000Z",
  "updatedAt": "2026-08-22T19:00:00.000Z"
}
```

### 3. `categories` Collection
Stores store product categories.
```json
{
  "_id": "ObjectId",
  "name": "Electronics",
  "description": "Gadgets, audio, smartphones, and smart devices",
  "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
}
```

### 4. `carts` Collection
Stores customer shopping carts and item quantities.
```json
{
  "_id": "ObjectId",
  "userId": "UserObjectId",
  "items": [
    {
      "productId": "ProductObjectId",
      "quantity": 2,
      "price": 299.99
    }
  ],
  "totalAmount": 599.98,
  "updatedAt": "2026-08-22T19:05:00.000Z"
}
```

### 5. `wishlists` Collection
Stores customer saved wishlist items.
```json
{
  "_id": "ObjectId",
  "userId": "UserObjectId",
  "productIds": ["ProductObjectId1", "ProductObjectId2"]
}
```

### 6. `orders` Collection
Stores placed customer orders and shipping details.
```json
{
  "_id": "ObjectId",
  "userId": "UserObjectId",
  "items": [
    {
      "productId": "ProductObjectId",
      "productName": "Wireless Noise-Canceling Headphones",
      "quantity": 2,
      "price": 299.99,
      "subtotal": 599.98
    }
  ],
  "totalAmount": 599.98,
  "shippingAddress": {
    "fullName": "John Doe",
    "phone": "+1 800 555 0199",
    "address": "124 Grand Avenue",
    "city": "New York",
    "state": "NY",
    "pincode": "10001"
  },
  "paymentMethod": "COD",
  "paymentStatus": "PENDING",
  "orderStatus": "PLACED",
  "createdAt": "2026-08-22T19:10:00.000Z"
}
```

### 7. `reviews` Collection
Stores customer product reviews and ratings.
```json
{
  "_id": "ObjectId",
  "productId": "ProductObjectId",
  "userId": "UserObjectId",
  "userName": "John Doe",
  "rating": 5,
  "comment": "Outstanding build quality and noise cancellation!",
  "createdAt": "2026-08-22T19:15:00.000Z"
}
```
