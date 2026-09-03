# ShopSphere Setup & Installation Guide

Follow this simple guide to run **ShopSphere** locally on your machine or deploy it with MongoDB Atlas and Cloudinary.

## Prerequisites
- **Java 17+** (Java 21 recommended)
- **Node.js** (v18+) & **npm**
- **Apache Maven** (or included Maven wrapper `mvnw`)
- **MongoDB** (Local instance on `mongodb://localhost:27017` or MongoDB Atlas Cluster URI)

---

## 1. Configure Environment Variables
Copy `.env.example` to `.env` in the root directory:

```bash
cp .env.example .env
```

Set your MongoDB Atlas connection string and Cloudinary API credentials:
```env
SPRING_DATA_MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/shopsphere?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=shopsphereSuperSecretKeyThatIsAtLeast32BytesLongForHS256Security!
```

---

## 2. Start Backend (Spring Boot)
Navigate to the `backend` directory:
```bash
cd backend
mvn clean spring-boot:run
```
The backend REST API will start on **`http://localhost:8080`**.
On initial startup, `DataInitializer` will automatically seed:
- **1 Admin Account**: `admin@shopsphere.com` / `admin123`
- **5 Customer Accounts**: `customer1@shopsphere.com` / `password123`
- **6 Categories**
- **30 Realistic Products**

---

## 3. Start Frontend (React + Vite)
In a new terminal window, navigate to the `frontend` directory:
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser to access the ShopSphere e-commerce application!
