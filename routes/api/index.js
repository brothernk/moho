const router = require("express").Router();
const gifRoutes = require("./gif");
const sessionRoutes = require("./session");

// Session and Gif routes
router.use("/gif", gifRoutes);
router.use("/session", sessionRoutes);

module.exports = router;
