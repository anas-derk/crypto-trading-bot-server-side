const ccxt = require("ccxt");

const { closeTrade } = require("../../repositories/trades");

const { getAllScheduledTrades, executeScheduledTradeOrder } = require("../../repositories/scheduled_trades");

async function executeScheduledTradeOrders() {
    try {
        const exchange = new ccxt.binance({
            apiKey: process.env.NODE_ENV === "development" ? process.env.BINANCE_TEST_API_KEY : process.env.BINANCE_API_KEY,
            secret: process.env.NODE_ENV === "development" ? process.env.BINANCE_TEST_API_SECRET : process.env.BINANCE_API_SECRET,
            enableRateLimit: true,
        });
        if (process.env.NODE_ENV === "development") {
            exchange.setSandboxMode(true);
        }
        let trades = [];
        try {
            trades = (await getAllScheduledTrades({ status: "pending" }, "en")).data.trades;
        }
        catch (err) {
            console.log("error in get scheduled trades by filters: ", err.message, "=========================================================");
            return;
        }
        for (let trade of trades) {
            if (Math.abs(Date.now() - new Date(trade.executeAt).getTime()) < 1000) {
                let createTradeOrderResult = null;
                try {
                    createTradeOrderResult = await exchange.createOrder(trade.trade.pair, "market", trade.trade.startSide === "buy" ? "sell" : "buy", trade.trade.amount);
                }
                catch (err) {
                    console.log(`error in close trade order in binance by id: ${trade._id}`, err.message, "=========================================================");
                    return;
                }
                try {
                    await closeTrade(trade.trade._id, createTradeOrderResult.average, "en");
                }
                catch (err) {
                    console.log(`error in close trade by id: ${trade._id}`, err.message, "=========================================================");
                    return;
                }
                try {
                    await executeScheduledTradeOrder(trade._id, "en");
                }
                catch (err) {
                    console.log(`error in create scheduled trade by id: ${trade._id}`, err.message, "=========================================================");
                }
            }
        }
    }
    catch (err) {
        console.log("error on execute scheduled trade order: ", err.message);
    }
}

module.exports = {
    executeScheduledTradeOrders
}