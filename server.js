var express = require("express");
var body = require("body-parser");
var path = require("path");
var app = express();
var exphbs = require("express-handlebars");

var request = require("request");
var cheerio = require("cheerio");

// Database configuration
var databaseUrl = "scraperWeb";
var collections = ["scrapedData"];

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var router = require(path.join(__dirname, "controllers", "scraper_controller.js"));

var port = process.env.PORT || 7000;

app.use(body.json()); // support json encoded bodies
app.use(body.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(path.join('public')));

app.use("/", router);


app.listen(port, function(error){
	if (error){
		return console.log(error);
	}

	console.log("server is listening on http://localhost:%s", port);
});
