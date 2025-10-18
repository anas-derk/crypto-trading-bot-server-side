const { getResponseObject } = require("../../helpers/responses");

const { SIDE, PAIR, TIMEFRAME, STATUS } = require("../../constants/trades");

function validateSide(side, res, nextFunc, errorMsg = "Sorry, Please Send Valid Trade Side !!") {
    if (!SIDE.includes(side)) {
        res.status(400).json(getResponseObject(errorMsg, true, {}));
        return;
    }
    nextFunc();
}

function validatePair(pair, res, nextFunc, errorMsg = "Sorry, Please Send Valid Trade Symbol Pair !!") {
    if (!PAIR.includes(pair)) {
        res.status(400).json(getResponseObject(errorMsg, true, {}));
        return;
    }
    nextFunc();
}

function validateTimeframe(timeframe, res, nextFunc, errorMsg = "Sorry, Please Send Valid Time Frame !!") {
    if (!TIMEFRAME.includes(timeframe)) {
        res.status(400).json(getResponseObject(errorMsg, true, {}));
        return;
    }
    nextFunc();
}

function validateStatus(status, res, nextFunc, errorMsg = "Sorry, Please Send Valid Trade Status !!") {
    if (!STATUS.includes(status)) {
        res.status(400).json(getResponseObject(errorMsg, true, {}));
        return;
    }
    nextFunc();
}

module.exports = {
    validateSide,
    validatePair,
    validateTimeframe,
    validateStatus
}