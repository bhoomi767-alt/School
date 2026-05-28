const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    rollNo: {
        type: String
    },
    photo: {
        type: String,
        default: ""
    },
    feeStatus: {
        type: String,
        default: "pending"
    },
    studentClass: {
        type: String,
        default: ""
    },
    percentage: {
        type: Number,
        default: 0
    },
    attendance: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ["admin", "student"],
        default: "student"
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);