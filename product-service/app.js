const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const { sequelize } = require('./models/productModel');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Products Service is running!');
});
app.use('/products', productRoutes);

module.exports = { app, sequelize };
