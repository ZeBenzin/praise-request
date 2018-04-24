const express = require("express");
const controller = require("./controller");

const router = express.Router();

// router.params("/:id").route();
router
  .route("/")
  .get(controller.getUserById)
  .post(controller.createUser);

module.exports = router;
