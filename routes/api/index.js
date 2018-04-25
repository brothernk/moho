const router = require("express").Router();
const sessionRoutes = require("./session");

// Book routes
router.use("/session", sessionRoutes);

module.exports = router;
