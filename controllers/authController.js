// =============================================
// controllers/authController.js - Login Logic
// =============================================
// This handles user login and returns a JWT token

const bcrypt = require('bcryptjs'); // For password comparison
const jwt = require('jsonwebtoken'); // For creating tokens
const db = require('../config/db');  // Database connection
require('dotenv').config();

// LOGIN - POST /api/auth/login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Step 1: Find user in database by username
        const [users] = await db.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        // Step 2: Check if user exists
        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password!'
            });
        }

        const user = users[0];

        // Step 3: Compare entered password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password!'
            });
        }

        // Step 4: Create a JWT token (this is what user will use for other APIs)
        const token = jwt.sign(
            { id: user.id, username: user.username }, // Data stored in token
            process.env.JWT_SECRET,                    // Secret key
            { expiresIn: '24h' }                       // Token valid for 24 hours
        );

        // Step 5: Send token back to user
        res.status(200).json({
            success: true,
            message: 'Login Successful!',
            token: token,  // Copy this token and use in Postman for other requests
            user: {
                id: user.id,
                username: user.username
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error! Something went wrong.',
            error: error.message
        });
    }
};

// REGISTER - POST /api/auth/register (Optional - add new users)
const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username already exists
        const [existing] = await db.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Username already exists!'
            });
        }

        // Hash the password before saving (for security)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user to database
        await db.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully!'
        });

    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error!',
            error: error.message
        });
    }
};

module.exports = { login, register };
