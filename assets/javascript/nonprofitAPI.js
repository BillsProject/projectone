
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
		method: "GET"
	}).done(function(response) {
			//parse and pull response
 			var xmlResponse = $(response).find('search').find('response').find('projects').find('name');
 			console.log(xmlResponse);
 			//append response to orgs div
 			$("#orgs").append(xmlResponse);

 	});


 });


