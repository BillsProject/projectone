
//call function upon dropdown menu selection
$(".item").click(function(displayOrgs) {

	//pull value of dropdown selection
	$(".item").select();
	var state = $(this).text();
	console.log(state);


	//set up ajax variables
	var urlOrgs = "https://api.globalgiving.org/api/public/services/search/projects/summary?api_key=7676537c-931a-4d85-afff-af954b70f739&q=" + state + "&filter=country:US";
	console.log(urlOrgs);
	//start ajax request
	$.ajax({
		url: urlOrgs,
		method: "GET"
	}).done(function(response) {
			//parse and pull response
 			var xmlResponse = $(response).find('search').find('response').find('projects').find('name');
 			console.log(xmlResponse);
 			//append response to orgs div
 			$("#orgs").append(xmlResponse);

 	});


 });


