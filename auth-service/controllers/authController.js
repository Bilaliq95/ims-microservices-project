const bcrypt = require("bcryptjs");
const {response} = require("express");
const {User} = require("../models/userModel"); // For making HTTP requests to other services
const jwt = require('jsonwebtoken'); // At the top of your file
const saltRounds = 10;

// Store URLs in variables for auth service


exports.registerUser = async (req, res) => {
    const { firstname, lastname, email, password, phoneNumber } = req.body;
    console.log( firstname, lastname, email, password, phoneNumber );

    const role = req.baseUrl.includes('admin') ? 'admin' : 'customer';
    console.log( role );

    // Validation: Check if required fields are provided
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).send('First name, last name, email, and password are required');
    }

    try {
        // Hash the password asynchronously
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Call the Auth Service to create a new user
        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password_hash,
            phone_number:phoneNumber,
            role,
        });

        if (newUser) {
            return res.status(201).json({ success: true, message: 'User registered successfully' });
        } else {
            return res.status(500).json({ success: false, message: 'User registration failed' });
        }

    } catch (err) {
        console.error("Error registering user:", err);
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).send('Email already exists');
        }
        res.status(500).send('Error registering user');
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    // Validation: Check if email and password are provided
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Compare the password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);


        if (isPasswordValid) {
            // Save user ID in session
            //req.session.userId = user.user_id;

            const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ success: true, token });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    } catch (err) {
        console.error("Error logging in user:", err);
        return res.status(500).send('Error logging in user');
    }
};