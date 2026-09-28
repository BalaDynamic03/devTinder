const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
        trim: true
    },

    lastName: {
        type: String,
        trim: true
    },

    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,

        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Please enter a valid email address"
        }
    },

    age: {
        type: Number,
        min: [18, "Age must be at least 18"],
        max: [100, "Age cannot be more than 100"]
    },

    password: {
        type: String,
        required: true,
        minlength: 8
    },

    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: "Gender must be male, female, or other"
        }
    }
});

module.exports = mongoose.model("User", userSchema);