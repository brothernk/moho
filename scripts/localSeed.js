const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/gifcategories"
);

const Categories = require("./seed.js");

db.Gif
	.remove({})
	.then(() => db.Gif.collection.insertMany(Categories))
	.then(data => {
		console.log(data.ops.length + " Categories Inserted");
		process.exit(0);
	})
	.catch(err => {
		console.log(err);
		process.exit(1);

});