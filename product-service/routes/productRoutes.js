// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { Product } = require('../models/productModel');
// Route to fetch products by category
router.get('/category/:categoryName', async (req, res) => {
    const { categoryName } = req.params;
    console.log(categoryName);
    try {
        const products = await Product.findAll({ where: { product_category: categoryName } });
        res.json(products);
    } catch (err) {
        console.error('Error fetching category:', err);
        res.status(500).send('Something went wrong.');
    }
});

module.exports = router;