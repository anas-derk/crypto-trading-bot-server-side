const { responsesHelpers, translationHelpers } = require("../../helpers");

const { getResponseObject } = responsesHelpers;

const { getSuitableTranslations } = translationHelpers;

const strategiesOPerationsManagmentFunctions = require("../../repositories/strategies");

async function getAllStartegies(req, res) {
    try {
        const result = await strategiesOPerationsManagmentFunctions.getAllStartegies(req.data._id, req.query.language);
        if (result.error) {
            return res.status(401).json(result);
        }
        res.json(result);
    }
    catch (err) {
        res.status(500).json(getResponseObject(getResponseObject(getSuitableTranslations("Internal Server Error !!", req.query.language), true, {}), true, {}));
    }
}

async function putStrategyInfo(req, res) {
    try {
        const result = await strategiesOPerationsManagmentFunctions.updateStrategyInfo(req.data._id, req.params.strategyId, req.body.name, req.query.language);
        if (result.error) {
            if (result.msg !== "Sorry, This Admin Is Not Exist !!") {
                return res.status(401).json(result);
            }
        }
        res.json(result);
    }
    catch (err) {
        res.status(500).json(getResponseObject(getResponseObject(getSuitableTranslations("Internal Server Error !!", req.query.language), true, {}), true, {}));
    }
}

module.exports = {
    getAllStartegies,
    putStrategyInfo
}