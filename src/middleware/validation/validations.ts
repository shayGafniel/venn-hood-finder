import { NextFunction } from "express";
import { neighborhoodsQuerySchema } from "./get-neighborhood-schema";
import { Request, Response } from 'express'

// neighborhoods get request validation function to add inside the express chain.
export const validateGetNeighborhoodsQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { error } = neighborhoodsQuerySchema.validate(req.query);
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }

    next();
};