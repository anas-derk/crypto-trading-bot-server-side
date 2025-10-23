// Import Candle Model Object

const { candleModel } = require("../../models");

const { getSuitableTranslations } = require("../../helpers/translation");

async function saveCandleData(candleInfo, language) {
    try {
        const newInstance = new candleModel(candleInfo);
        const newCandle = await newInstance.save();
        return {
            msg: getSuitableTranslations("Create New Candle Process Has Been Successfully !!", language),
            error: false,
            data: newCandle,
        }
    } catch (err) {
        throw Error(err);
    }
}

async function getCandleInfo(candleId, language) {
    try {
        const candle = await candleModel.findById(candleId);
        if (candle) {
            return {
                msg: getSuitableTranslations("Get Candle Info Process Has Been Successfully !!", language),
                error: false,
                data: candle,
            }
        }
        return {
            msg: getSuitableTranslations("Sorry, This Candle Is Not Exist !!", language),
            error: true,
            data: {},
        }
    } catch (err) {
        throw Error(err);
    }
}

async function getCandlesCount(filters, language) {
    try {
        return {
            msg: getSuitableTranslations("Get Candles Count Process Has Been Successfully !!", language),
            error: false,
            data: await candleModel.countDocuments(filters),
        }
    } catch (err) {
        throw Error(err);
    }
}

async function getAllCandlesInsideThePage(pageNumber, pageSize, filters, language) {
    try {
        return {
            msg: getSuitableTranslations("Get All Candles Inside The Page: {{pageNumber}} Process Has Been Successfully !!", language, { pageNumber }),
            error: false,
            data: {
                candles: await candleModel.find(filters).skip((pageNumber - 1) * pageSize).limit(pageSize).sort({ creatingDate: -1 }),
                candlesCount: await candleModel.countDocuments(filters),
            },
        }
    } catch (err) {
        throw Error(err);
    }
}

async function getAllCandles(filters, language) {
    try {
        return {
            msg: getSuitableTranslations("Get All Candles Process Has Been Successfully !!", language),
            error: false,
            data: {
                candles: await candleModel.find(filters),
                candlesCount: await candleModel.countDocuments(filters),
            },
        }
    } catch (err) {
        throw Error(err);
    }
}

async function deleteCandle(candleId, language) {
    try {
        const candleDetails = await candleModel.findOneAndDelete({ _id: candleId });
        if (candleDetails) {
            return {
                msg: getSuitableTranslations("Deleting Candle Process Has Been Successfully !!", language),
                error: false,
                data: {},
            }
        }
        return {
            msg: getSuitableTranslations("Sorry, This Candle Is Not Exist !!", language),
            error: true,
            data: {},
        }
    }
    catch (err) {
        throw Error(err);
    }
}

async function deleteManyCandle(filters, language) {
    try {
        await candleModel.deleteMany(filters);
        return {
            msg: getSuitableTranslations("Deleting Many Candles By Filters Process Has Been Successfully !!", language),
            error: false,
            data: {},
        }
    }
    catch (err) {
        throw Error(err);
    }
}

module.exports = {
    saveCandleData,
    getCandleInfo,
    getCandlesCount,
    getAllCandlesInsideThePage,
    getAllCandles,
    deleteCandle,
    deleteManyCandle
}