const express = require("express");
const authController = require("../../auth");
const controller = require("./controller");

const router = express.Router();

router
  .route("/")
  .get(
    authController.decodeToken,
    authController.checkUser,
    controller.getLedger
  );

module.exports = router;
