const strategiesRouter = require("express").Router();

const strategiesControllers = require("../../controllers/strategies");

const { validateIsExistValueForFieldsAndDataTypes } = require("../../helpers/validate");

const {
    authMiddlewares,
} = require("../../middlewares");

const {
    validateJWT,
} = authMiddlewares;

strategiesRouter.get("/all-strategies", validateJWT, strategiesControllers.getAllStartegies);

strategiesRouter.put("/update-strategy-info/:strategyId",
    validateJWT,
    (req, res, next) => {
        validateIsExistValueForFieldsAndDataTypes([
            { fieldName: "Strategy Id", fieldValue: req.params.strategyId, dataTypes: ["ObjectId"], isRequiredValue: true },
            { fieldName: "Strategy Name", fieldValue: req.body.name, dataTypes: ["string"], isRequiredValue: true },
        ], res, next);
    },
    strategiesControllers.putStrategyInfo
);

module.exports = strategiesRouter;