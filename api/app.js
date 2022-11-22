// const createError = require('http-errors');
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieSession = require("cookie-session");
const logger = require("morgan");
require("dotenv").config();

const app = express();

const cookieConfig = require("./config/cookie.config");
const db = require("./models");

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true,}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: "rewardready-session",
    secret: cookieConfig.secret,
    httpOnly: true,
    sameSite: "strict",
  })
);
app.use(express.static(path.join(__dirname, "public")));

db.sequelize
  .sync()
  .then(() => console.log("Synced database"))
  .catch((err) => console.log("Failed to sync database: ", err.message));

require("./routes/user.routes")(app);
require("./routes/wallet.routes")(app);
require("./routes/store.routes")(app);
require("./routes/coupon.routes")(app);
require("./routes/deal.routes")(app);
require("./routes/search.routes")(app);
require("./routes/history.routes")(app);
require("./routes/category.routes")(app);
require("./routes/card.routes")(app);
require("./routes/favorite.routes")(app);
// TODO - ensure all error codes are right

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });
//
// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

module.exports = app;
