//require packages
const express = require("express");
const { otpGen } = require('otp-gen-agent');
const USERS = require("../db/models/user_schema");
const transporter = require("../controllers/nodemailer");
const router = express.Router();

//create signup Route
router.route("/").get((req, res) => {
    return res.render("signup.ejs");
}).post(async (req, res) => {
    const body = req.body;
    const user = await USERS.create({
        username: body.username,
        email: body.email,
        password: body.password,
      });

  if(user) {
    const otp = await otpGen();
    const mailBox = await transporter.sendMail({
       from: "abhaymajhi1106@gmail.com",
       to: user.email,
       subject: "OTP Verification",
       text: `Hi ${user.username},\n\nYour verification code is: ${otp}\n\nThank you!`, // plain text fallback
       html: `
              <div style="font-family: Arial, sans-serif; color: #333; max-width: 500px; margin: auto;">
              <h1 style="color: #2c7be5;">Hi, ${user.username}!</h1>
              <p style="font-size: 16px;">Thank you for registering with us.</p>
              <p style="font-size: 16px;">Your verification code is: <strong>${otp}</strong></p>
              <p style="font-size: 14px; color: #555; margin-top: 20px;">
              If you didn't request this, please ignore this email.
              </p>
              </div>
            `
});

if(mailBox) console.log("Verification OTP sent successfully");
else console.log("Error form server", err);

return res.redirect("/login");
  }

});

//exports module 
module.exports = router;