const mongoose = require("../../database");

// Create Strategy Schema

const strategySchema = new mongoose.Schema({
    name: { type: String, required: true },
    active: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

// Create Strategy Model From Strategy Schema

const strategyModel = mongoose.model("strategy", strategySchema);

module.exports = strategyModel;