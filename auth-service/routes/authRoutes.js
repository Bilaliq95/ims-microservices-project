const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for handling user registration
router.post('/register', authController.registerUser);

// Route for handling user login
router.post('/login', authController.loginUser);



module.exports = router;
