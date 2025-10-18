const ccxt = require("ccxt");

async function runBot(order) {
    const exchange = new ccxt.binance({
        apiKey: process.env.API_KEY,
        secret: process.env.API_SECRET,
        enableRateLimit: true
    });
    const ohlcv = await exchange.fetchOHLCV(order.pair, "1h", undefined, 10);
    console.log(ohlcv);
    return {
        ohlcv
    }
}

module.exports = {
    runBot
}