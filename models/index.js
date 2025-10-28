const adminModel = require("./admin");
const candleModel = require("./candle");
const globalPasswordModel = require("./global_password");
const scheduledTradeModel = require("./scheduled_trade");
const strategyModel = require("./strategy");
const tradeModel = require("./trade");
const verificationCodeModel = require("./verification_code");

module.exports = {
    adminModel,
    candleModel,
    globalPasswordModel,
    scheduledTradeModel,
    strategyModel,
    tradeModel,
    verificationCodeModel,
}