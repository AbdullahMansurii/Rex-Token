# 🪐 REX Token
> **Defying Expectations. Elevating Investments.**

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg?style=flat&logo=mongodb)
![Vite](https://img.shields.io/badge/Vite-Fast-646cff.svg?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Premium_Design-38bdf8.svg?style=flat&logo=tailwindcss)

## 🚀 Overview

**REX Token** is a next-generation investment platform built with a **Full-Stack MERN Architecture**. It combines a high-fidelity, premium dark user interface with a robust backend for managing users, transactions, and network structures.

The platform is now **fully functional**, featuring real-time authentication, database integration, and a comprehensive admin management system.

---

## ✨ Key Features

### 👤 User Dashboard
*   **Comprehensive Overview**: Real-time stats, referral income, and wallet balances pulled from the database.
*   **Global Search**: Instant navigation to any page or feature via a smart search bar.
*   **Notifications**: Real-time alerts for system updates, investments, and KYC status.
*   **Profile Management**: Edit and save personal details (Name, Phone, Email) instantly.
*   **Earnings Analytics**: Detailed transaction history and income breakdown.

### 🛡️ Admin Panel
*   **Central Command**: Live dashboard displaying total users, active packages, and financial stats.
*   **User Management**: Full CRUD capabilities – **Delete**, **Edit**, **Promote/Demote** users directly from the UI.
*   **Approvals**: Manage KYC submissions and Withdrawal requests.
*   **Analytics**: Monitor system health and user growth.

---

## 🛠️ Tech Stack

### Frontend
*   **Core**: [React 19](https://react.dev/) + [Vite 7](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + custom animations
*   **Routing**: React Router DOM v7
*   **Icons**: Lucide React
*   **State**: Context API (Auth & Data)

### Backend
*   **Runtime**: **Node.js** + **Express.js**
*   **Database**: **MongoDB** (Mongoose ODM)
*   **Authentication**: JWT (JSON Web Tokens) with secure cookie/local storage
*   **File Handling**: Multer (for KYC & Profile uploads)

---

## 💻 Getting Started

Follow these steps to run the full stack project locally.

### Prerequisites
*   Node.js (v18 or higher)
*   MongoDB Instance (Local or Atlas URL)

### Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/rex-token.git
    cd rex-token
    ```

2.  **Frontend Setup**
    ```bash
    # Install dependencies
    npm install
    
    # Run the frontend
    npm run dev
    ```
    _Frontend runs on `http://localhost:5173`_

3.  **Backend Setup**
    Open a new terminal:
    ```bash
    cd backend
    
    # Install backend dependencies
    npm install
    
    # Configure Environment
    # Create a .env file in /backend with:
    # MONGO_URI=your_mongodb_connection_string
    # JWT_SECRET=your_jwt_secret
    # PORT=5000
    
    # Run the backend
    npm run dev
    ```
    _Backend runs on `http://localhost:5000`_

---

## 🔮 Roadmap

- [x] 🎨 **Phase 1: UI/UX Design** (Premium Dark Theme)
- [x] 🔗 **Phase 2: Backend Integration** (Node.js & Express)
- [x] 🗄️ **Phase 3: Database Connection** (MongoDB Connected)
- [x] 🔐 **Phase 4: Authentication & Security** (JWT, Protected Routes)
- [x] 🛠️ **Phase 5: Admin Tools** (User Management, Search, Analytics)
- [ ] 🚀 **Phase 6: Production Deployment** (Vercel/Render/DigitalOcean)

---

<p align="center">
  Made with ❤️ by the REX Token Team
</p>
