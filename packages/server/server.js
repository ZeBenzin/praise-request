const express = require("express");
const repoRouter = require("./api/resources/repo/router");

const app = express();

app.use("/praise/repo", repoRouter);

app.all("*", (req, res) => {
  res.json({ code: 200, message: "Hey" });
});

module.exports = app;
