# ShopSphere System Architecture

ShopSphere follows a clean, decoupled 3-tier REST architecture:

```text
React (Vite Frontend)
        ↓  (Axios HTTP Requests + JWT Bearer Header)
Spring Boot 3 REST API (Java 21)
        ↓                           ↓
  MongoDB Database          Cloudinary Image Cloud
 (Users, Products, Cart,    (Product Image Storage & Public URLs)
  Orders, Wishlist, etc.)
```

## Frontend Layer (React.js)
- **Vite**: Rapid build tool and local dev server with HMR.
- **React Context API**: Centralized state management for Authentication (`AuthContext`), Shopping Cart (`CartContext`), and Wishlist (`WishlistContext`).
- **React Router DOM v6**: Client-side routing with `ProtectedRoute` (authenticated users) and `AdminRoute` (ROLE_ADMIN access control).
- **Axios Interceptors**: Automatically injects JWT `Authorization: Bearer <token>` header on authenticated HTTP requests.

## Backend Layer (Spring Boot 3)
- **Spring Security 6 & JWT**: Stateless token-based security, BCrypt password hashing, and role-based access control (`ROLE_CUSTOMER` and `ROLE_ADMIN`).
- **Spring Data MongoDB**: Object-Document Mapping (ODM) layer interacting with MongoDB Atlas or local MongoDB databases.
- **Cloudinary Service**: Spring Boot integrates with Cloudinary SDK to handle product image uploads seamlessly, returning secure HTTPS image URLs stored inside MongoDB documents.

## Image Storage Architecture (Cloudinary Workflow)
1. Admin selects a product image file in the React Admin panel.
2. React sends a `MultipartFile` POST request to `/api/products/upload-image`.
3. Spring Boot receives the file and delegates upload to `CloudinaryService`.
4. Cloudinary returns a secure HTTPS `imageUrl` and `cloudinaryPublicId`.
5. Spring Boot saves the URL string into the MongoDB Product document (MongoDB never stores binary image data).
