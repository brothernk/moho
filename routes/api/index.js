const router = require("express").Router();
const gifRoutes = require("./gif");
const sessionRoutes = require("./session");
const giphyRoutes = require("./giphy");
// const socketRoutes = require("./socket");

//Session and Gif routes
router.use("/gif", gifRoutes);
router.use("/session", sessionRoutes);
// router.use("/session", socketRoutes(io));
router.use("/giphy", giphyRoutes);

module.exports = router;
