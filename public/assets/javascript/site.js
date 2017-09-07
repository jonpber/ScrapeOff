$(function(){
	$('.readIcon').webuiPopover({content:'Read Article', animation:'pop', placement:"right", trigger:'hover', delay: {
		show: 750,
		hide: 100
	}});

	$('.saveIcon').webuiPopover({content:'Save Article', animation:'pop', placement:"right", trigger:'hover', delay: {
		show: 750,
		hide: 100
	}});

	$('.deleteArticleIcon').webuiPopover({content:'Delete Article', animation:'pop', placement:"right", trigger:'hover', delay: {
		show: 750,
		hide: 100
	}});

	$('.commentIcon').webuiPopover({content:'Comment on Article', animation:'pop', placement:"right", trigger:'hover', delay: {
		show: 750,
		hide: 100
	}});

	$("body").on("click", ".commentIcon", function(){
		let id = $(this).attr("dataId");
		$.get("/articles/" + id, function(data, status){
			let modal = $("<div class='modal'>");
			let modalContent = $("<div class='content'>");
			modalContent.append("<h3>Comments</h3>");
			let commentDiv = $("<div class='commentDiv'>")
			if (data.comments !== undefined){
				for (let i = 0; i < data.comments.length; i++){
					let comment = $("<div class='comment valign-wrapper'>")
					.append("<p class='commentText'>" + data.comments[i] + "</p>")
					.append("<button class='removeBtn'>X</button>")
					.appendTo(commentDiv);
				}
			}

			commentDiv.appendTo(modalContent);
			modalContent.append("<hr>")
			.append("<h3>Add Comment</h3>")
			let submitForm = $("<form action='/articles/"+ id +"' method='POST'>")
			.append("<textarea class='newComment' name='comment'>")
			.append("<button type='submit' class='submitComment'>Submit</button>")
			.appendTo(modalContent);
			modalContent.appendTo(modal);
			$(modal).iziModal();
			$("body").append(modal);
			$(modal).iziModal('open');
		})
	})

	$("body").on("click", ".scrapeBtn", function(event){
		event.preventDefault();
		$.get("/scrape", function(data, status){
			console.log(data);
			$(".mainPageRow").empty();
			for (let i = 0; i < data.length; i++){
				if (i === 0){
					let column = $("<div class='col s12 center'>")
					let article = $("<div class='article'>")
					.append("<a href='" + data[i].link +"'class='headline'><h1 class='topH1'>" + data[i].title +"</h1></a>")
					.append("<img src='" + data[i].img + "' class='topImg'>")
					.append("<p>" + data[i].summary + "</p>")
					let saveForm = $("<form action='/articles/" + data[i].title_id + "?_method=PUT' method='POST'>")
					.append("<button type='submit' class='saveArticle'>Save Article  <span class='material-icons saveIcon'>fiber_pin</span></button>")
					.appendTo(article);
					article.append("<hr>")
					column.append(article).appendTo(".mainPageRow");
				}
				
				else {
					let column = $("<div class='col s12 center'>")
					let article = $("<div class='article smallArticle'>")
					let articleHeadlineCol = $("<div class='col s11'>")
					.append("<a href='" + data[i].link + "' class='headline'><h3>" + data[i].title + "</h3></a>")
					.appendTo(article);
					let buttonCol = $("<div class='col s1 iconButton'>")
					let saveForm = $("<form action='/articles/" + data[i].title_id + "?_method=PUT' method='POST'>")
					.append("<button type='submit' class='saveArticle material-icons saveIcon'>fiber_pin</button>")
					.appendTo(article);
					column.append(article).appendTo(".mainPageRow");


				}
			}
		})
	})


	// }

	// $.getJSON("/scrape", function(data) {
	// 		updateScrapedArticles(data);
	// });

})