const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type : "string"
    },
    lastName : {
        type : "string"
    },
    emailId: {
        type: "string"
    },
    age: {
        type: "string"
    },
    password: {
        type: "string"
    },
    gender: {
        type: "string"
    }
})

module.exports = mongoose.model("User", userSchema)