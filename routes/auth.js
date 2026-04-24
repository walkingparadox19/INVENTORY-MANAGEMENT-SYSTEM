// =============================================
// routes/auth.js - Authentication Routes
// =============================================
// Defines the URL paths for login and register

const express = require('express');
const router = express.Router();

// Import controller functions
const { login, register } = require('../controllers/authController');

// Import validation middleware
const { validateLogin } = require('../middleware/validate');

// POST /api/auth/login  --> validateLogin checks input, then login handles it
router.post('/login', validateLogin, login);

// POST /api/auth/register --> validateLogin checks input, then register handles it
router.post('/register', validateLogin, register);

module.exports = router;
