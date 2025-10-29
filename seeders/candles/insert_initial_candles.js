const mongoose = require("mongoose");

const { resolve } = require("path");

require("dotenv").config({
    path: resolve(__dirname, "../../.env"),
});

const { TIMEFRAME } = require("../../constants/trades");

/// Create Candle Schema

const candleSchema = new mongoose.Schema({
    pair: { type: String, required: true },
    open: { type: Number, required: true },
    close: { type: Number, required: true },
    timeframe: { type: String, required: true, enum: TIMEFRAME },
    createdAt: { type: Date, default: Date.now }
});

// Create Candle Model From Candle Schema

const candleModel = mongoose.model("candle", candleSchema);

const candles = [
    {
        pair: 'ETH/USDT',
        open: 3956.37,
        close: 3956.57,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:17:00.252Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3956.58,
        close: 3955.34,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:18:00.212Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3958.34,
        close: 3957.93,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:19:00.252Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3957.93,
        close: 3956.24,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:20:00.202Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3956.23,
        close: 3955.72,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:21:00.260Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3955.73,
        close: 3954.69,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:22:00.244Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3954.69,
        close: 3954.7,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:23:00.234Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3954.69,
        close: 3953.7,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:24:00.841Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3954.69,
        close: 3953.67,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:25:00.244Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3953.67,
        close: 3953.61,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:26:00.272Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3953.6,
        close: 3953.25,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:27:00.265Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3953.25,
        close: 3951.46,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:28:00.290Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3951.47,
        close: 3952.01,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:29:00.228Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3952,
        close: 3951.1,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:30:00.269Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3953.1,
        close: 3951.41,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:31:00.245Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3951.26,
        close: 3949.32,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:37:00.228Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3949.32,
        close: 3945.74,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:38:00.244Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3945.73,
        close: 3949.17,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:39:00.372Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3949.17,
        close: 3948.48,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:40:00.247Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3950.48,
        close: 3951.11,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:41:00.253Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3951.12,
        close: 3950.74,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:42:00.294Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3956.73,
        close: 3955.96,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:43:00.233Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3955.95,
        close: 3954,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:44:00.241Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3953.99,
        close: 3953.01,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:45:00.278Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3953.01,
        close: 3954.13,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T20:46:00.281Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3947.97,
        close: 3947.59,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T21:33:59.923Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3947.6,
        close: 3947.57,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T21:34:59.923Z"),
    },
    {
        pair: 'ETH/USDT',
        open: 3947.56,
        close: 3950.48,
        timeframe: '1m',
        createdAt: new Date("2025-10-25T21:36:01.535Z"),
    }
]

async function create_initial_candles() {
    try {
        await mongoose.connect(process.env.DB_URL);
        await candleModel.insertMany(candles);
        await mongoose.disconnect();
        return "Ok !!, Create Initial Candles Process Has Been Successfuly !!";
    } catch (err) {
        await mongoose.disconnect();
        throw Error(err);
    }
}

create_initial_candles()
    .then((result) => { console.log(result); process.exit(1); })
    .catch((err) => console.log(err.message));