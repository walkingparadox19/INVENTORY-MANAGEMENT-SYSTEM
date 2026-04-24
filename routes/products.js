// =============================================
// routes/products.js - Product Routes
// =============================================
// Defines URL paths for all product operations
// All routes here are PROTECTED (need login token)

const express = require('express');
const router = express.Router();

// Import controller functions
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts
} = require('../controllers/productController');

// Import middlewares
const verifyToken = require('../middleware/auth');         // Authentication check
const { validateProduct } = require('../middleware/validate'); // Input validation

// -----------------------------------------------
// ROUTES (All protected - need JWT token)
// -----------------------------------------------

// GET    /api/products/search?name=laptop  --> Search products
router.get('/search', verifyToken, searchProducts);

// GET    /api/products          --> Get all products
router.get('/', verifyToken, getAllProducts);

// GET    /api/products/1        --> Get product with ID 1
router.get('/:id', verifyToken, getProductById);

// POST   /api/products          --> Add new product
router.post('/', verifyToken, validateProduct, createProduct);

// PUT    /api/products/1        --> Update product with ID 1
router.put('/:id', verifyToken, validateProduct, updateProduct);

// DELETE /api/products/1        --> Delete product with ID 1
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
