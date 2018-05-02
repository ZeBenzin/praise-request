const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const config = require("../config/dev.config");
const User = require("./resources/user/model");

const signin = (req, res, next) => {
  const token = jwt.sign({ id: req.user.id }, config.config.JWT_SECRET);
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

module.exports = { verifyUser, signin };
