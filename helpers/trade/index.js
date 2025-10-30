const ccxt = require("ccxt");

const { getCandleTypes, checkCandlesSequence, getSuitableSide } = require("../../utils/trade");

const { saveCandleData, getAllCandles, deleteManyCandle } = require("../../repositories/candles");

const { getAllTrades, openTrade } = require("../../repositories/trades");

const { createScheduledOrder } = require("../../repositories/scheduled_trades");

async function runBot(timeframe, pair) {
    try {
        const exchange = new ccxt.binance({
            apiKey: process.env.NODE_ENV === "development" ? process.env.BINANCE_TEST_API_KEY : process.env.BINANCE_API_KEY,
            secret: process.env.NODE_ENV === "development" ? process.env.BINANCE_TEST_API_SECRET : process.env.BINANCE_API_SECRET,
            enableRateLimit: true,
        });
        if (process.env.NODE_ENV === "development") {
            exchange.setSandboxMode(true);
        }
        const balance = await exchange.fetchBalance();
        console.log("Free : ===========================================");
        console.log(`USDT: ${balance["free"]["USDT"]}, ETH: ${balance["free"]["ETH"]}`);
        console.log("===========================================");
        console.log("Used : ===========================================");
        console.log(`USDT: ${balance["used"]["USDT"]}, ETH: ${balance["used"]["ETH"]}`);
        let candles = [];
        try {
            candles = (await getAllCandles({ timeframe, pair }, "en")).data.candles;
        }
        catch (err) {
            console.log("error in get candles by filters: ", err.message, "=========================================================");
            return;
        }
        if (candles.length < 2) return;
        const candleTypes = getCandleTypes(candles);
        const result = checkCandlesSequence(candleTypes);
        if (!result.status) {
            try {
                await deleteManyCandle({ timeframe, pair }, "en");
            }
            catch (err) {
                console.log("error in delete many candles by filters: ", err.message, "=========================================================");
            }
            finally {
                return;
            }
        }
        if (result.count < 7) return;
        try {
            await executeTradeOrders(timeframe, pair, result.type);
        }
        catch (err) {
            console.log("error in execute trade order: ", err.message, "=========================================================");
        }
    }
    catch (err) {
        throw err;
    }
}

async function handleCandleData(data) {
    try {
        const candle = data?.k;
        if (!candle?.x) return;
        const candleData = {
            pair: candle.s === "ETHUSDT" ? "ETH/USDT" : "BTC/USDT",
            open: parseFloat(candle.o),
            close: parseFloat(candle.c),
            timeframe: candle.i,
        };
        try {
            await saveCandleData(candleData);
            console.log("save new candle data: ", candleData);
        }
        catch (err) {
            console.log("error in save candle data: ", err.message, "=========================================================");
            return;
        }
        try {
            await runBot(candleData.timeframe, candleData.pair);
        }
        catch (err) {
            console.log("error in run bot: ", err.message, "=========================================================");
            return;
        }
    }
    catch (err) {
        console.log("error in handle candle data: ", err.message, "=========================================================");
    }
}

async function executeTradeOrders(timeframe, pair, type) {
    try {
        try {
            await deleteManyCandle({ timeframe, pair }, "en");
        }
        catch (err) {
            console.log("error in delete many candles by filters: ", err.message, "=========================================================");
        }
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
            trades = (await getAllTrades({ timeframe, pair, status: "pending" }, "en")).data.trades;
        }
        catch (err) {
            console.log("error in get trades by filters: ", err.message, "=========================================================");
            return;
        }
        for (let trade of trades) {
            const side = getSuitableSide(type);
            let createTradeOrderResult = null;
            try {
                createTradeOrderResult = await exchange.createOrder(trade.pair, "market", side, trade.amount);
            }
            catch (err) {
                console.log(`error in open trade order in binance by id: ${trade._id}`, err.message, "=========================================================");
                return;
            }
            try {
                await openTrade(trade._id, side, createTradeOrderResult.average, "en");
            }
            catch (err) {
                console.log(`error in open trade by id: ${trade._id}`, err.message, "=========================================================");
                return;
            }
            try {
                await createScheduledOrder(trade._id, "en");
            }
            catch (err) {
                console.log(`error in create scheduled trade by id: ${trade._id}`, err.message, "=========================================================");
            }
        }
    }
    catch (err) {
        console.log("error on execute trade order: ", err.message, "=========================================================");
    }
}

module.exports = {
    runBot,
    handleCandleData
}