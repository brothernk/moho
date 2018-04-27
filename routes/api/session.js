const router = require("express").Router();
const sessionController = require("../../controllers/sessionController");

// Matches with "/api/session"
router.route("/")
  .get(sessionController.findAll)
  .post(sessionController.create);

  // Mathces with /api/session/sessiontitle
router.route("/:session")
  .get(sessionController.findByTitle)

module.exports = router;