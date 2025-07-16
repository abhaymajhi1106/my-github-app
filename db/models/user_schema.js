//require packages
const mongoose = require("mongoose");

//create userSchema
const userShema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

//create USERS model
const USERS = mongoose.model("github-data", userShema);

//exports module
module.exports = USERS;