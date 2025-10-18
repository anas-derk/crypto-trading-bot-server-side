const SIDE = ["buy", "sell"];

const PAIR = ["BTC/USDT", "ETH/USDT"];

const TIMEFRAME = ["1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w", "1M"];

const STATUS = ["pending", "executed", "failed"];

const DEFAULT_STATUS = STATUS[0];

module.exports = {
    SIDE,
    PAIR,
    TIMEFRAME,
    STATUS,
    DEFAULT_STATUS
}