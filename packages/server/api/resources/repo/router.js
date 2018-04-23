const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.param("id", controller.getById);
router.route("/").get(controller.getByQuery);
router.route("/:id").get(controller.getById);

module.exports = router;
