const tradesRouter = require("express").Router();

const tradesController = require("../../controllers/trades");

const { validateIsExistValueForFieldsAndDataTypes } = require("../../helpers/validate");

const {
    authMiddlewares,
    numbersMiddlewares,
    tradesMiddlewares
} = require("../../middlewares");

const {
    validateJWT,
} = authMiddlewares;

const {
    validateNumbersIsGreaterThanZero,
    validateNumbersIsNotFloat,
} = numbersMiddlewares;

const {
    validateSide,
    validatePair,
    validateTimeframe,
    validateStatus
} = tradesMiddlewares;

tradesRouter.post("/create-order",
    validateJWT,
    (req, res, next) => {
        const { strategyId, amount, pair } = req.body;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Strategy Id", fieldValue: strategyId, dataTypes: ["ObjectId"], isRequiredValue: false },
            { fieldName: "Amount", fieldValue: amount, dataTypes: ["number"], isRequiredValue: true },
            { fieldName: "Pair", fieldValue: pair, dataTypes: ["string"], isRequiredValue: true },
            { fieldName: "Time Frame", fieldValue: pair, dataTypes: ["string"], isRequiredValue: true },
        ], res, next);
    },
    (req, res, next) => validateNumbersIsGreaterThanZero([req.body.amount], res, next, [], "Sorry, Please Send Valid Amount ( Number Must Be Greater Than Zero ) !!"),
    (req, res, next) => validatePair(req.body.pair, res, next),
    (req, res, next) => validateTimeframe(req.body.timeframe, res, next),
    tradesController.postCreateOrder
);

tradesRouter.get("/trade-info", validateJWT, tradesController.getTradeInfo);

tradesRouter.get("/trades-count", validateJWT, tradesController.getTradesCount);

tradesRouter.get("/all-trades-inside-the-page",
    validateJWT,
    (req, res, next) => {
        const { pageNumber, pageSize, _id, side, pair, status } = req.query;
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "page Number", fieldValue: Number(pageNumber), dataTypes: ["number"], isRequiredValue: true },
            { fieldName: "page Size", fieldValue: Number(pageSize), dataTypes: ["number"], isRequiredValue: true },
            { fieldName: "Trade Id", fieldValue: _id, dataTypes: ["ObjectId"], isRequiredValue: false },
            { fieldName: "Side", fieldValue: side, dataTypes: ["string"], isRequiredValue: false },
            { fieldName: "Pair", fieldValue: pair, dataTypes: ["string"], isRequiredValue: false },
            { fieldName: "Status", fieldValue: status, dataTypes: ["string"], isRequiredValue: false },
        ], res, next);
    },
    (req, res, next) => validateNumbersIsGreaterThanZero([req.query.pageNumber, req.query.pageSize], res, next, ["Sorry, Please Send Valid Page Number ( Number Must Be Greater Than Zero ) !!", "Sorry, Please Send Valid Page Size ( Number Must Be Greater Than Zero ) !!"]),
    (req, res, next) => validateNumbersIsNotFloat([req.query.pageNumber, req.query.pageSize], res, next, ["Sorry, Please Send Valid Page Number ( Number Must Be Not Float ) !!", "Sorry, Please Send Valid Page Size ( Number Must Be Not Float ) !!"]),
    (req, res, next) => {
        const { side } = req.query;
        if (side) {
            validateSide(side, res, next);
            return;
        }
        next();
    },
    (req, res, next) => {
        const { pair } = req.query;
        if (pair) {
            validatePair(pair, res, next);
            return;
        }
        next();
    },
    (req, res, next) => {
        const { status } = req.query;
        if (status) {
            validateStatus(status, res, next);
            return;
        }
        next();
    },
    tradesController.getAllTradesInsideThePage
);

tradesRouter.delete("/delete-trade/:tradeId",
    validateJWT,
    (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Trade Id", fieldValue: req.params.tradeId, dataTypes: ["ObjectId"], isRequiredValue: true },
        ], res, next);
    },
    tradesController.deleteTrade
);

module.exports = tradesRouter;