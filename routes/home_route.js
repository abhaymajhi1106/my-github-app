//require packages
const express = require("express");
const router = express.Router();

//create home Route
router.get("/", (req, res) => {
    return res.render("home.ejs");
});

//exports module 
module.exports = router;