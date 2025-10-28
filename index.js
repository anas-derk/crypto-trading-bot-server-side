const database = require("./database");
const server = require("./http");
const { config } = require("dotenv");
const { initializeTradeSocket, getSocket } = require("./channels/trade");
const { BINANCE_TRADE_STREAMS } = require("./constants/trades");
const { runBot } = require("./helpers/trade");

config();

const PORT = process.env.PORT || 5200;

database.connect(process.env.DB_URL);

database.connection.on("connected", () => {
    require("./cron");
    const Server = server.listen(PORT, () => {
        console.log(`Server Listening On Port ${PORT}`);
        runBot("1m", "ETH/USDT")
        // initializeTradeSocket(process.env.BINANCE_BASE_WEB_SOCKET_URL, `/stream?streams=${BINANCE_TRADE_STREAMS.map((stream) => `${stream.pair}@kline_${stream.timeframe}`).join("/")}`);
    });
    process.on("SIGINT", async () => {
        const binanceSocket = getSocket();
        if (binanceSocket?.readyState) {
            binanceSocket.close();
        }
        if (database.connection.readyState) {
            await database.connection.close();
        }
        Server.close((err) => {
            console.log(`Error On Close Server: ${err?.message ?? err}`);
        });
    });
    Server.on("error", (err) => {
        console.log(`Http Server Error: ${err?.message ?? err}`);
    });
    Server.on("close", () => {
        console.log("Server Is Closed !");
    });
});