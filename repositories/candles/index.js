// Import Admin, Candle Model Object

const { adminModel, candleModel } = require("../../models");

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

async function getCandlesCount(adminId, filters, language) {
    try {
        const admin = await adminModel.findById(adminId);
        if (admin) {
            if (!admin.isBlocked) {
                return {
                    msg: getSuitableTranslations("Get Candles Count Process Has Been Successfully !!", language),
                    error: false,
                    data: await candleModel.countDocuments(filters),
                }
            }
            return {
                msg: getSuitableTranslations("Sorry, This Admin Has Been Blocked !!", language),
                error: true,
                data: {
                    blockingDate: admin.blockingDate,
                    blockingReason: admin.blockingReason,
                },
            }
        }
        return {
            msg: getSuitableTranslations("Sorry, This Admin Is Not Exist !!", language),
            error: true,
            data: {},
        }
    } catch (err) {
        throw Error(err);
    }
}

async function getAllCandlesInsideThePage(adminId, pageNumber, pageSize, filters, language) {
    try {
        const admin = await adminModel.findById(adminId);
        if (admin) {
            if (!admin.isBlocked) {
                return {
                    msg: getSuitableTranslations("Get All Candles Inside The Page: {{pageNumber}} Process Has Been Successfully !!", language, { pageNumber }),
                    error: false,
                    data: {
                        candles: await candleModel.find(filters).skip((pageNumber - 1) * pageSize).limit(pageSize).sort({ creatingDate: -1 }),
                        candlesCount: await candleModel.countDocuments(filters),
                    },
                }
            }
            return {
                msg: getSuitableTranslations("Sorry, This Admin Has Been Blocked !!", language),
                error: true,
                data: {
                    blockingDate: admin.blockingDate,
                    blockingReason: admin.blockingReason,
                },
            }
        }
        return {
            msg: getSuitableTranslations("Sorry, This Admin Is Not Exist !!", language),
            error: true,
            data: {},
        }
    } catch (err) {
        throw Error(err);
    }
}

async function deleteCandle(adminId, candleId, language) {
    try {
        const admin = await adminModel.findById(adminId);
        if (admin) {
            if (admin.isWebsiteOwner) {
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
            return {
                msg: getSuitableTranslations("Sorry, Permission Denied Because This Admin Is Not Website Owner !!", language),
                error: true,
                data: {},
            }
        }
        return {
            msg: getSuitableTranslations("Sorry, This Admin Is Not Exist !!", language),
            error: true,
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
    deleteCandle
}