var mongoose = require("mongoose");

//Save a reference to the Schema constructor
var Schema = mongoose.Schema;

//Using the Schema constructor, create a new GifSchema object
var GifSchema = new Schema({
	//theme is required and a type of string
	theme: {
		type: String,
		required: true
	},
	//category is required and a type of string
	categories: {
		type: Array,
		required: true
	}
});

//This creates our model from the above schema using mongoose's model method
var Gif = mongoose.model("Gif", GifSchema);

//Export the Gif model
module.exports = Gif;