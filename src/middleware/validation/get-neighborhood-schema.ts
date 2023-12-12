import Joi from 'joi';

// neighborhoods get request validation schema.
export const neighborhoodsQuerySchema = Joi.object({
    ageRange: Joi.array().items(Joi.string().pattern(/^gte:\d+$/), Joi.string().pattern(/^lte:\d+$/)).optional(),
    maxDistance: Joi.number().positive().optional(),
    sortBy: Joi.string().pattern(/^[a-zA-Z]+,(asc|desc)$/).optional(),
});
