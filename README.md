# 📚 AP Bokifa — Bookstore Web Application

AP Bokifa is a full-stack bookstore web application built with modern web technologies. It provides a platform for managing books, authors, blogs, users, and authentication.

The project includes a backend API and a frontend application with an admin panel for managing bookstore content.

---

## 🚀 Features

### 👤 Authentication

* User registration
* Email OTP verification
* Temporary password generation
* Password change
* User login
* JWT Access Token authentication
* JWT Refresh Token authentication
* HTTP-only refresh token cookie
* Role-based admin access
* User profile management

### 📚 Books

* View all books
* View individual book details
* Add books
* Update books
* Delete books
* Associate books with authors
* Book image upload

### ✍️ Authors

* View all authors
* View individual author details
* Add authors
* Update authors
* Delete authors
* Add multiple books while creating an author
* View books belonging to an author
* Author profile image upload

### 📝 Blogs

* Create blogs
* View blogs
* Update blogs
* Delete blogs
* Draft and published blog status
* Featured blog images
* Track the user who created the blog

### 🛠️ Admin Panel

Administrators can access the admin panel from:

```text
/admin
```

Admin access is restricted based on the user's role.

---

# 🧑‍💻 Tech Stack

## Frontend

* React.js
* JavaScript
* Axios
* React Router
* Tailwind CSS
* Context API
* Responsive UI

## Backend

* Node.js
* Express.js
* MySQL
* mysql2
* JWT
* bcrypt
* Nodemailer
* Multer
* Cookie Parser
* CORS

## Database

* MySQL
* MySQL Stored Procedures
* JSON / JSON_TABLE
* Transactions

## Other Services

* ImageKit for image storage
* Gmail/Nodemailer for email and OTP functionality

---

# 📁 Project Structure

```text
AP_BOKIFA/
│
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── utils/
│   ├── stored-procedures/
│   ├── db.js
│   ├── app.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── .env
│
└── README.md
```

> Folder names may differ slightly depending on the current project structure.

---

# ⚙️ Prerequisites

Before running the project, install:

* Node.js
* npm
* MySQL
* MySQL Workbench
* Git

Check your Node.js installation:

```bash
node -v
```

Check npm:

```bash
npm -v
```

Check Git:

```bash
git --version
```

---

# 🗄️ Database Setup

### 1. Start MySQL

Make sure your MySQL server is running.

### 2. Create the database

Open MySQL Workbench and run:

```sql
CREATE DATABASE ap_bokifa;
```

### 3. Select the database

```sql
USE ap_bokifa;
```

### 4. Create the required tables

Run the SQL files provided in the project in the required order.

The database contains entities such as:

* Users
* Authors
* Books
* Blogs

### 5. Create Stored Procedures

Run the project's stored procedure SQL files in MySQL Workbench.

The backend uses stored procedures for database operations.

---

# 🔐 Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ap_bokifa

JWT_ACCESS_SECRET_KEY=your_access_secret
JWT_REFRESH_SECRET_KEY=your_refresh_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

# 🔧 Backend Setup

Open the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Or, depending on the scripts available in `package.json`:

```bash
npm start
```

The backend will run on:

```text
http://localhost:3000
```

You can test the server by opening:

```text
http://localhost:3000/
```

Expected response:

```text
Server is live
```

---

# 🎨 Frontend Setup

Open a second terminal.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally be available at the URL shown by Vite in the terminal, for example:

```text
http://localhost:5173
```

---

# 🔑 Authentication Flow

The authentication system follows this general flow:

```text
Register
   ↓
Temporary Password Generated
   ↓
Email / OTP Verification
   ↓
Verify OTP
   ↓
Set New Password
   ↓
Login
   ↓
Access Token + Refresh Token
   ↓
Authenticated Application
```

The refresh token is stored using an HTTP-only cookie.

---

# 🔌 API Structure

The backend follows a layered architecture:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
Stored Procedure
  ↓
MySQL Database
```

This structure keeps API routes, business logic, and database operations separated.

---

# 📡 Main API Areas

The backend contains APIs for areas such as:

```text
Authentication
Authors
Books
Blogs
Admin
Users
```

The exact endpoints can be found inside the backend `routes` directory.

---

# 🧪 API Testing

You can test backend APIs using:

* Postman
* Thunder Client
* REST Client

For authenticated requests, provide the required access token according to the API implementation.

Example:

```http
Authorization: Bearer <ACCESS_TOKEN>
```

---

# 🖼️ Image Uploads

The application supports image uploads for content such as:

* Author profile images
* Book images
* Blog featured images

Multer is used to process uploaded files.

Author and book images can be stored using ImageKit depending on the configured backend functionality.

---

# 🔄 Development Workflow

A typical development workflow is:

```text
1. Start MySQL
        ↓
2. Start Backend
        ↓
3. Start Frontend
        ↓
4. Register / Login
        ↓
5. Access Application
        ↓
6. Admin → Manage Authors / Books / Blogs
```

---

# 🐛 Troubleshooting

### Backend does not start

Check:

```bash
npm install
```

Then verify:

* MySQL is running
* `.env` exists
* Database credentials are correct
* Required environment variables are configured

---

### MySQL connection error

Verify:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ap_bokifa
```

Also make sure the database exists:

```sql
SHOW DATABASES;
```

---

### Port already in use

If port `3000` is already being used, stop the existing process or change the backend `PORT` value.

---

### Authentication problems

Check:

* Access token configuration
* Refresh token configuration
* JWT secret keys
* Browser cookies
* CORS configuration
* Backend URL used by the frontend

---


## ⭐ Project Purpose

AP Bokifa was developed to demonstrate a complete full-stack bookstore application with:

* Modern frontend development
* REST APIs
* Authentication
* Authorization
* MySQL database design
* Stored procedures
* CRUD operations
* Image uploads
* Email verification
* Admin management
* Frontend/backend integration

If you find the project useful, consider giving the repository a ⭐.
