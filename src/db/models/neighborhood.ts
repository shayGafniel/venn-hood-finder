import { Schema, model } from 'mongoose';

const neighborhoodSchema = new Schema({
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    averageAge: { type: Number, required: true },
    distanceFromCityCenter: { type: Number, required: true },
    averageIncome: { type: Number, required: true },
    publicTransportAvailability: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
}, { collection: "neighborhoods" });


neighborhoodSchema.index({ averageAge: 1, "distanceFromCityCenter": 1 });

export default model('Neighborhood', neighborhoodSchema);
