const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(
	"mongodb://mikelsito:Makhi2007@ds119650.mlab.com:19650/heroku_wwc9gmr7"
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