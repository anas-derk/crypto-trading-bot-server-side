const { responsesHelpers, translationHelpers } = require("../../helpers");

const { getResponseObject } = responsesHelpers;

const { getSuitableTranslations } = translationHelpers;

const tradesOPerationsManagmentFunctions = require("../../repositories/admins");

async function getTradeInfo(req, res) {
    try {
        res.json(await tradesOPerationsManagmentFunctions.getTradeInfo(req.data._id, req.query.language));
    }
    catch (err) {
        res.status(500).json(getResponseObject(getResponseObject(getSuitableTranslations("Internal Server Error !!", req.query.language), true, {}), true, {}));
    }
}

function getFiltersObject(filters) {
    let filtersObject = {};
    for (let objectKey in filters) {
        if (objectKey === "_id") filtersObject[objectKey] = filters[objectKey];
        if (objectKey === "side") filtersObject[objectKey] = filters[objectKey];
        if (objectKey === "pair") filtersObject[objectKey] = filters[objectKey];
        if (objectKey === "status") filtersObject[objectKey] = filters[objectKey];
    }
    return filtersObject;
}

async function getTradesCount(req, res) {
    try {
        const result = await tradesOPerationsManagmentFunctions.getTradesCount(req.data._id, getFiltersObject(req.query), req.query.language);
        if (result.error) {
            return res.status(401).json(result);
        }
        res.json(result);
    }
    catch (err) {
        res.status(500).json(getResponseObject(getResponseObject(getSuitableTranslations("Internal Server Error !!", req.query.language), true, {}), true, {}));
    }
}

async function getAllTradesInsideThePage(req, res) {
    try {
        const filters = req.query;
        const result = await tradesOPerationsManagmentFunctions.getAllTradesInsideThePage(req.data._id, filters.pageNumber, filters.pageSize, getFiltersObject(filters), filters.language);
        if (result.error) {
            return res.status(401).json(result);
        }
        res.json(result);
    }
    catch (err) {
        res.status(500).json(getResponseObject(getResponseObject(getSuitableTranslations("Internal Server Error !!", req.query.language), true, {}), true, {}));
    }
}

async function deleteTrade(req, res) {
    try {
        const result = await tradesOPerationsManagmentFunctions.deleteTrade(req.data._id, req.params.tradeId, req.query.language);
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
    getTradeInfo,
    getTradesCount,
    getAllTradesInsideThePage,
    deleteTrade
}