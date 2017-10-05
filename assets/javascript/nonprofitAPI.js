
//call function upon dropdown menu selection

$(".item").click(function(displayOrgs) {

	//pull value of dropdown selection

	$(".item").select();
	var state = $(this).text();
	console.log(state);


	//set up ajax variables

	//API key
	var orgsKey = "AIzaSyDSd7MysddE5ZXyQW-s36ydI0Wlt793Q98"
	//Google custom search key
	var csKey =  "007404496376415496285:znz6cfip7pc"
	// url
	var urlOrgs = "https://www.googleapis.com/customsearch/v1?key=" + orgsKey + "&cx=" + csKey + "&q=healthcare"
	console.log(urlOrgs);

	//start ajax request
	$.ajax({
		url: urlOrgs,
		contentType: "application/json",
		dataType: "json",
		method: "GET"
	}).done(function(response) {
			console.log(response);

			//begin for loop to stringify and append results to sidbar div
			var responseItems = response.items;
			console.log(responseItems);

			

			for (var i = 0; i < response.items.length; i++) {
				var getLink = JSON.stringify(responseItems[i].formattedUrl);
				var linkArray = [getLink];

				console.log(linkArray);
				$("#orgs").append(linkArray);

				// for (var i = 0; i < linkArray.length; i++) {
				// 	var linkDiv = $("<div class='link-container'>");
				// 	$("#orgs").append(linkDiv);
				// 	$(".link-container").append(linkArray);


				// 	// var wholeTitle = responseItems[i].title;
				// 	// var splitTitle = wholeTitle.split("|")[0];


				// 	var activeLink = $("<a />", {
				// 		id: "org-link",
				// 		// name: splitTitle,
				// 		name: responseItems[i].title,
				// 		href: linkArray[i],
				// 		// text: splitTitle,
				// 		text: responseItems[i].title,
				// 		});

				// 	$(".link-container").append(activeLink);

				// 	};
			
			};

		});

});