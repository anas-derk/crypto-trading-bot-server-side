const mongoose = require("../../database");

const tradeConstants = require("../../constants/trades");

// Create Scheduled Trade Schema

const scheduledTradeSchema = new mongoose.Schema({
    trade: { type: mongoose.Schema.Types.ObjectId, ref: 'trade', required: true },
    action: { type: String, enum: tradeConstants.SCHEDULED_TRADE_ACTION, default: tradeConstants.DEFAULT_SCHEDULED_TRADE_ACTION },
    executeAt: { type: Date, required: true },
    executedAt: { type: Date, default: null },
    status: { type: String, enum: tradeConstants.SCHEDULED_TRADE_STATUS, default: tradeConstants.DEFAULT_SCHEDULED_TRADE_STATUS },
});

// Create Scheduled Trade Model From Scheduled Trade Schema

const scheduledTradeModel = mongoose.model("scheduled_trade", scheduledTradeSchema);

module.exports = scheduledTradeModel;