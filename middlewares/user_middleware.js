//require packages
const { getUser } = require("../auth/auth");

//create restrictToUserLoggedIn function
async function restrictToUserLoggedIn(req, res, next) {
const cookies = req.cookies?.token;
if(!cookies) return res.redirect("/login");

const user = getUser(cookies);
if(!user) return res.redirect("/login");

req.user = user;
next();
}

//exports module
module.exports = {
    restrictToUserLoggedIn,
}