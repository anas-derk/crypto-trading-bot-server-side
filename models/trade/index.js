const mongoose = require("../../database");

const tradeConstants = require("../../constants/trades");

// Create Trade Schema

const tradeSchema = new mongoose.Schema({
    pair: { type: String, required: true, enum: tradeConstants.PAIR },
    side: { type: String, enum: tradeConstants.SIDE, default: null },
    amount: { type: Number, required: true },
    price: { type: Number, default: null },
    status: { type: String, enum: tradeConstants.STATUS, default: tradeConstants.DEFAULT_STATUS },
    createdAt: { type: Date, default: Date.now }
});

// Create Trade Model From Trade Schema

const tradeModel = mongoose.model("trade", tradeSchema);

module.exports = tradeModel;