const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    cars_id: {
        type: Number,
        required: true
    },
    car_name: String,
    brand: String,
    releasedDate: String,
    price: Number,
    available_count: Number,
    summary: String,
    description: String,
    features: {
        BodyStyle: String,
        CarType: String,
        CarColors: String,
        Fuel: String,
        Gear: String,
        TotalSeats: Number,
        EngineCapacity: String,
        Engine: String
    }
});

const CarModel = mongoose.model("cars", carSchema);
module.exports = CarModel;
