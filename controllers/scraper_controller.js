var express = require("express");
var app = express();
var router = express.Router();

var request = require("request");
var cheerio = require("cheerio");
var mongojs = require("mongojs");

// Database configuration
var databaseUrl = "scraperWeb";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);



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
	db.scrapedData.find(function(error, found){
  	if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      console.log(found);
      res.render("index", {articles: found});
    }
  })
});

router.get("/scrape", function(req, res){
	request("https://www.nytimes.com/section/world", function(error, response, html) {

		var $ = cheerio.load(html);

		var results = [];

		$(".headline").each(function(i, element) {
			if (i < 10){
				var link = $(element).children("a").attr("href");
				var title = $(element).text();

				db.scrapedData.find({title: title}, function(error, found){
					if (error){
						throw error;
					}

					if (Object.keys(found).length === 0){
						console.log("no result")
						request(link, function(error1, response1, html1) {
							$1 = cheerio.load(html1);

							$1("div.image").each(function(i1, element1){
								var img = $1(element1).children("img").attr("src");
								var summary = $1(element1).parent().parent().children("p:nth-child(2)").text();
								db.scrapedData.insert({
									title: title,
									link: link,
									img: img,
									saved: false,
									summary: summary
								});
							})
						})
					}
				})

				
				

				
			}
		});
	})
});

router.get("/saved", function(req, res){
	res.render("saved", tempObj);
});

module.exports = router;