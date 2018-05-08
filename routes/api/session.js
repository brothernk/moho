const router = require("express").Router();
const sessionController = require("../../controllers/sessionController");

const sessionRoutes = (io) => {
  // Matches with "/api/session"
  router.route("/")
    .get(sessionController.findAll)
    .post(sessionController.create(io))
    .delete(sessionController.deleteAll)

  // Matches with /api/session/title/sessiontitle
  router.route("/title/:session")
    .get(sessionController.findByTitle)

  // Matches with /api/session/url/sessionurl
  router.route("/url/:word1/:word2/:word3/:word4/:word5/:word6")
    .get(sessionController.findByUrl)

  router.route("/member")
    .post(sessionController.addMember)

  return router;
}

module.exports = sessionRoutes;