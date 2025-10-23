const ccxt = require("ccxt");

const { getCandleTypes, checkCandlesSequence } = require("../../utils/trade");

const { saveCandleData } = require("../../repositories/candles");

async function loop(exchange, order) {
    try {
        const candles = await exchange.fetchOHLCV(order.pair, order.timeframe, undefined, 10);
        console.log("read candle");
        const candleTypes = getCandleTypes(candles);
        const isValidSequence = checkCandlesSequence(candleTypes);
        if (isValidSequence) {
            console.log("aa");
            return;
        };
        setTimeout(() => loop(exchange, order), 10000);
    }
    catch (err) {
        throw err;
    }
}

async function runBot(order) {
    const exchange = new ccxt.binance({
        apiKey: process.env.API_KEY,
        secret: process.env.API_SECRET,
        enableRateLimit: true
    });
    loop(exchange, order);
}

async function handleCandleData(data) {
    const candle = data?.k;
    if (!candle?.x) return;
    const candleData = {
        pair: candle.s === "ETHUSDT" ? "ETH/USDT" : "BTC/USDT",
        open: parseFloat(candle.o),
        close: parseFloat(candle.c),
        timeframe: candle.i,
    };
    await saveCandleData(candleData);
}

module.exports = {
    runBot,
    handleCandleData
}