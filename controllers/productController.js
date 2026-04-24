// =============================================
// controllers/productController.js - Product CRUD Logic
// =============================================
// This file handles all product operations:
// C - Create (Add product)
// R - Read   (Get products)
// U - Update (Edit product)
// D - Delete (Remove product)

const db = require('../config/db'); // Database connection

// -----------------------------------------------
// GET ALL PRODUCTS - GET /api/products
// -----------------------------------------------
// Returns list of all products in inventory
const getAllProducts = async (req, res) => {
    try {
        // Query to get all products, sorted by newest first
        const [products] = await db.query(
            'SELECT * FROM products ORDER BY created_at DESC'
        );

        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            count: products.length,  // Total number of products
            data: products
        });

    } catch (error) {
        console.error('Get All Products Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error! Could not fetch products.',
            error: error.message
        });
    }
};

// -----------------------------------------------
// GET SINGLE PRODUCT - GET /api/products/:id
// -----------------------------------------------
// Returns one product by its ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from URL (e.g., /api/products/1)

        const [products] = await db.query(
            'SELECT * FROM products WHERE id = ?',
            [id]
        );

        // Check if product exists
        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Product with ID ${id} not found!`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: products[0]
        });

    } catch (error) {
        console.error('Get Product Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error! Could not fetch product.',
            error: error.message
        });
    }
};

// -----------------------------------------------
// CREATE PRODUCT - POST /api/products
// -----------------------------------------------
// Adds a new product to the inventory
const createProduct = async (req, res) => {
    try {
        // Get data from request body (sent from Postman)
        const { name, category, quantity, price, description } = req.body;

        // Insert new product into database
        const [result] = await db.query(
            'INSERT INTO products (name, category, quantity, price, description) VALUES (?, ?, ?, ?, ?)',
            [name.trim(), category.trim(), quantity, price, description || '']
        );

        // Fetch the newly created product to send back
        const [newProduct] = await db.query(
            'SELECT * FROM products WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: 'Product added successfully!',
            data: newProduct[0]
        });

    } catch (error) {
        console.error('Create Product Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error! Could not add product.',
            error: error.message
        });
    }
};

// -----------------------------------------------
// UPDATE PRODUCT - PUT /api/products/:id
// -----------------------------------------------
// Updates an existing product's details
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params; // Product ID from URL
        const { name, category, quantity, price, description } = req.body;

        // First check if product exists
        const [existing] = await db.query(
            'SELECT * FROM products WHERE id = ?',
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Product with ID ${id} not found!`
            });
        }

        // Update the product in database
        await db.query(
            'UPDATE products SET name=?, category=?, quantity=?, price=?, description=? WHERE id=?',
            [name.trim(), category.trim(), quantity, price, description || '', id]
        );

        // Fetch updated product
        const [updatedProduct] = await db.query(
            'SELECT * FROM products WHERE id = ?',
            [id]
        );

        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: updatedProduct[0]
        });

    } catch (error) {
        console.error('Update Product Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error! Could not update product.',
            error: error.message
        });
    }
};

// -----------------------------------------------
// DELETE PRODUCT - DELETE /api/products/:id
// -----------------------------------------------
// Removes a product from the inventory
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; // Product ID from URL

        // First check if product exists
        const [existing] = await db.query(
            'SELECT * FROM products WHERE id = ?',
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Product with ID ${id} not found!`
            });
        }

        // Delete the product
        await db.query('DELETE FROM products WHERE id = ?', [id]);

        res.status(200).json({
            success: true,
            message: `Product "${existing[0].name}" deleted successfully!`
        });

    } catch (error) {
        console.error('Delete Product Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error! Could not delete product.',
            error: error.message
        });
    }
};

// -----------------------------------------------
// SEARCH PRODUCTS - GET /api/products/search?name=laptop
// -----------------------------------------------
// Search products by name or category
const searchProducts = async (req, res) => {
    try {
        const { name, category } = req.query; // Get search params from URL

        let query = 'SELECT * FROM products WHERE 1=1';
        let params = [];

        // Add name filter if provided
        if (name) {
            query += ' AND name LIKE ?';
            params.push(`%${name}%`);
        }

        // Add category filter if provided
        if (category) {
            query += ' AND category LIKE ?';
            params.push(`%${category}%`);
        }

        query += ' ORDER BY created_at DESC';

        const [products] = await db.query(query, params);

        res.status(200).json({
            success: true,
            message: 'Search results fetched!',
            count: products.length,
            data: products
        });

    } catch (error) {
        console.error('Search Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error! Could not search products.',
            error: error.message
        });
    }
};

// Export all functions so routes can use them
module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts
};
