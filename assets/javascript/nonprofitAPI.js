
//call function upon dropdown menu selection
$(".item").click(function(displayOrgs) {

	//pull value of dropdown selection
	$(".item").select();
	var state = $(this).text();
	console.log(state);


	//set up ajax variables
	var orgsKey = "AIzaSyDSd7MysddE5ZXyQW-s36ydI0Wlt793Q98"
	var csKey =  "007404496376415496285:znz6cfip7pc"
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
			//stringify response
 			
 			var pullOrgs = JSON.stringify(response.items[0].htmlFormattedUrl);
 			console.log(pullOrgs);
 			//append to div
 			$("#orgs").append(pullOrgs);

 	});


 });


