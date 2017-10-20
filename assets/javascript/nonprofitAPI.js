
//call function upon dropdown menu selection

$(".item").click(function(displayOrgs) {

	//pull value of dropdown selection

	$(".item").select();
	//split and join to take care of spaces
	var state = ($(this).text()).split(' ').join('+');
	// console.log(state);
	var newTopic = ($(".current").text()).split(' ').join('+');
	// console.log(newTopic);

	//empty orgs div to clear previous search results
	$("#orgs").empty();


	//set up ajax variables

	//API key
	var orgsKey = "AIzaSyDSd7MysddE5ZXyQW-s36ydI0Wlt793Q98"
	//Google custom search key
	var csKey =  "007404496376415496285:znz6cfip7pc"
	// url
	var urlOrgs = "https://www.googleapis.com/customsearch/v1?key=" + orgsKey + "&cx=" + csKey + "&q=" + state + "+" + newTopic
	// console.log(urlOrgs);

	//start ajax request
	$.ajax({
		url: urlOrgs,
		contentType: "application/json",
		dataType: "json",
		method: "GET"
	}).done(function(response) {
			// console.log(response);

			//begin for loop to stringify and append results to sidbar div
			var responseItems = response.items;
			// console.log(responseItems);

			

			for (var i = 0; i < responseItems.length; i++) {
				//stringify link
				// The link should already be a string so you don't need to stringify it
				// and then you also wouldn't need to call the replace function on it
				// just below.
				var stringLink = JSON.stringify(responseItems[i].formattedUrl);
				// console.log(stringLink);
				//remove quotation marks from links
				var getLink = stringLink.replace(/['"]+/g, '');
				// console.log(getLink);
				//dynamically create div and append to sidebar
				var linkDiv = $("<div class='link-container'>");
				$("#orgs").append(linkDiv);
				//create links using data from getLink
				var activeLink = $("<a />", {
				id: "org-link",
				name: responseItems[i].title,
				href: getLink,
				text: responseItems[i].title,
				});
				//append finished links to link container
				$(".link-container").append(activeLink);

				//create and append div for snippet (org summary)
				var snippetDiv = $("<div class='snippet-container'>");
				$("#orgs").append(snippetDiv);
				//stringify and append snippet
				// Again, the snippet should already be a string so this stringify call is unnecessary.
				var snippet = JSON.stringify(responseItems[i].snippet);
				$(".snippet-container").append(snippet);

			};

		});
});