// =============================================
// middleware/auth.js - Authentication Middleware
// =============================================
// This checks if the user is logged in before allowing access to APIs
// It works like a security guard - checks your token before letting you in

const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    // Get the token from request headers
    // In Postman: Add header -> Key: "Authorization", Value: "Bearer YOUR_TOKEN"
    const authHeader = req.headers['authorization'];

    // Check if token was provided
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'Access Denied! No token provided. Please login first.'
        });
    }

    // Token format is: "Bearer <token>" - we extract just the token part
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access Denied! Invalid token format.'
        });
    }

    try {
        // Verify the token using our secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Store user info in request so controllers can use it
        req.user = decoded;
        
        // Call next() to move to the actual route handler
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or Expired Token! Please login again.'
        });
    }
};

module.exports = verifyToken;
