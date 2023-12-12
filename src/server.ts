import { app } from "./app";
import dbConnectionMethods from "./db/connection/connection";
import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
    dotenv.config({ path: '.env' });
}

const connectionString = process.env.MONGO_URI

if (connectionString != null) {
    dbConnectionMethods.init(connectionString);
    app.listen(app.get('port'), () => {
        console.log(`Listening on port ${app.get('port')}...`);
    });
} else {
    console.log('MONGO_URL not specified in environment')
    process.exit(1);
}

process.on("SIGINT", () => {
    dbConnectionMethods.closeConnection();
    console.log('Error shutting closing mongo connection')
    process.exit(0);
});


