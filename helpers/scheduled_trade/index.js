const { closeTrade } = require("../../repositories/trades");

const { getAllScheduledTrades, executeScheduledTradeOrder } = require("../../repositories/scheduled_trades");

async function executeScheduledTradeOrders() {
    try {
        let trades = [];
        try {
            trades = (await getAllScheduledTrades({ status: "pending" }, "en")).data.trades;
        }
        catch (err) {
            console.log("error in get scheduled trades by filters: ", err.message, "=========================================================");
            return;
        }
        for (let trade of trades) {
            if (Math.abs(Date.now() - new Date(trade.executeAt).getTime()) < 1000) {
                try {
                    await closeTrade(trade.trade._id, 3, "en");
                }
                catch (err) {
                    console.log(`error in close trade by id: ${trade._id}`, err.message, "=========================================================");
                    return;
                }
                try {
                    await executeScheduledTradeOrder(trade._id, "en");
                }
                catch (err) {
                    console.log(`error in create scheduled trade by id: ${trade._id}`, err.message, "=========================================================");
                }
            }
        }
    }
    catch (err) {
        console.log("error on execute scheduled trade order: ", err.message);
    }
}

module.exports = {
    executeScheduledTradeOrders
}