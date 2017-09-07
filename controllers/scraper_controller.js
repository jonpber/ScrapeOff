var express = require("express");
var app = express();
var router = express.Router();

var request = require("request");
var cheerio = require("cheerio");
var mongojs = require("mongojs");

var body = require("body-parser");

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
			res.render("index", {articles: found});
			// res.render("index", {});
	    }
	  })
});

router.get("/scrape", function(req, res){
	request("https://www.nytimes.com/section/world", function(error, response, html) {
		let $ = cheerio.load(html);
		let results = [];

		$(".headline").each(function(i, element) {
			if (i < 10){
				let link = $(element).children("a").attr("href");
				let title = $(element).text();
				console.log(title);

				request(link, function(error1, response1, html1){
					$1 = cheerio.load(html1);

					$1(".story-body-1").each(function(i1, element1){
						if (i1 === 0){
							let image = $1(element1).children(".media.photo").attr("itemid");

							if (image == null){
								image = "https://f4.bcbits.com/img/a1322149552_10.jpg";
							}
							// story-body-text
							let summary = $1(element1).children(".story-body-text").text();

							summary = summary.slice(0, 250);
							summary = summary + "... (click to read article)";

							db.scrapedData.update({title: title}, {
								title: title,
								link: link,
								img: image,
								summary: summary,
								saved: false
							}, {upsert: true}, function(error, found){
							});
						}
					})
				})

				

			}

			else if (i === 11) {
				db.scrapedData.find({saved: false}).sort({"_id": -1}, function(error, found){
				  	if (error) {
				      console.log(error);
				    }
				    // Otherwise, send the result of this query to the browser
				    else {
						res.json(found);
				    }
				  })
			}




				// db.scrapedData.findOne({title: title}, function(error, found){
				// 	if (error){
				// 		throw error;
				// 	}

				// 	if (found === null){
				// 		request(link, function(error1, response1, html1) {
				// 			// console.log("scraping for " + link);
				// 			$1 = cheerio.load(html1);

				// 			$1("div.image").each(function(i1, element1){
				// 				// console.log(i1)
				// 				if (i1 === 0){
				// 					var img = $1(element1).children("img").attr("src");
				// 					var summary = $1(element1).parent().parent().children("p.story-body-text").text();
				// 					summary = summary.slice(0, 250);
				// 					summary = summary + "... (click to read article)";

				// 					db.scrapedData.insert({
				// 						title: title,
				// 						link: link,
				// 						img: img,
				// 						saved: false,
				// 						summary: summary,
				// 						comments: []
				// 					});
				// 				}
				// 			})
							
				// 		})
				// 	}
				// })		

				// db.scrapedData.find({saved: false}).sort({"_id": -1}, function(error, found){
				//   	if (error) {
				//       console.log(error);
				//     }
				//     // Otherwise, send the result of this query to the browser
				//     else {
				// 		res.send(found);
				//     }
				//   })
			
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

router.get("/articles/:id", function(req, res){
	db.scrapedData.findOne({"_id": ObjectId(req.params.id)}, function(error, found){
		res.json(found);
	})
})

router.put("/articles/:id", function(req, res){
	db.scrapedData.update({"_id": ObjectId(req.params.id)}, {$set: {saved: true}}, function(error, found){
		res.redirect("/")
	})
})

router.post("/articles/:id", function(req, res){
	db.scrapedData.update({"_id": ObjectId(req.params.id)}, {$addToSet: {comments: req.body.comment}}, function(error, found){
	})
})

router.delete("/articles/:id", function(req, res){
	db.scrapedData.remove({"_id": ObjectId(req.params.id)}, function(error, found){
		res.redirect("/saved")
	})
})

module.exports = router;