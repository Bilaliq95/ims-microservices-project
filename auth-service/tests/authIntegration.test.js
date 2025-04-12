const request = require('supertest');
const { app } = require('../app'); // now works perfectly without .listen()

describe('POST /auth/register', () => {
    it('should register a user and save to DB', async () => {
        const response = await request(app).post('/auth/register').send({
            firstname: 'John',
            lastname: 'Doe',
            email: `john${Date.now()}@example.com`,  // Unique email
            password: 'password123',
            phoneNumber: '1234567890'
        });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
    });
});


