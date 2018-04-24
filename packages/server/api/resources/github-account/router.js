const express = require("express");
const controller = require("./controller");
const router = express.Router();

router
  .route("/")
  .get(controller.getAccountById)
  .post(controller.createAccount);

module.exports = router;
