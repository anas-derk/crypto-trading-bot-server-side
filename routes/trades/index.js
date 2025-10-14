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
    validateStatus
} = tradesMiddlewares;

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
        const { side } = req.body;
        if (side) {
            validateSide(side, res, next);
            return;
        }
        next();
    },
    (req, res, next) => {
        const { pair } = req.body;
        if (pair) {
            validatePair(pair, res, next);
            return;
        }
        next();
    },
    (req, res, next) => {
        const { status } = req.body;
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