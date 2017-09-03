$(function(){
	$(".scrapeBtn").on("click", function(){
		$.getJSON("/scrape", function(data) {
			// updateScrapedArticles(data);
		});
	})

	// function updateScrapedArticles(data){
	// 	$(".mainPageRow").empty();

	// 	for (var i = 0; i < data.length; i++){
	// 		if (i === 0){
	// 			var topDiv = $("<div class='col s12'>");
	// 			var articleDiv = $("<div class='article'>");
	// 			articleDiv.append("<h1 class='topH1'>" + data[i].title  + "</h1>")
	// 			.append("<img src=" + data[i].img + " class='topImg'>")
	// 			.append("<p>" + data[i].summary + "</p>")
	// 			topDiv.append(articleDiv).appendTo(".mainPageRow")
	// 			$(".mainPageRow").append("<hr>")
	// 		}

	// 		else if (i > 0 && i < 4){
	// 			var midDiv = $("<div class='col s4'>");
	// 			var articleDiv = $("<div class='article smallArticle'>");
	// 			articleDiv.append("<h3>" + data[i].title  + "</h3>")
	// 			.append("<img src=" + data[i].img + " class='smallImg'>")
	// 			midDiv.append(articleDiv).appendTo(".mainPageRow")

	// 			if (i === 3){
	// 				$(".mainPageRow").append("<hr>")
	// 			}
	// 		}

	// 		else {
	// 			var headlinesDiv = $("<div class='col s4'>");
	// 			var articleDiv = $("<div class='article smallArticle'>");
	// 			articleDiv.append("<h3 class='smallerHeadline'>" + data[i].title  + "</h3>")
	// 			headlinesDiv.append(articleDiv).appendTo(".mainPageRow")
	// 		}
	// 	}

		$('.readIcon').webuiPopover({content:'Read Article', animation:'pop', placement:"right", trigger:'hover', delay: {
			show: 750,
			hide: 100
		}});

		$('.saveIcon').webuiPopover({content:'Save Article', animation:'pop', placement:"right", trigger:'hover', delay: {
			show: 750,
			hide: 100
		}});
	// }

	// $.getJSON("/scrape", function(data) {
	// 		updateScrapedArticles(data);
	// });

})