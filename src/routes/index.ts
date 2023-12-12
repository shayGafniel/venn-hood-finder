import { neighborhoodsRouter } from './neighborhood/neighborhoods'
import { Express, Request, Response, NextFunction, } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../../swaggerConfig';

export default (app: Express) => {
    const BASE_ROUTE = "/api/v1.0";

    //generating a base api in order to maintain versioning and one conversion.
    function generateRoutePrefix(route: string) {
        return [BASE_ROUTE, route].join("");
    }

    // adding more routers for more different endpoints
    app.use(generateRoutePrefix('/neighborhood'), neighborhoodsRouter);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // default route
    app.get("*", function (req, res, next) {
        res.status(404).send("Endpoint not found");
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (res.headersSent) {
            return next(err);
        }
        console.log(`Got an error in express chain:\n${err.message}\nerror Object: ${err}`)
        return res.status(500).send("Something went wrong");
    });
}