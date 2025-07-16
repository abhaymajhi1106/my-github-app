//require packages
const mongoose = require("mongoose");

//create userConnection
const userConnection = async (url) => {
    await mongoose.connect(url).then(() => {
        console.log("MongoDB connected....");
    });
}

//exports module 
module.exports = {
    userConnection,
}