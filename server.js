// =============================================
// server.js - Main Server File
// =============================================
// This is the starting point of our application
// Run this file with: node server.js

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load .env variables

// Create express app
const app = express();

// -----------------------------------------------
// MIDDLEWARES (Applied to all requests)
// -----------------------------------------------

// Allow requests from any origin (needed for frontend)
app.use(cors());

// Parse incoming JSON data (so we can read req.body)
app.use(express.json());

// Parse URL encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// -----------------------------------------------
// ROUTES
// -----------------------------------------------

// Import route files
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

// Use routes with base URLs
app.use('/api/auth', authRoutes);         // Login routes  -> /api/auth/login
app.use('/api/products', productRoutes);  // Product routes -> /api/products

// -----------------------------------------------
// HOME ROUTE - Test if server is running
// -----------------------------------------------
app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: 'Inventory Management System API is Running!',
        endpoints: {
            auth: {
                login: 'POST /api/auth/login',
                register: 'POST /api/auth/register'
            },
            products: {
                getAll: 'GET /api/products',
                getOne: 'GET /api/products/:id',
                search: 'GET /api/products/search?name=&category=',
                create: 'POST /api/products',
                update: 'PUT /api/products/:id',
                delete: 'DELETE /api/products/:id'
            }
        }
    });
});

// -----------------------------------------------
// SERVE FRONTEND (HTML page)
// -----------------------------------------------
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// -----------------------------------------------
// ERROR HANDLER - Catches any unhandled errors
// -----------------------------------------------
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong on the server!',
        error: err.message
    });
});

// 404 Handler - Route not found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.url} not found!`
    });
});

// -----------------------------------------------
// START SERVER
// -----------------------------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('==============================================');
    console.log(` Inventory Management System Running!`);
    console.log(`==============================================`);
    console.log(` Server URL  : http://localhost:${PORT}`);
    console.log(` API Base    : http://localhost:${PORT}/api`);
    console.log(` Frontend    : http://localhost:${PORT}`);
    console.log('==============================================');
});
