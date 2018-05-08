const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

//This file empties the gif collections and inserts gifs below

// mongoose.connect(
// 	process.env.MONGODB_URI || "mongodb://localhost/gifcategories", 
// 	{
// 		useMongoClient: true
// 	}
// );

const gifCategories = [
	{
		icon: "fas fa-exclamation-triangle",
		index: 0,
		color: "#44BBA4",
		theme: ["Natural Disasters"],
		categories: ["Meteor", "Avalanche", "Drought", "Earthquake", "Extinction", "Flood", "Geomagnetic Storms", "Ghost Towns", 
		"Landslides", "Locust Swarms", "Tornado", "Tsunami", "Volcano", "Wildfire", "Zombie Attack"]
	},
	{
		icon: "fab fa-themeisle",
		index: 1,
		color: "#FF8A5B",
		theme: ["Pirates"],
		categories: ["Jack Sparrow", "Eye Patch", "Peg Legged", "Ahoy Matey", "Walk The Plank", "Treasure Chest", 
		"Polly Want a Carrot?", "Skull and Crossbone", "Penzance", "Johnny Depp", "Pirates of the Caribbean", 
		"Pittsburgh", "Blackbeard", "Jolly Roger", "Grog", "Buried Treasure"]
	},
	{
		icon: "fab fa-earlybirds",
		index: 2,
		color: "#444444",
		theme: ["Animals"],
		categories: ["Cats", "Dogs", "Horses", "Pigs", "Chickens", "Tigers", "Bears", "Kangaroo", "Lions", "Meercats",
		"Cows", "Sloth", "Aardvark", "Badger", "Owl", "Barracuda", "Dingo", "Bat", "Dolphin", "Beetle", "Bison", 
		"Anteater", "Crocodile", "Whale", "Armadillo", "Crab", "Coyote", "Elephant", "Eagle", "Frog", "Penguin", "Emu",
		"Grasshopper", "Gopher", "Goose", "Guppy", "Jellyfish", "Komodo Dragon", "Lynx", "Manatee", "Pink Fairy Armadillo",
		"Porcupine", "Possum", "Puffer Fish", "Quokka", "Rabbit", "Tasmanian Devil", "Seahorse", "Tortoise", "Snail", "Squirrel",
		"Stingray", "Wallaby", "Walrus", "Warthog", "Wolverine", "Zebra", "Yak"]
	},
	{
		icon: "fas fa-mars-double",
		index: 3,
		color: "#FFC655",
		theme: ["Bromance"],
		categories: ["Joe Biden and Barack Obama", "Matthew Mcconaughey and Jared Leto", "Mike Corbett and Michael Belsito",
		"Dane Dehaan and Daniel Radcliffe", "Micahel Cera and Jonah Hill", "Justin Bieber and Usher", "Jay Z and Kanye West",
		"Paul Rudd and Jason Segel", "Daft Punk", "Stephen Colbert and Jon Stewart", "Tobey Maguire and Leonardo diCaprio",
		"Adam Levine and Blake Shelton", "Bradley Cooper and Gerard Butler", "Darren Criss and Chord Overstreet", 
		"One Direction", "Owen Wilson and Ben Stiller", "Jimmy Fallon and Justin Timberlake", "Ben Affleck and Matt Damon",
		"Leonardo diCaprio and Jonah Hill", "Zac Efron and Michael B Jordan", "James Franco and Seth Rogen", 
		"Zach Braff and Donald Faison", "Matthew Mcconaughey and Woody Harrelson", "Dave Coulier, John Stamos, Bob Saget", 
		"George Clooney and Brad Pitt"]
	},
	{
		icon: "fas fa-baseball-ball",
		index: 4,
		color: "#5FACFF",
		theme: ["Sports"],
		categories: ["Football", "Archery", "Badminton", "Baseball", "Softball", "Basketball", "Volleyball", "Boxing",
		"Climbing", "Cycling", "Diving", "Equestrian", "Squash", "Bowling", "Fencing", "Hockey", "Golf", "Gymnastics",
		"Rowing", "Rugby", "Sailing", "Soccer", "Croquet", "Motor Boating", "Polo", "Tug-of-War", "Swimming",
		"Cricket", "Lacrosse", "Surfing", "Swimming", "Synchronized Swimming", "Table Tennis", "Tennis", "Track and Field",
		"Water Polo", "Weightlifting", "Wrestling", "Running", "Roller Blading", "Roller Derby", "Baton Twirling", "Fishing",
		"Downhill Skiing", "Cross Country Skiing", "Skijoring", "Cheerleading"]
	},
	{
		icon: "fas fa-gamepad",
		index: 5,
		color: "#FF6161",
		theme: ["90s"],
		categories: [ "As If!", "Valley Girl", "Wassup", "Getting Jiggy", "Psyche", "Tupac", "Biggie Smalls", "Big Poppa", 
		"Britney Spears", "Christina Aguilera", "Genie in a Bottle", "Man, I Feel Like a Woman", "Don't Speak", "Michael Jordan",
		"Wayne Gretsky", "Tiger Woods", "Plaid", "Windbreakers", "Combat Boots", "Bandannas", "Hyper Colored", "F*R*I*E*N*D*S", 
		"Will and Grace", "Seinfeld", "Elaine Dancing", "Full House", "How Rude", "Did I Do That?", "Boy Meets World", 
		"My So-Called Life", "Buffy the Vampire Slayer", "Dawson's Creek", "Felicity", "Saved by the Bell", "TGIF", "Kelly Kapowski",
		"Zach Attack", "All That", "Mr. Rogers", "Matrix", "Clueless", "Home Alone", "Independence Day", "Men in Black",
		"Dennis Rodman", "Tom Cruise and Nicole Kidman", "Ironic", "Julia Roberts and Lyle Lovett", "Slap Bracelets", "Lisa Frank",
		"Trapper Keepers", "The Macarena", "The Walkman", "You Got Mail", "Slip n Slide", "Easy Bake Oven", "Cabbage Patch Dolls",
		"Skip-it", "Tomogatchi", "Super Soaker", "Y2K", "Jurassic Park", "Mary Kate and Ashley", "Pokemon"]
	},
	{
		icon: "fas fa-pills",
		index: 6,
		color: "#D45FFF",
		theme: ["80s"],
		categories: ["Dallas", "M*A*S*H", "Who Shot JR?", "Video Killed the Radio Star", "MTV", "Prince", "Purple Rain", "Madonna",
		"Like a Virgin", "CNN", "1984", "Mac or PC", "Gordon Gekko", "Reganomics", "Berlin Wall", "Gorbachev", "David Hasselhoff",
		"Wall Street", "Shoulder Pads", "Permed Hair", "Joan Jett", "Brooke Shields", "Fanny Packs", "Frankie Says", "Jordache", "Scrunchies",
		"Spandex", "Muscle Tees", "Paula Abdul", "New Kids on the Block", "Tiffany", "Boy George", "Wham", "Just Say No", "Brat Pack",
		"Reading Rainbow", "Strawberry Shortcake", "Rainbow Brite", "Teddy Ruxpin", "Boombox", "Landlines", "Party Lines", "Caboodle", 
		"Be Kind, Rewind", "Rubiks Cube", "Neon", "Teenaged Mutant Ninja Turtles", "Lunchables"]
	},
	{
		icon: "fab fa-bitcoin",
		index: 7,
		color: "#9964FF",
		theme: ["2000s"],
		categories: ["Steve Jobs", "Donald Trump", "Harry Potter", "Britney Spears Meltdown", "Chris Crocker", "Britney Spears and Justin Timberlake",
		"John Cena", "MTV Reality Shows", "Paris Hilton and Nicole Richie", "Bravo! Reality", "Lady Gaga", "The Daily Show", "Freaks and Greeks",
		"Survivor", "The Bachelor", "Napster", "Curb Your Enthusiasm", "Oprah", "Peter Jackson's Lord of the Rings", "Destiny's Child", "Beyonce",
		"Kanye West", "The Kardashians", "Chappelle Show", "Arrested Development", "The Simple Life", "Fortnite", "Sex and the City", "Howard Stern",
		"World of Warcraft", "Auto-Tune", "Twilight", "Vampires", "Zombies", "Sacha Baron Cohen", "The Office", "Parks and Rec", "Ron Swanson", 
		"Dick in a Box", "Tina Fey as Sarah Palin", "The Hangover", "The History of Rap", "Betty White", "Man Buns", "Antoine Dodson", "Hide Yo Kids",
		"Justin Bieber", "Boy Bands", "The Jersey Shore", "Westworld", "HBO", "Beards", "Movember", "Mark Ronson", "Bruno Mars", "Usain Bolt", 
		"Chicago Cubs World Series Champs", "Game of Thrones", "Hamilton", "The Book of Mormon", "Insta Famous", "Adam Rippon", "Fake News"]
	},
	{
		icon: "fas fa-snowflake",
		index: 8,
		color: "#802152",
		theme: ["Minnesota"],
		categories: ["Twins", "Vikings", "Wild", "Lynx", "Gophers", "Maroon and Gold", "10,000 Lakes", "Minnesnowta", "Lake Life", "Cabin Life",
		"Doomtree", "POS", "Dessa", "Atmosphere", "Prince", "Target", "Craft Beer", "Surly", "Mississippi River", "Minnehaha Falls", "Chain of Lakes",
		"Iron Range", "Lake Superior", "Minneapolis", "Super Bowl LII", "Ice Castles", "Crashed Ice", "Boundary Waters", "Cold AF", "Duluth", 
		"Stillwater", "General Mills", "3M", "Land o Lakes", "Hormel", "Best Buy", "Garrison Keillor", "Lake Wobegon", "F Scott Fitzgerald", 
		"Bob Dylan", "Eddie Cochran", "Soul Asylum", "Charles Schultz", "Peanuts", "Snoopy", "Mall of America", "Cohen Brothers", 
		"Mystery Science Theater 3000", "Judy Garland", "Jesse Ventura", "Biking", "Minnesota Nice", "Hotdish", "Fargo", "Grumpy Old Men", "Mary Tyler Moore", "The Mighty Ducks", "Great Minnesota Get Together",
		"Winter Carnival", "Renassaince Festival", "WE Fest", "Detroit Lakes"]
	}
	
];

db.Gif
	.remove({})
	.then(() => db.Gif.collection.insertMany(gifCategories))
	.then(data => {
		console.log(data.insertedIds.length + "categories inserted");
		process.exit(0);
	})
	.catch(err => {
		console.log(err);
		process.exit(1);
});