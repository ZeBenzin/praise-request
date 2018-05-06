const express = require("express");
const repoRouter = require("./api/resources/repo/router");
const userRouter = require("./api/resources/user/router");
const githubAccountRouter = require("./api/resources/github-account/router");
const transactionRouter = require("./api/resources/transaction/router");
const authController = require("./api/auth");
const connect = require("./db");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connect();

app.use("/praise/repo", repoRouter);
app.use("/praise/user", userRouter);
app.use("/praise/githubaccount", githubAccountRouter);
app.use("/praise/transaction", transactionRouter);
app.use("/praise/signin", authController.verifyUser, authController.signin);

app.all("*", (req, res) => {
  res.json({ code: 404, message: "Not found" });
});

module.exports = app;
