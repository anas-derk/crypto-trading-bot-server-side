const mongoose = require("mongoose");

const { resolve } = require("path");

require("dotenv").config({
    path: resolve(__dirname, "../../.env"),
});

// Create Strategy Schema

const strategySchema = new mongoose.Schema({
    name: { type: String, required: true },
    active: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

// Create Strategy Model From Strategy Schema

const strategyModel = mongoose.model("strategy", strategySchema);

const strategyInfo = {
    name: "Ali Zantout",
}

async function create_initial_strategy() {
    try {
        await mongoose.connect(process.env.DB_URL);
        let strategy = await strategyModel.findOne({ name: strategyInfo.name });
        if (strategy) {
            await mongoose.disconnect();
            return "Sorry, Can't Insert Strategy Data To Database Because it is Exist !!!";
        }
        const new_strategy = new strategyModel(strategyInfo);
        await new_strategy.save();
        await mongoose.disconnect();
        return "Ok !!, Create Initial Strategy Account Process Has Been Successfuly !!";
    } catch (err) {
        await mongoose.disconnect();
        throw Error(err);
    }
}

create_initial_strategy()
    .then((result) => { console.log(result); process.exit(1); })
    .catch((err) => console.log(err.message));