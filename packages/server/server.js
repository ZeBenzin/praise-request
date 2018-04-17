const express = require( "express");
// const { route } = require( "./api");

const app = express();

app.all("*", (req, res) => {
  res.json({ code: 200, message: "Hey" });
});

module.exports =  app;
