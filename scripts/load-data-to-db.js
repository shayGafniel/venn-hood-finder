const mongoose = require('mongoose');

const neighborhoodsData = require('../home-task (1) (1) (1) (2)/neighborhoods_data.json')
const neighborhoodsSchema = require('../src/db/models/neighborhood')
const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
    dotenv.config({ path: '.env' });
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

neighborhoodsSchema.insertMany(neighborhoodsData)
    .then(() => {
        console.log('Data imported successfully!');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error importing data:', err);
        mongoose.connection.close();
    });
