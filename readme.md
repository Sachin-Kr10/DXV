# 🛒 MERN E-commerce Website

A full-stack, production-ready e-commerce platform built using the MERN stack.  
Designed with scalability, security, SEO, and modern UI/UX principles in mind.

---

## 📌 Project Overview

This project is a complete online shopping platform that supports:

- Secure user & admin authentication
- OTP-based login and signup
- Product & inventory management
- Cart & order processing
- SEO-optimized product pages
- Cloud-based image storage
- Responsive premium UI

It follows industry best practices for authentication, performance, and deployment.

---

## 🌐 Live Deployment

### Frontend (Vercel)
🚀 Hosted on **Vercel**

### Backend (Render)
⚙️ Hosted on **Render**

> ⚠️ For **Admin Access**, contact:  
> 📞 **9625973956**

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### Other Tools & Services
- Cloudinary (Image CDN)
- Bravo API (OTP SMS Service)
- Render (Backend Hosting)
- Vercel (Frontend Hosting)

---

## 🔐 Authentication System

This project uses a **secure multi-layer authentication system** with:

### ✅ JWT-Based Authentication
- Short-lived Access Tokens
- Long-lived Refresh Tokens
- Automatic token renewal

### ✅ OTP-Based Login & Signup (Bravo API)
- Phone number verification
- SMS-based OTP delivery
- Secure OTP validation
- Automatic user registration on first login

### ✅ Role-Based Authorization
- User Access
- Admin Access
- Protected Routes

### ✅ Dual-Layer Security
- Backend middleware validation
- Frontend route guards

Both frontend and backend verify authentication and authorization.

---

## 📱 OTP Login / Signup Flow

This project supports **passwordless authentication** using OTP.

### Flow:

Enter Phone Number
↓
OTP Sent via Bravo API
↓
Enter OTP
↓
Verify OTP
↓
Login / Auto Signup
↓
Generate JWT Tokens


### Benefits:
- No password required
- Reduced account compromise
- Faster onboarding
- Mobile-friendly login

---

## 🚀 How to Run Locally

### Backend
cd backend  
npm install  
npm run dev  

### Frontend
cd frontend  
npm install  
npm run dev 

## 📌 Status
In Progress 🚧