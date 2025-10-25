const SIDE = ["buy", "sell"];

const PAIR = ["ETH/USDT"];

const TIMEFRAME = ["1m"];

const STATUS = ["pending", "open", "closed", "failed"];

const DEFAULT_STATUS = STATUS[0];

const BINANCE_TRADE_STREAMS = PAIR.flatMap(pair =>
    TIMEFRAME.map(timeframe => ({ pair: pair.replace("/", "").toLowerCase(), timeframe }))
);

module.exports = {
    SIDE,
    PAIR,
    TIMEFRAME,
    STATUS,
    DEFAULT_STATUS,
    BINANCE_TRADE_STREAMS
}