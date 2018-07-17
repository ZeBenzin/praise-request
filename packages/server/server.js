const express = require("express");
const repoRouter = require("./api/resources/repo/router");
const userRouter = require("./api/resources/user/router");
const transactionRouter = require("./api/resources/transaction/router");
const ledgerRouter = require("./api/resources/ledger/router");
const authController = require("./api/auth");
const connect = require("./db");
const bodyParser = require("body-parser");
const winston = require("winston");
const expressWinston = require("express-winston");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connect();

app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      })
    ],
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: true
  })
);

app.use("/praise/repo", repoRouter);
app.use("/praise/user", userRouter);
app.use("/praise/transaction", transactionRouter);
app.use("/praise/ledger", ledgerRouter);
app.use(
  "/praise/session",
  authController.decodeToken,
  authController.checkUser,
  (req, res) => {
    res.status(200).send("Session is valid");
  }
);
app.use("/praise/signin", authController.verifyUser, authController.signin);

app.all("*", (req, res) => {
  res.json({ code: 404, message: "Not found" });
});

module.exports = app;
