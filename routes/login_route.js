//require packages
const express = require("express");
const USERS = require("../db/models/user_schema");
const { setUser } = require("../auth/auth");
const router = express.Router();

//create login Route
router.route("/").get((req, res) => {
    return res.render("login.ejs");
}).post(async (req, res) => {
    try {
      const body = req.body;
      const user = await USERS.findOne({ email: body.email, password: body.password });

      if(user) {
        const token = setUser(user);
        res.cookie("token", token, { httpOnly: true });
        return res.redirect("/");
      }

      else res.redirect("/login");
    } catch(error) {
      console.log("Error:", error);
    }
});

//exports module 
module.exports = router;