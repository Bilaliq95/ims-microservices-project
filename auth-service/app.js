// auth-service/app.js

const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const { sequelize } = require('./models/userModel');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Auth Service is running!');
});
app.use('/auth', authRoutes);

module.exports = { app, sequelize };
