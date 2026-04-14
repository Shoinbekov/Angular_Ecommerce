# 🛒 Modern Store

A full-stack e-commerce web application built with **Angular** (frontend) and **Django REST Framework** (backend).  
Users can browse products by category, add items to cart, place orders, and manage their profile.  
Admins can manage products, categories, and view all orders.

---

## 👥 Group Members

| Name                | GitHub                                       |
| ------------------- | -------------------------------------------- |
| Shoinbekov Shoinbek | [@shoinbekov](https://github.com/shoinbekov) |
| Taikpanov Ruslan    | [@taikpanov](https://github.com/taikpanov)   |
| Kanakhan Beisenali  | [@kanakhan](https://github.com/kanakhan)     |

> **University:** KBTU &nbsp;|&nbsp; **Course:** Web Development &nbsp;|&nbsp; **Stack:** Angular + Django

---

## 📋 Project Description

**Modern Store** is an online shopping platform with the following features:

- 🔐 JWT-based authentication (register, login, logout)
- 🗂️ Browse products by category with search functionality
- 🛍️ Add to cart, update quantities, remove items
- ❤️ Add products to wishlist/favorites
- 📦 Place orders and view order history
- ⭐ Product ratings and reviews
- 🔧 Admin panel for managing products and orders

---

## 🛠️ Tech Stack

| Layer       | Technology                       |
| ----------- | -------------------------------- |
| Frontend    | Angular 17, TypeScript, CSS      |
| Backend     | Django 4, Django REST Framework  |
| Database    | SQLite (dev) / PostgreSQL (prod) |
| Auth        | JWT Token Authentication         |
| API Testing | Postman                          |

---

## 📁 Repository Structure

```
modern-store/
├── frontend/           # Angular project (ng new)
├── backend/            # Django + DRF project
├── postman/            # Postman collection (.json)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- Angular CLI (`npm install -g @angular/cli`)

### Frontend

```bash
cd frontend
npm install
ng serve
```

App runs at `http://localhost:4200`

### Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

API runs at `http://localhost:8000`

---

## 🔗 API Endpoints (Summary)

| Method   | Endpoint              | Description             |
| -------- | --------------------- | ----------------------- |
| POST     | `/api/auth/login/`    | Login and get JWT token |
| POST     | `/api/auth/register/` | Register new user       |
| POST     | `/api/auth/logout/`   | Logout                  |
| GET      | `/api/products/`      | List all products       |
| GET      | `/api/products/:id/`  | Product detail          |
| GET      | `/api/categories/`    | List categories         |
| GET/POST | `/api/cart/`          | View / add to cart      |
| DELETE   | `/api/cart/:id/`      | Remove from cart        |
| GET/POST | `/api/orders/`        | View / place orders     |

---

## ✅ Requirements Coverage

### Angular (Frontend)

- [x] Interfaces and services with HttpClient
- [x] 4+ click events triggering API requests
- [x] 4+ form controls with `[(ngModel)]`
- [x] CSS styling on all components
- [x] Routing module with 3+ named routes
- [x] `@for` and `@if` for data rendering
- [x] JWT authentication with HTTP interceptor
- [x] Error handling with user-friendly messages

### Django (Backend)

- [x] 4+ models with 2+ ForeignKey relationships
- [x] 2+ `serializers.Serializer` classes
- [x] 2+ `serializers.ModelSerializer` classes
- [x] 2+ Function-Based Views (FBV)
- [x] 2+ Class-Based Views (CBV)
- [x] Token-based auth (login/logout)
- [x] Full CRUD for Product model
- [x] Objects linked to `request.user`
- [x] CORS configured for Angular dev server
- [x] Postman collection in `/postman`

---

## 📄 License

This project was created for educational purposes at KBTU.
