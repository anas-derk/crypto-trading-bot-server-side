// Import Scheduled Trade Model Object

const { scheduledTradeModel } = require("../../models");

const { getSuitableTranslations } = require("../../helpers/translation");

const { getTradeInfo } = require("../../repositories/trades");

const { timeframeToMs, getCloseBeforeMs } = require("../../utils/trade");

async function createScheduledOrder(tradeId, language) {
    try {
        const result = await getTradeInfo(tradeId, "en");
        if (result.error) return result;
        if (result.data.status !== "open") {
            return {
                msg: getSuitableTranslations("Sorry, Can't Create Scheduled Trade Order Because The Base Order Is Not Open !!", "en"),
                error: true,
                data: {}
            }
        }
        const candleDuration = timeframeToMs(result.data.timeframe);
        const closeBefore = getCloseBeforeMs(result.data.timeframe);
        const executeAt = new Date(Date.now() + candleDuration - closeBefore);
        const newInstance = new scheduledTradeModel({ trade: result.data._id, executeAt });
        const newOrder = await newInstance.save();
        return {
            msg: getSuitableTranslations("Create New Scheduled Trade Order Process Has Been Successfully !!", language),
            error: false,
            data: newOrder,
        }
    } catch (err) {
        throw Error(err);
    }
}

async function getScheduledTradeInfo(tradeId, language) {
    try {
        const trade = await scheduledTradeModel.findById(tradeId);
        if (trade) {
            return {
                msg: getSuitableTranslations("Get Scheduled Trade Info Process Has Been Successfully !!", language),
                error: false,
                data: trade,
            }
        }
        return {
            msg: getSuitableTranslations("Sorry, This Scheduled Trade Is Not Exist !!", language),
            error: true,
            data: {},
        }
    } catch (err) {
        throw Error(err);
    }
}

async function getAllScheduledTrades(filters, language) {
    try {
        return {
            msg: getSuitableTranslations("Get All Scheduled Trades Process Has Been Successfully !!", language),
            error: false,
            data: {
                trades: await scheduledTradeModel.find(filters).populate("trade"),
                tradesCount: await scheduledTradeModel.countDocuments(filters),
            },
        }
    } catch (err) {
        throw Error(err);
    }
}

async function executeScheduledTradeOrder(tradeId, language) {
    try {
        const result = await getScheduledTradeInfo(tradeId, "en");
        if (result.error) return result;
        if (result.data.status !== "pending") {
            return {
                msg: getSuitableTranslations("Sorry, Can't Execute Scheduled Trade Order Because The Base Order Is Not Pending !!", "en"),
                error: true,
                data: {}
            }
        }
        result.data.executedAt = Date.now();
        result.data.status = "done";
        await result.data.save();
        return {
            msg: getSuitableTranslations("Execute Scheduled Trade Order Process Has Been Successfully !!", language),
            error: false,
            data: result.data,
        }
    } catch (err) {
        throw Error(err);
    }
}

module.exports = {
    createScheduledOrder,
    getScheduledTradeInfo,
    getAllScheduledTrades,
    executeScheduledTradeOrder
}