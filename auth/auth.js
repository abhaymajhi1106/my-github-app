//require packages
const jwt = require("jsonwebtoken");
const secret = "Abhay2004@";

//create setUser function
const setUser = (user) => {
return jwt.sign({
    _id: user._id,
    email: user.email,
}, secret)
}

//create getUser 
const getUser = (token) => {
return jwt.verify(token, secret);
}

//exports module
module.exports = {
    setUser,
    getUser,
}