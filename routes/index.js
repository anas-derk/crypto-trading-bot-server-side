const adminsRouter = require("./admins");
const globalPasswordsRouter = require("./global_passwords");
const strategiesRouter = require("./strategies");
const tradesRouter = require("./trades");

const { Router } = require("express")

const routes = Router();

routes.use("/admins", adminsRouter);

routes.use("/global-passwords", globalPasswordsRouter);

routes.use("/strategies", strategiesRouter);

routes.use("/trades", tradesRouter);

module.exports = routes;