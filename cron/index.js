const cron = require("node-cron");

const { executeScheduledTradeOrders } = require("../helpers/scheduled_trade");

cron.schedule("* * * * * *", async () => {
    try {
        await executeScheduledTradeOrders();
    }
    catch (err) {
        console.log("error on execute scheduled trade orders: ", err.message, "=========================================================");
    }
});

module.exports = cron;