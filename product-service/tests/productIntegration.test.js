const request = require('supertest');
const { app, sequelize } = require('../app');
const { Product } = require('../models/productModel');

describe('GET /category/:categoryName', () => {
    const testCategory = 'flowers';

    beforeAll(async () => {
        await Product.sync({ force: true });
        await Product.create({
            product_name: 'Test Phone',
            product_description: 'Sample product',
            product_price: 199.99,
            product_stock: 20,
            product_category: testCategory,
            product_details: 'Test details here',
            created_at: new Date(),
            image_url: 'https://example.com/test.jpg',
        });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should return products of the given category', async () => {
        const response = await request(app).get(`/products/category/${testCategory}`);


        console.log(response.body);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].product_category).toBe(testCategory);
    });
    it('should return an empty array for unknown category', async () => {
        const response = await request(app).get('/products/category/unknown123');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
});
