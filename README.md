# ShopSphere — Full-Stack E-Commerce Platform

ShopSphere is a full-stack, end-to-end e-commerce web application built with **React (Vite)**, **Spring Boot**, **MongoDB**, **Spring Security + JWT**, and **Cloudinary** for image management.

Designed as a portfolio project, ShopSphere features clean code, modern dark glassmorphism UI styling, robust role-based authentication, real-time inventory management, itemized shopping cart, wishlist, address checkout, order history tracking, customer reviews, and an admin dashboard.

---

## Architecture

```text
React (Vite Frontend)
        ↓
   Axios Interceptor (Bearer JWT Token)
        ↓
Spring Boot 3 REST API Server
   ├── Spring Security + BCrypt
   ├── Spring Data MongoDB Repository
   └── Cloudinary Service
        ↓                           ↓
 MongoDB Database           Cloudinary Cloud Storage
 (Users, Products, Cart,    (Product Image Storage & CDN URLs)
  Orders, Wishlists)
```

---

## Technologies Used

### Frontend
- **React.js 18** (Vite)
- **JavaScript (ES6+)**
- **Vanilla CSS3** (Custom Design System with dynamic variables, glassmorphism, responsive grids)
- **React Router DOM v6** (Client-side routing & route protection)
- **Axios** (REST API Client with token interceptors)
- **React Context API** (`AuthContext`, `CartContext`, `WishlistContext`)
- **Lucide React** (Modern iconography)

### Backend
- **Java 21 / 17+**
- **Spring Boot 3.2**
- **Spring Security 6** (Stateless authentication with JWT & BCrypt)
- **Spring Data MongoDB**
- **Cloudinary Java SDK**
- **Maven**
- **Lombok**

### Database & Storage
- **MongoDB** (MongoDB Atlas or Local MongoDB)
- **Cloudinary** (Cloud image storage; MongoDB stores image URL & public ID)

---

## Folder Structure

```text
ShopSphere/
├── frontend/
│   ├── src/
│   │   ├── components/       # Navbar, Footer, ProductCard, ProductGrid, CartItem, etc.
│   │   ├── context/          # AuthContext, CartContext, WishlistContext
│   │   ├── pages/            # Home, Products, ProductDetails, Cart, Checkout, Admin, etc.
│   │   ├── routes/           # AppRoutes with ProtectedRoute and AdminRoute
│   │   ├── services/         # Axios API service calls (auth, product, cart, order, admin)
│   │   ├── App.jsx
│   │   ├── index.css         # Modern Design System
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/main/java/com/shopsphere/
│   │   ├── config/           # CloudinaryConfig, SecurityConfig, DataInitializer
│   │   ├── controller/       # REST Controllers (Auth, Product, Cart, Order, Admin)
│   │   ├── dto/              # Requests & Response DTOs
│   │   ├── exception/        # GlobalExceptionHandler & Custom Exceptions
│   │   ├── model/            # User, Product, Category, Cart, Order, Review
│   │   ├── repository/       # Spring Data MongoDB Repositories
│   │   ├── security/         # JwtUtils, AuthTokenFilter, UserDetailsServiceImpl
│   │   └── service/          # AuthService, ProductService, OrderService, CloudinaryService
│   ├── src/main/resources/
│   │   └── application.yml
│   └── pom.xml
├── docs/
│   ├── architecture.md
│   ├── database.md
│   └── setup.md
├── .env.example
├── .env
└── README.md
```

---

## Features

### 🛒 Customer Role
- **Authentication**: Register, Login, JWT storage, profile updates.
- **Product Discovery**: Search by name/brand/category, multi-filter by category, brand, price range, min rating, and sort (price low/high, rating, newest).
- **Product Details**: Gallery, stock indicators, quantity selector, add to cart / buy now, wishlist toggle, customer review submission, related products.
- **Shopping Cart**: Real-time quantity modifiers, stock cap validation, clear cart, total subtotal calculation.
- **Wishlist**: Save favorite items, move to cart with 1 click.
- **Checkout & Orders**: Address entry, COD or Simulated Online Payment, automated stock reduction, cart clearing, itemized order confirmation, order history with status tracking.

### 🛡️ Admin Role
- **Dashboard Analytics**: Metrics cards for Total Revenue, Total Orders, Total Products, Total Users, Pending Orders, and Low Stock Alerts.
- **Product Management**: Add, edit, delete products, and upload product images directly to Cloudinary.
- **Category Management**: Create, update, and delete product categories.
- **Order Management**: Monitor all platform orders and transition statuses (`PLACED` → `CONFIRMED` → `SHIPPED` → `DELIVERED` / `CANCELLED`).
- **User Management**: View all customer accounts and toggle active/disabled status.

### 👤 Guest Role
- View homepage, hero section, categories, browse catalog, search, filter, and view product details.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your MongoDB Atlas and Cloudinary credentials:

```env
SPRING_DATA_MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/shopsphere?retryWrites=true&w=majority
JWT_SECRET=shopsphereSuperSecretKeyThatIsAtLeast32BytesLongForHS256Security!
JWT_EXPIRATION_MS=86400000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PORT=8080
```

---

## How to Run

### 1. Run Backend (Spring Boot)
```bash
cd backend
mvn clean spring-boot:run
```
Backend REST API will run on `http://localhost:8080`.

### 2. Run Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on `http://localhost:5173`.

---

## Demo Accounts (Auto-Seeded on Startup)

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@shopsphere.com` | `admin123` |
| **Customer 1** | `customer1@shopsphere.com` | `password123` |
| **Customer 2** | `customer2@shopsphere.com` | `password123` |
| **Customer 3** | `customer3@shopsphere.com` | `password123` |

---

## Future Improvements
- Integration with live payment gateways (Stripe / Razorpay).
- Email notifications for order confirmations using Spring Mail.
- Multi-currency support and localized discount coupons.
