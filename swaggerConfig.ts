import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'Documentation for your API',
        },
    },
    apis: ['src/routes/neighborhood/neighborhoods.ts'], // Replace with the path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
