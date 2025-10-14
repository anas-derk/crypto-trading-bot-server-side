const mongoose = require("../../database");

const tradeConstants = require("../../constants/trades");

// Create Trade Schema

const tradeSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    side: { type: String, enum: tradeConstants.SIDE, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: tradeConstants.STATUS, default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

// Create Trade Model From Trade Schema

const tradeModel = mongoose.model("trade", tradeSchema);

module.exports = tradeModel;