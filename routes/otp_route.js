//require packages
const express = require("express");
const USERS = require("../db/models/user_schema");
const router = express.Router();

//create otp Route
router.route("/").get((req, res) => {
    return res.render("otp.ejs");
}).post(async (req, res) => {
    try {
      const body = req.body;
      const verifyOtp = await USERS.findOne({ verifyOtp: body.otp });

      if(verifyOtp) {
        return res.redirect("/login");
      }
      else res.redirect("/otp");

    } catch(error) {
      console.log("Error:", error);
    }
});

//exports module 
module.exports = router;