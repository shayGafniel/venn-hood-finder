import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app"
import * as getNeighborhoodsFunctions from "../db/controllers/neighborhoodsController";

import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
    dotenv.config({ path: '.env' });
}

const connectionString = process.env.MONGO_URI


beforeEach(async () => {
    if (connectionString != null) {
        await mongoose.connect(connectionString);
    }
});

afterEach(async () => {
    await mongoose.connection.close();
});


describe('GET / neighborhood', () => {
    it('should return status 200 with neighborhoods when valid query parameters are provided', async () => {
        const response = await request(app)
            .get('/api/v1.0/neighborhood')
            .query({
                ageRange: ['gte:10', 'lte:50'],
                maxDistance: '100',
                sortBy: 'averageIncome,desc'
            });

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(2)
    });
    it('should return status 200 with all neighborhoods when no query parameters are provided', async () => {
        const response = await request(app)
            .get('/api/v1.0/neighborhood')

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1000)
    });


    it('should return status 500 if an error occurs during data fetching', async () => {
        jest.spyOn(getNeighborhoodsFunctions, 'getNeighborhoodsByParams').mockImplementation(() => {
            throw new Error('Test error');
        });

        const response = await request(app).get('/api/v1.0/neighborhood');
        expect(response.status).toBe(500);
    });
});