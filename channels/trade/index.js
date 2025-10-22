const WebSocket = require("ws");

let tradePlatformSocket = null;

const { handleCandleData } = require("../../helpers/trade");

function initializeTradeSocket(baseSocketURL, rest) {
    try {
        tradePlatformSocket = new WebSocket(`${baseSocketURL}${rest}`);
        tradePlatformSocket.on("open", () => {
            console.log("Open Connect To Trade Platform Web Socket Has Been Successfully !");
        });
        tradePlatformSocket.on("error", (err) => {
            console.log("Error On Connect To Trade Platform Web Socket !: ", err.message);
        });
        tradePlatformSocket.on("close", (code, reason) => {
            console.log("Close Connect To Trade Platform Web Socket !: ", `code: ${code}`, `reason: ${reason}`);
        });
        tradePlatformSocket.on("message", (data) => {
            const message = data instanceof Buffer ? data.toString() : data;
            handleCandleData(JSON.parse(message)?.data);
        })
        return tradePlatformSocket;
    }
    catch (err) {
        console.log(err);
    }
}

function getSocket() {
    return tradePlatformSocket;
}

module.exports = { initializeTradeSocket, getSocket };