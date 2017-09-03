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
var ObjectId = require("mongojs").ObjectId;



router.get("/", function(req, res){
	db.scrapedData.find({saved: false}).sort({"_id": -1}, function(error, found){
	  	if (error) {
	      console.log(error);
	    }
	    // Otherwise, send the result of this query to the browser
	    else {
	      console.log(found);
			res.render("index", {articles: found});
			// res.render("index", {});
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

				db.scrapedData.findOne({title: title}, function(error, found){
					if (error){
						throw error;
					}

					if (found === null){
						request(link, function(error1, response1, html1) {
							// console.log("scraping for " + link);
							$1 = cheerio.load(html1);

							$1("div.image").each(function(i1, element1){
								// console.log(i1)
								if (i1 === 0){
									var img = $1(element1).children("img").attr("src");
									var summary = $1(element1).parent().parent().children("p.story-body-text").text();
									summary = summary.slice(0, 250);
									summary = summary + "... (click to read article)";

									db.scrapedData.insert({
										title: title,
										link: link,
										img: img,
										saved: false,
										summary: summary
									});
								}
							})
							db.scrapedData.find().sort({"_id": -1}, function(error, found){
								res.json(found);
							})

						})
					}
				})

				
				

				
			}
		});
	})
});

router.get("/saved", function(req, res){
	db.scrapedData.find({saved: true}).sort({"_id": -1}, function(error, found){
	  	if (error) {
	      console.log(error);
	    }
	    // Otherwise, send the result of this query to the browser
	    else {
	      // console.log(found);
			// res.render("index", {articles: found});
			res.render("saved", {articles: found});
	    }

	})
});

router.put("/articles/:id", function(req, res){
	console.log(req.params.id);
	db.scrapedData.update({"_id": ObjectId(req.params.id)}, {$set: {saved: true}}, function(error, found){
		res.redirect("/")
	})
})

module.exports = router;