const express = require("express");
const authController = require("../../auth");
const router = express.Router();

router.route("/").get(authController.decodeToken, authController.checkUser);

module.exports = router;
