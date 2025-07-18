//require packages
const express = require("express");
const path = require("path");
const env = require("dotenv").config({ path: "./env/.env" });
const { userConnection } = require("./db/connections/user_connection");
const { restrictToUserLoggedIn } = require("./middlewares/user_middleware");
const cookieParser = require("cookie-parser");
const homeRoute = require("./routes/home_route");
const signupRoute = require("./routes/signup_route");
const loginRoute = require("./routes/login_route");
const verifyOtpRoute = require("./routes/otp_route");
const app = express();

//add mongo connection
userConnection(process.env.MONGO_URI || "mongodb+srv://user:9OPMqEZVyr5iBR6i@test.muvumop.mongodb.net/");

//add middleware 
app.use(express.urlencoded({ extended: true })); //to pass html request
app.use(cookieParser()); //to paas cookie request
app.use(express.json()); //to pass json request

//add ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//add route
app.use("/resend-otp", resendOtpRoute);
app.use("/otp", verifyOtpRoute);
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/", restrictToUserLoggedIn , homeRoute);

//create Server on PORT 3000
const hostname = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on http://${hostname}:${PORT}/`));