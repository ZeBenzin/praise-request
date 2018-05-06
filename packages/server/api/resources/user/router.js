const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.route("/").post(controller.createUser);
router.route("/:id").get(controller.getUserById);

module.exports = router;
