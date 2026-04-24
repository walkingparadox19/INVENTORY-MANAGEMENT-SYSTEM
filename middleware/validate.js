// =============================================
// middleware/validate.js - Validation Middleware
// =============================================
// This checks if the data sent by user is correct before saving to database
// Like a form check - makes sure required fields are filled

// Validate product data
const validateProduct = (req, res, next) => {
    const { name, category, quantity, price } = req.body;

    // Check if required fields are present
    if (!name || !category || quantity === undefined || price === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Validation Error! Required fields: name, category, quantity, price'
        });
    }

    // Check if name is a non-empty string
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Validation Error! Product name must be a non-empty string.'
        });
    }

    // Check if quantity is a positive number
    if (isNaN(quantity) || Number(quantity) < 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation Error! Quantity must be a positive number.'
        });
    }

    // Check if price is a positive number
    if (isNaN(price) || Number(price) <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation Error! Price must be a positive number.'
        });
    }

    // All checks passed, move to next step
    next();
};

// Validate login data
const validateLogin = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Validation Error! Username and password are required.'
        });
    }

    if (username.trim() === '' || password.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Validation Error! Username and password cannot be empty.'
        });
    }

    next();
};

module.exports = { validateProduct, validateLogin };
