const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(
	"mongodb://mikelsito:Makhi2007@ds211440.mlab.com:11440/heroku_g9pw6kgv"
);

const gifCategories = [
	{
		icon: "far fa-meh",
		index: 0,
		color: "#44BBA4",
		theme: ["That Face When..."],
		categories: ["You finally get paid", "You see your ex in public", "You realize you left the oven on", "People tell you thath they're counting on you", "You leave work on Friday", "Voldermort kills your parents and leaves you scarred", "You know you shouldn't do something, but you do it anyway", "The drugs start to kick in", "You're drunk and meeting new people", "When you make eye contact with your friend from across the room", "When you're hungry and the cooking instructions say it takes 2 hours", "When you hear your name in public"]
	},{
		icon: "fas fa-university",
		index: 1,
		color: "#9964FF",
		theme: ["State Of The Union"],
		categories: ["Donald Trump fleeing the media", "Trump's next cabinet member", "Trump struggling to put his tiny fingers in a bowling ball", "George W. Bush trying to read", "Hillary Clinton pandering to black voters", "Bill Clinton not inhaling", "Obama passing the torch", "Trump avoiding the question", "Anti-vaxxers attempting to calmly discuss their beliefs", "Highway protests", ""]
  },
  {
		icon: "fas fa-hashtag",
		index: 2,
		color: "#FF6161",
		theme: ["In Pop-Culture"],
		categories: ["Kanye waiting in line at his own show", "Kanye talking to himself in the mirror", "Shaq spotted trying to use the play-place at McDonalds", "All of the Kardashians trying to fix a flat tire on the side of the freeway"]
  },
  {
		icon: "fab fa-fort-awesome-alt",
		index: 3,
		color: "#802152",
		theme: ["Epic Quests"],
		categories: ["Trying to make it to Taco Bell at 1:58 a.m. when they close at 2:00 a.m.", "A Rogue battling a Wizard"]
  },
  {
		icon: "far fa-frown",
		index: 4,
		color: "#FFC655",
		theme: ["What A Bummer"],
		categories: ["You Won free tickets to London... Nebraska", "I woke up and wet the bed"]
  },
  {
		icon: "fas fa-rss",
		index: 5,
		color: "#D45FFF",
		theme: ["In The News Today..."],
		categories: ["A sinkhole spawns in a non-ideal location", "God sends a plague of locusts", "Mark Zuckerberg found guilty of stealing peoples laundry"]
	},
  {
		icon: "fas fa-user-secret",
		index: 6,
		color: "#5FACFF",
		theme: ["Playin It Cool"],
		categories: ["When you fart in public", "When you almost fall on ice", "When you pull on a push door"]
	},
  {
		icon: "fas fa-eye",
		index: 7,
		color: "#444444",
		theme: ["Oh $#@!, It's Behind Me!"],
		categories: ["When you have to turn the lights off in the basement, and run up the stairs before the monster gets you", "When you're home alone and you hear a noise"]
  },
  {
		icon: "fas fa-diagnoses",
		index: 8,
		color: "#FF8A5B",
		theme: ["Supernatural Encounters"],
		categories: ["When you stand up too quickly and get a headrush", "When you wake up on an alien spaceship", "Your friend just read from the book of the dead and summoned a Demon"]
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