
function displayOrgs () {
	var state = $(".dropdown").attr(".dropdown-menu");


	// var urlOrgs = "https://api.globalgiving.org/api/public/services/search/projects?api_key=7676537c-931a-4d85-afff-af954b70f739&q=us+california+healthcare";
	var urlOrgs = "https://api.globalgiving.org/api/public/services/search/projects?api_key=7676537c-931a-4d85-afff-af954b70f739&q=us+" + state + "healthcare";

	
	$.ajax({
		url: urlOrgs,
		method: "GET"
	}).done(function(response) {
 			var xmlResponse = $(response).find('search').find('response').find('projects');
 			console.log(xmlResponse);

 	});
 };

displayOrgs();
