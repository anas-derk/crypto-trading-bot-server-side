const SIDE = ["buy", "sell"];

const PAIR = ["BTC/USDT", "ETH/USDT"];

const TIMEFRAME = ["1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w", "1M"];

const TIMEFRAME_AS_MAP = Object.fromEntries(TIMEFRAME.map((timeframe) => {
    switch (timeframe) {
        case "1m":
            return [timeframe, 60 * 1000];
        case "5m":
            return [timeframe, 5 * 60 * 1000];
        case "15m":
            return [timeframe, 15 * 60 * 1000];
        case "30m":
            return [timeframe, 30 * 60 * 1000];
        case "1h":
            return [timeframe, 60 * 60 * 1000];
        case "4h":
            return [timeframe, 4 * 60 * 60 * 1000];
        case "1d":
            return [timeframe, 24 * 60 * 60 * 1000];
        case "1w":
            return [timeframe, 7 * 24 * 60 * 60 * 1000];
        case "1M":
            return [timeframe, 30 * 24 * 60 * 60 * 1000];
        default:
            break;
    }
}));

const STATUS = ["pending", "open", "closed", "failed"];

const DEFAULT_STATUS = STATUS[0];

const BINANCE_TRADE_STREAMS = PAIR.flatMap(pair =>
    TIMEFRAME.map(timeframe => ({ pair: pair.replace("/", "").toLowerCase(), timeframe }))
);

const SCHEDULED_TRADE_ACTION = ["close-trade"];

const DEFAULT_SCHEDULED_TRADE_ACTION = SCHEDULED_TRADE_ACTION[0];

const SCHEDULED_TRADE_STATUS = ["pending", "done", "failed"];

const DEFAULT_SCHEDULED_TRADE_STATUS = SCHEDULED_TRADE_STATUS[0];

module.exports = {
    SIDE,
    PAIR,
    TIMEFRAME,
    TIMEFRAME_AS_MAP,
    STATUS,
    DEFAULT_STATUS,
    BINANCE_TRADE_STREAMS,
    SCHEDULED_TRADE_ACTION,
    DEFAULT_SCHEDULED_TRADE_ACTION,
    SCHEDULED_TRADE_STATUS,
    DEFAULT_SCHEDULED_TRADE_STATUS
}