const mongoose = require("../../database");

const { TIMEFRAME } = require("../../constants/trades");

// Create Candle Schema

const candleSchema = new mongoose.Schema({
    pair: { type: String, required: true },
    open: { type: Number, required: true },
    close: { type: Number, required: true },
    timeframe: { type: String, required: true, enum: TIMEFRAME },
    createdAt: { type: Date, default: Date.now }
});

// Create Candle Model From Candle Schema

const candleModel = mongoose.model("candle", candleSchema);

module.exports = candleModel;