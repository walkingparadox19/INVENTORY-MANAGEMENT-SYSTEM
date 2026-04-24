# 📦 Inventory Management System
## Complete Setup & Postman Guide

---

## 🗂️ FOLDER STRUCTURE
```
inventory-management/
├── server.js              ← Main file (run this to start)
├── package.json           ← Project dependencies
├── .env                   ← Your settings (DB password etc.)
├── database.sql           ← Run this in MySQL first!
├── config/
│   └── db.js              ← Database connection
├── middleware/
│   ├── auth.js            ← JWT token check
│   └── validate.js        ← Input validation
├── routes/
│   ├── auth.js            ← Login routes
│   └── products.js        ← Product routes
├── controllers/
│   ├── authController.js  ← Login logic
│   └── productController.js ← CRUD logic
└── public/
    └── index.html         ← Frontend UI
```

---

## ⚙️ STEP 1 - Setup MySQL Database

1. Open **MySQL Workbench**
2. Open the file `database.sql`
3. Run it (press Ctrl+Shift+Enter or click the ⚡ button)
4. This creates the database, tables, and sample data

---

## ⚙️ STEP 2 - Configure Your Password

Open the `.env` file and update:
```
DB_PASSWORD=your_actual_mysql_password
```

---

## ⚙️ STEP 3 - Install Dependencies

Open terminal/cmd inside the project folder and run:
```bash
npm install
```
Wait for it to finish downloading packages.

---

## ⚙️ STEP 4 - Start the Server

```bash
node server.js
```

You should see:
```
==============================================
  Inventory Management System Running!
==============================================
  Server URL  : http://localhost:3000
  API Base    : http://localhost:3000/api
  Frontend    : http://localhost:3000
==============================================
```

---

## 🧪 POSTMAN API TESTING GUIDE

### 📌 STEP 1: LOGIN (Do this FIRST to get token)

```
Method:  POST
URL:     http://localhost:3000/api/auth/login
Body:    raw → JSON
         {
           "username": "admin",
           "password": "admin123"
         }
```

**Response you get:**
```json
{
  "success": true,
  "message": "Login Successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 1, "username": "admin" }
}
```

⚠️ **COPY the token value** - you need it for all other requests!

---

### 📌 HOW TO USE TOKEN IN POSTMAN

For every request below:
1. Go to the **Headers** tab
2. Add: Key = `Authorization`, Value = `Bearer YOUR_TOKEN_HERE`

OR use the **Auth tab**:
1. Click **Authorization** tab
2. Type = **Bearer Token**
3. Paste your token

---

### 📌 STEP 2: GET ALL PRODUCTS

```
Method:  GET
URL:     http://localhost:3000/api/products
Headers: Authorization: Bearer YOUR_TOKEN
```

---

### 📌 STEP 3: GET ONE PRODUCT

```
Method:  GET
URL:     http://localhost:3000/api/products/1
Headers: Authorization: Bearer YOUR_TOKEN
```

---

### 📌 STEP 4: ADD NEW PRODUCT

```
Method:  POST
URL:     http://localhost:3000/api/products
Headers: Authorization: Bearer YOUR_TOKEN
         Content-Type: application/json
Body (raw JSON):
{
  "name": "Monitor",
  "category": "Electronics",
  "quantity": 5,
  "price": 12000,
  "description": "24 inch LED Monitor"
}
```

---

### 📌 STEP 5: UPDATE PRODUCT

```
Method:  PUT
URL:     http://localhost:3000/api/products/1
Headers: Authorization: Bearer YOUR_TOKEN
         Content-Type: application/json
Body (raw JSON):
{
  "name": "Laptop Pro",
  "category": "Electronics",
  "quantity": 15,
  "price": 65000,
  "description": "Updated Laptop"
}
```

---

### 📌 STEP 6: DELETE PRODUCT

```
Method:  DELETE
URL:     http://localhost:3000/api/products/1
Headers: Authorization: Bearer YOUR_TOKEN
```

---

### 📌 STEP 7: SEARCH PRODUCTS

```
Method:  GET
URL:     http://localhost:3000/api/products/search?name=laptop
Headers: Authorization: Bearer YOUR_TOKEN
```

---

## 🌐 FRONTEND UI

Open browser and go to: http://localhost:3000
- Login with admin / admin123
- View, Add, Edit, Delete products from UI

---

## ❗ TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| `npm install` fails | Make sure Node.js is installed |
| Cannot connect to DB | Check DB_PASSWORD in .env file |
| Token error in Postman | Login again and get new token |
| Port already in use | Change PORT=3001 in .env file |

---

## 📊 API SUMMARY TABLE

| Method | URL | Description | Auth Needed |
|--------|-----|-------------|-------------|
| POST | /api/auth/login | Login | ❌ No |
| POST | /api/auth/register | Register user | ❌ No |
| GET | /api/products | Get all products | ✅ Yes |
| GET | /api/products/:id | Get one product | ✅ Yes |
| GET | /api/products/search | Search | ✅ Yes |
| POST | /api/products | Add product | ✅ Yes |
| PUT | /api/products/:id | Update product | ✅ Yes |
| DELETE | /api/products/:id | Delete product | ✅ Yes |
