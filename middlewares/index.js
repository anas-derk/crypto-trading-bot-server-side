const authMiddlewares = require("./auth");
const commonMiddlewares = require("./common");
const filesMiddlewares = require("./files");
const globalMiddlewares = require("./global");
const numbersMiddlewares = require("./numbers");
const sortMiddlewares = require("./sort");
const tradesMiddlewares = require("./trades");

module.exports = {
    authMiddlewares,
    commonMiddlewares,
    filesMiddlewares,
    globalMiddlewares,
    numbersMiddlewares,
    sortMiddlewares,
    tradesMiddlewares
}