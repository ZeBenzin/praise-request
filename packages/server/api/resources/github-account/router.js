const express = require("express");
const authController = require("../../auth");
const controller = require("./controller");
const router = express.Router();

router
  .route("/")
  .post(
    authController.decodeToken,
    authController.checkUser,
    controller.createAccount
  );

module.exports = router;
