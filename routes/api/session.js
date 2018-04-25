const router = require("express").Router();
const sessionController = require("../../controllers/sessionController");

// Matches with "/api/articles"
router.route("/")
  .post(sessionController.create);

module.exports = router;