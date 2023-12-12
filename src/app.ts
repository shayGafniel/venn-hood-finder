import express, { Express } from 'express';
import routes from './routes/index'

// creates the express app and pass it to the main router and server in order to use them in the app. dividing is decuple these things.
export const app: Express = express();

app.use(express.json())
app.set('port', process.env.PORT || 3000);
routes(app)

