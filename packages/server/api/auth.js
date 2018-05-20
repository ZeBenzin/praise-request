const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const config = require("../config/config");
const User = require("./resources/user/model");

const signin = (req, res, next) => {
  const token = jwt.sign({ id: req.user.id }, config.JWT_SECRET, {
    expiresIn: "12h"
  });
  res.json({ token });
};

const verifyUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).send("Invalid username or password");
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (!user) {
      res.status(404).send("User not found");
    }

    const authenticated = user.authenticate(password);
    if (authenticated) {
      req.user = user;
      next();
    } else {
      res.status(400).send("Username or password incorrect");
    }
  });
};

const decodeToken = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send("Unauthorized");
  }

  req.headers.authorization = `Bearer ${req.headers.authorization}`;
  expressJwt({ secret: config.JWT_SECRET })(req, res, next);
};

const checkUser = (req, res, next) => {
  if (!req.user) {
    res.status(401).send("Unauthorized");
  }
  next();
};

module.exports = { verifyUser, signin, decodeToken, checkUser };
