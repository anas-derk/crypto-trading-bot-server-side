// Import Admin Model Object

const { adminModel, tradeModel, strategyModel } = require("../../models");

const { getSuitableTranslations } = require("../../helpers/translation");

async function createOrder(adminId, orderInfo, language) {
    try {
        const admin = await adminModel.findById(adminId);
        if (admin) {
            if (admin.isWebsiteOwner) {
                let strategy = {};
                if (orderInfo?.strategyId) {
                    strategy = await strategyModel.findById(orderInfo.strategyId);
                } else {
                    strategy = await strategyModel.findOne({ name: "Ali Zantout" });
                }
                if (strategy) {
                    const newInstance = new tradeModel(orderInfo);
                    const newOrder = await newInstance.save();
                    return {
                        msg: getSuitableTranslations("Create New Trade Order Process Has Been Successfully !!", language),
                        error: false,
                        data: newOrder,
                    }
                }
                return {
                    msg: getSuitableTranslations("Sorry, This Strategy Is Not Exist !!", language),
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
    } catch (err) {
        throw Error(err);
    }
}

async function getTradeInfo(tradeId, language) {
    try {
        const trade = await tradeModel.findById(tradeId);
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

async function getTradesCount(adminId, filters, language) {
    try {
        const admin = await adminModel.findById(adminId);
        if (admin) {
            if (!admin.isBlocked) {
                return {
                    msg: getSuitableTranslations("Get Trades Count Process Has Been Successfully !!", language),
                    error: false,
                    data: await tradeModel.countDocuments(filters),
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

async function getAllTradesInsideThePage(adminId, pageNumber, pageSize, filters, language) {
    try {
        const admin = await adminModel.findById(adminId);
        if (admin) {
            if (!admin.isBlocked) {
                return {
                    msg: getSuitableTranslations("Get All Trades Inside The Page: {{pageNumber}} Process Has Been Successfully !!", language, { pageNumber }),
                    error: false,
                    data: {
                        trades: await tradeModel.find(filters).skip((pageNumber - 1) * pageSize).limit(pageSize).sort({ creatingDate: -1 }),
                        tradesCount: await tradeModel.countDocuments(filters),
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

async function getAllTrades(filters, language) {
    try {
        return {
            msg: getSuitableTranslations("Get All Trades Process Has Been Successfully !!", language),
            error: false,
            data: {
                trades: await tradeModel.find(filters),
                tradesCount: await tradeModel.countDocuments(filters),
            },
        }
    } catch (err) {
        throw Error(err);
    }
}

async function openTrade(tradeId, side, price, language) {
    try {
        const trade = await tradeModel.findById(tradeId);
        if (trade) {
            trade.startSide = side;
            trade.startPrice = price;
            trade.openAt = Date.now();
            trade.status = "open";
            await trade.save();
            return {
                msg: getSuitableTranslations("Open Trade Process Has Been Successfully !!", language),
                error: false,
                data: {},
            }
        }
        return {
            msg: getSuitableTranslations("Sorry, This Trade Is Not Exist !!", language),
            error: true,
            data: {},
        }
    }
    catch (err) {
        throw Error(err);
    }
}

async function closeTrade(tradeId, price, language) {
    try {
        const trade = await tradeModel.findOne(tradeId);
        if (trade) {
            trade.endSide = trade.startSide === "buy" ? "sell" : "buy";
            trade.endPrice = price;
            trade.closedAt = Date.now();
            trade.status = "closed";
            await trade.save();
            return {
                msg: getSuitableTranslations("Open Trade Process Has Been Successfully !!", language),
                error: false,
                data: {},
            }
        }
        return {
            msg: getSuitableTranslations("Sorry, This Trade Is Not Exist !!", language),
            error: true,
            data: {},
        }
    }
    catch (err) {
        throw Error(err);
    }
}

async function deleteTrade(adminId, tradeId, language) {
    try {
        const admin = await adminModel.findById(adminId);
        if (admin) {
            if (admin.isWebsiteOwner) {
                const trade = await tradeModel.findOneAndDelete({ _id: tradeId });
                if (trade) {
                    return {
                        msg: getSuitableTranslations("Deleting Trade Process Has Been Successfully !!", language),
                        error: false,
                        data: {},
                    }
                }
                return {
                    msg: getSuitableTranslations("Sorry, This Trade Is Not Exist !!", language),
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
    createOrder,
    getTradeInfo,
    getTradesCount,
    getAllTradesInsideThePage,
    getAllTrades,
    openTrade,
    closeTrade,
    deleteTrade,
}