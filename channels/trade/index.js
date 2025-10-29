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
            initializeTradeSocket(process.env.BINANCE_BASE_WEB_SOCKET_URL, `/stream?streams=${BINANCE_TRADE_STREAMS.map((stream) => `${stream.pair}@kline_${stream.timeframe}`).join("/")}`);
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