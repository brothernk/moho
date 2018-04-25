const router = require("express").Router();
const gifController = require("../../controllers/gifController");

//Matches with "/api/gifs"
router.route("/")
	.get(gifController.findAll)
	.post(gifController.create);

//Matches with "/api/gifs/:id"
router
	.route("/:id")
	.get(gifController.findById)
	.put(gifController.update)

module.exports = router;