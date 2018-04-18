const express = require( "express");
const { route } = require( "./api");
const { router } = require("./api/router");

const app = express();

app.use("/repo", router);

app.all("*", (req, res) => {
  res.json({ code: 200, message: "Hey" });
});

module.exports =  app;
