// Import Strategy And Admin Model Object

const { strategyModel, adminModel } = require("../../models");

const { getSuitableTranslations } = require("../../helpers/translation");

async function getAllStartegies(authorizationId, language) {
    try {
        const admin = await adminModel.findById(authorizationId);
        if (!admin) {
            return {
                msg: getSuitableTranslations("Sorry, This Admin Is Not Exist !!", language),
                error: true,
                data: {},
            }
        }
        return {
            msg: getSuitableTranslations("Get All Strategies Process Has Been Successfully !!", language),
            error: false,
            data: await strategyModel.find({}),
        }
    }
    catch (err) {
        throw Error(err);
    }
}

async function putStrategyInfo(authorizationId, strategyId, newName, language) {
    try {
        const admin = await adminModel.findById(authorizationId);
        if (admin) {
            if (admin.isWebsiteOwner) {
                const strategy = await strategyModel.findOne({ _id: strategyId });
                if (strategy) {
                    await strategyModel.updateOne({ _id: strategyId }, { name: newName });
                    return {
                        msg: getSuitableTranslations("Updating Strategy Info Process Has Been Successfuly !!", language),
                        error: false,
                        data: {},
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
    }
    catch (err) {
        throw Error(err);
    }
}

module.exports = {
    getAllStartegies,
    putStrategyInfo,
}