var express = require("express");
var app = express();
var router = express.Router();

var request = require("request");
var cheerio = require("cheerio");
var mongojs = require("mongojs");

var body = require("body-parser");

// Database configuration
// var databaseUrl = "scraperWeb";
// var collections = ["scrapedData"];

var mongoose = require("mongoose");

var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/scraperWeb");
var db = mongoose.connection;

// var db = mongojs(databaseUrl, collections);
var ObjectId = require("mongojs").ObjectId;



router.get("/", function(req, res){
	Article.find({saved: false}).sort({date: -1}).exec(function(error, doc){
		res.render("index", {articles: doc});
	})

});

router.get("/scrape", function(req, res){
	request("https://www.nytimes.com/section/world", function(error, response, html) {
		let $ = cheerio.load(html);
		let results = [];
		let added = 0;
		$(".headline").each(function(i, element) {
			if (i < 10){
				let link = $(element).children("a").attr("href");
				let title = $(element).text();
			
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

							let article = new Article({
								title: title,
								link: link,
								img: image,
								summary: summary
							})

							article.save(function(error, doc){
								if (error){
									
								}

								else {
									added += 1;
								}
							})
						}
					})
				})
			}

			else if (i === 11) {
				Article.find({saved: false}).sort({date: -1}).exec(function(error, doc){
					res.json({found: doc,
						added: added});
			    	})
			}
			
		});
	})
});

router.get("/saved", function(req, res){
	Article.find({saved: true}).sort({date: -1}).exec(function(error, doc){
		res.render("saved", {articles: doc});
	})

});

router.get("/articles/:id", function(req, res){
	db.scrapedData.findOne({"_id": ObjectId(req.params.id)}, function(error, found){
		res.json(found);
	})
})

router.put("/articles/:id", function(req, res){
	Article.findOneAndUpdate({_id: req.params.id}, {$set:{
		saved: true
	}}, function(error, result){
		res.redirect("/");
	})
})

router.post("/articles/:id", function(req, res){
	// db.scrapedData.update({"_id": ObjectId(req.params.id)}, {$addToSet: {comments: req.body.comment}}, function(error, found){
	// 	// res.end();
	// })

	// Article.findOneAndUpdate({_id: req.params.id}, {$set:{
	// 	saved: true
	// }}, function(error, result){})
})

router.delete("/articles/:id", function(req, res){
	db.scrapedData.remove({"_id": ObjectId(req.params.id)}, function(error, found){
		res.redirect("/saved")
	})
})

router.delete("/articles/:id/:comment", function(req, res){
	db.scrapedData.update({"_id": ObjectId(req.params.id)}, {$pull: {comments: req.params.comment}}, function(error, found){
		db.scrapedData.findOne({"_id": ObjectId(req.params.id)}, function(error1, found1){
			res.json(found1.comments);
		})
		
	})
})

module.exports = router;