require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "tinder"
    });
};

connectDB()
    .then(() => {
        console.log("connection successfully!....");
    })
    .catch((err) => {
        console.error("not connected db..", err);
    });