const ccxt = require("ccxt");

const { getCandleTypes, checkCandlesSequence } = require("../../utils/trade");

const { saveCandleData, getAllCandles, deleteManyCandle } = require("../../repositories/candles");

async function runBot(timeframe, pair) {
    try {
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
        console.log(candleTypes);
        const result = checkCandlesSequence(candleTypes);
        console.log(result);
        if (!result.status) {
            try {
                // await deleteManyCandle({ timeframe, pair }, "en");
            }
            catch (err) {
                console.log("error in delete many candles by filters: ", err.message, "=========================================================");
            }
            finally {
                return;
            }
        }
        if (result.count < 7) return;
        console.log("aa");
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

module.exports = {
    runBot,
    handleCandleData
}