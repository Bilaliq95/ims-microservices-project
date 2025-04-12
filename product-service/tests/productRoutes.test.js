// tests/productRoutes.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Product } = require('../models/productModel');
const productRoutes = require('../routes/productRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/products', productRoutes);

// Sync DB before all tests
beforeAll(async () => {
    await sequelize.sync({ force: true });
});

// Insert sample data before each test
beforeEach(async () => {
    await Product.bulkCreate([
        {
            product_name: 'Rose Bouquet',
            product_price: 25.99,
            product_category: 'flowers',
            product_details: 'Fresh red roses',
            image_url: 'https://example.com/rose.jpg',
        },
        {
            product_name: 'Lily Vase',
            product_price: 30.00,
            product_category: 'flowers',
            product_details: 'White lilies in a vase',
            image_url: 'https://example.com/lily.jpg',
        },
        {
            product_name: 'Teddy Bear',
            product_price: 15.50,
            product_category: 'gifts',
            product_details: 'Soft and cuddly bear',
            image_url: 'https://example.com/bear.jpg',
        },
    ]);
});

// Clear products after each test
afterEach(async () => {
    await Product.destroy({ where: {} });
});

// Close connection after all tests
afterAll(async () => {
    await sequelize.close();
});

// ✅ Test: Fetch by category
describe('GET /products/category/:categoryName', () => {
    it('should return products for a valid category', async () => {
        const res = await request(app).get('/products/category/flowers');

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].product_category).toBe('flowers');
    });

    it('should return empty array for a category with no products', async () => {
        const res = await request(app).get('/products/category/chocolates');

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('should handle errors and return 500', async () => {
        // Temporarily override findAll to throw error
        const originalFindAll = Product.findAll;
        Product.findAll = jest.fn().mockRejectedValue(new Error('DB failure'));

        const res = await request(app).get('/products/category/flowers');

        expect(res.status).toBe(500);
        expect(res.text).toBe('Something went wrong.');

        Product.findAll = originalFindAll;
    });
});
