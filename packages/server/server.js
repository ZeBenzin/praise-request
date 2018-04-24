const express = require("express");
const repoRouter = require("./api/resources/repo/router");
const userRouter = require("./api/resources/user/router");
const githubAccountRouter = require("./api/resources/github-account/router");

const app = express();

app.use("/praise/repo", repoRouter);
app.use("praise/user", userRouter);
app.use("praise/githubaccount", githubAccountRouter);

app.all("*", (req, res) => {
  res.json({ code: 404, message: "Not found" });
});

module.exports = app;
