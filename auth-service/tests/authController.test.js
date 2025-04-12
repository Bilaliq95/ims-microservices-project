const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, User } = require('../models/userModel');
const authRoutes = require('../routes/authRoutes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/auth', authRoutes);

// Sync DB before all tests
beforeAll(async () => {
    await sequelize.sync({ force: true });
});

// Clear users after each test
afterEach(async () => {
    await User.destroy({ where: {} });
});

// Close DB connection after all tests
afterAll(async () => {
    await sequelize.close();
});

describe('POST /auth/register', () => {
    it('should register a new user', async () => {
        const response = await request(app).post('/auth/register').send({
            firstname: 'John',
            lastname: 'Doe',
            email: 'john@example.com',
            password: 'password123',
            phoneNumber: '1234567890'
        });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should not register user with missing fields', async () => {
        const response = await request(app).post('/auth/register').send({
            firstname: 'Jane'
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('First name, last name, email, and password are required');
    });
});

describe('POST /auth/login', () => {
    beforeEach(async () => {
        await request(app).post('/auth/register').send({
            firstname: 'Test',
            lastname: 'User',
            email: 'test@example.com',
            password: 'test123',
            phoneNumber: '9876543210'
        });
    });

    it('should login successfully with correct credentials', async () => {
        const res = await request(app).post('/auth/login').send({
            email: 'test@example.com',
            password: 'test123'
        });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.token).toBeDefined();
    });

    it('should fail login with incorrect password', async () => {
        const res = await request(app).post('/auth/login').send({
            email: 'test@example.com',
            password: 'wrongpass'
        });

        expect(res.status).toBe(401);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Invalid credentials');
    });

    it('should fail login with unregistered email', async () => {
        const res = await request(app).post('/auth/login').send({
            email: 'nonexistent@example.com',
            password: 'test123'
        });

        expect(res.status).toBe(401);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Invalid credentials');
    });
});
