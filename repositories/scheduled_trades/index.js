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
        const newInstance = new scheduledTradeModel({ tradeId: result.data._id, executeAt });
        const newOrder = await newInstance.save();
        return {
            msg: getSuitableTranslations("Create New Trade Order Process Has Been Successfully !!", language),
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
                msg: getSuitableTranslations("Get Trade Info Process Has Been Successfully !!", language),
                error: false,
                data: trade,
            }
        }
        return {
            msg: getSuitableTranslations("Sorry, This Trade Is Not Exist !!", language),
            error: true,
            data: {},
        }
    } catch (err) {
        throw Error(err);
    }
}

module.exports = {
    createScheduledOrder,
    getScheduledTradeInfo,
}