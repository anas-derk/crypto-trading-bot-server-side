const adminsRouter = require("./admins");
const globalPasswordsRouter = require("./global_passwords");

const { Router } = require("express")

const routes = Router();

routes.use("/admins", adminsRouter);

routes.use("/global-passwords", globalPasswordsRouter);

module.exports = routes;