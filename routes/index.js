const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

const routes = (io) => {

  // API Routes
  router.use("/api", apiRoutes(io));

  // If no API routes are hit, send the React app
  router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  return router;
}

module.exports = routes;
