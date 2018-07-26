const express = require("express");
const authController = require("../../auth");
const router = express.Router();

router
  .route("/")
  .get(authController.decodeToken, authController.checkUser, (req, res) =>
    res.status(200).send(req.user)
  );

module.exports = router;
