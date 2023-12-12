import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app"
import * as getNeighborhoodsFunctions from "../db/controllers/neighborhoodsController";

beforeEach(async () => {
    await mongoose.connect("mongodb://localhost:27017");
});

afterEach(async () => {
    await mongoose.connection.close();
});


describe('GET / neighborhood', () => {
    it('should return status 200 with neighborhoods when valid query parameters are provided', async () => {
        const response = await request(app)
            .get('/neighborhood')
            .query({
                ageRange: ['gte:30', 'lte:30'],
                maxDistance: '10',
                sortBy: 'averageIncome,desc'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2)
    });
    it('should return status 200 with all neighborhoods when no query parameters are provided', async () => {
        const response = await request(app)
            .get('/neighborhood')

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1000)
    });


    it('should return status 500 if an error occurs during data fetching', async () => {
        jest.spyOn(getNeighborhoodsFunctions, 'getNeighborhoodsByParams').mockImplementation(() => {
            throw new Error('Test error');
        });

        const response = await request(app).get('/neighborhood');
        expect(response.status).toBe(500);
    });
});