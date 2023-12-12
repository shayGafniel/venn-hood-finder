import mongoose, { ConnectOptions } from 'mongoose'
import neighborhoodsData from '../home-task/neighborhoods_data.json'
import neighborhoodsSchema from '../src/db/models/neighborhood'
import dotenv from 'dotenv'

const result = dotenv.config();
if (result.error) {
    dotenv.config({ path: '.env' });
}

if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true } as ConnectOptions);
}

neighborhoodsSchema.insertMany(neighborhoodsData)
    .then(() => {
        console.log('Data imported successfully!');
        mongoose.connection.close();
    })
    .catch((err: Error) => {
        console.error('Error importing data:', err);
        mongoose.connection.close();
    });
