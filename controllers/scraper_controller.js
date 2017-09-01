var express = require("express");
var app = express();

var router = express.Router();

var tempObj = {
	articles: [
		{
			title: "Great article is awesome",
			summary: "Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg",
			saved: false,
			pic: "https://cdn.peopleewnetwork.com/dims4/default/996b3e3/2147483647/thumbnail/654x368/quality/90/?url=https%3A%2F%2Fcdn.peopleewnetwork.com%2Fcb%2F16%2F7c5b7aae4145a9d76c5296c42dc8%2Fthumb-peoplefeat-scotthamilton.jpg"
		},

		{
			title: "Great article is awesome",
			summary: "Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg",
			saved: false,
			pic: "https://cdn.peopleewnetwork.com/dims4/default/996b3e3/2147483647/thumbnail/654x368/quality/90/?url=https%3A%2F%2Fcdn.peopleewnetwork.com%2Fcb%2F16%2F7c5b7aae4145a9d76c5296c42dc8%2Fthumb-peoplefeat-scotthamilton.jpg"
		},

		{
			title: "Great article is awesome",
			summary: "Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg Blarg",
			saved: true,
			pic: "https://cdn.peopleewnetwork.com/dims4/default/996b3e3/2147483647/thumbnail/654x368/quality/90/?url=https%3A%2F%2Fcdn.peopleewnetwork.com%2Fcb%2F16%2F7c5b7aae4145a9d76c5296c42dc8%2Fthumb-peoplefeat-scotthamilton.jpg"
		}
	]
}

router.get("/", function(req, res){
	res.render("index", tempObj);
});

router.get("/saved", function(req, res){
	res.render("saved", tempObj);
});

module.exports = router;