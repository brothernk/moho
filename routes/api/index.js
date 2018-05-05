const router = require("express").Router();
const gifRoutes = require("./gif");
const sessionRoutes = require("./session");
const giphyRoutes = require("./giphy");

const apiRoutes = (io) => {

  // Session and Gif routes
  router.use("/gif", gifRoutes);
  router.use("/session", sessionRoutes(io));
  router.use("/giphy", giphyRoutes);

  return router;
}

module.exports = apiRoutes;
