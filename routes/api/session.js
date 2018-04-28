const router = require("express").Router();
const sessionController = require("../../controllers/sessionController");

// Matches with "/api/session"
router.route("/")
  .get(sessionController.findAll)
  .post(sessionController.create);

  // Mathces with /api/session/title/sessiontitle
router.route("/title/:session")
  .get(sessionController.findByTitle)

router.route("/url/:session")
  .get(sessionController.findByUrl)

module.exports = router;