const express = require("express");
const authController = require("../../auth");
const controller = require("./controller");

const router = express.Router();

router.route("/").post(controller.createUser);
router
  .route("/:id")
  .get(
    authController.decodeToken,
    authController.checkUser,
    controller.getUserById
  );

module.exports = router;
