// congress API key
var apiKeyCongress = "wkEXsR0UlQgFmestVsn5LmX7oIygFk6ir1ej4Q8p";

function displayBill() {
	// removes previous bill data
	$(".bills").empty()
	window.that = this;
	//
	var topic = $(this).attr("data-label");

	var endPointBills = "https://api.propublica.org/congress/v1/bills/search.json?query=" + topic; 
	

	$.ajax({
	url: endPointBills,
	headers: {"X-API-Key": apiKeyCongress},
	method: "GET"
	}).done(function(response) {
		var amountBills = response.results[0].num_results;
		for (var i = 0; i < amountBills; i++) {
			var billDiv = $('<div class="billContainer">');

			var title = response.results[0].bills[i].title;
			var titleP = $('<p class="title">').text("Title: " + title);
			
			var introDate = response.results[0].bills[i].introduced_date;
			var introP = $('<p class="dates">').text("Introduction Date: " + introDate);
			
			var summary = response.results[0].bills[i].summary_short;
			var summaryP = $('<p class="summarySection">').text("Bill Summary: " + summary);

			var majorActionDate = response.results[0].bills[i].latest_major_action_date;
			var actionDateP = $('<p class="dates">').text("Latest Major Action Date: " + majorActionDate);

			var majorAction = response.results[0].bills[i].latest_major_action;
			var actionP = $('<p class="actions">').text("Latest Major Action: " + majorAction);
			

			billDiv.append(titleP);
			billDiv.append(introP);
			billDiv.append(summaryP);
			billDiv.append(actionDateP);
			billDiv.append(actionP);

			$('.bills').append(billDiv);
		}
	});
	console.log("test")
}
// Ajax code to pull data with the Congress API

$(document).on("click", ".searchClickMe", displayBill);


// iife to show senator's in 94116
!function (){

	// function showSenator() {
		var googleKey = "AIzaSyAAJXq0f3uIq0J7B-MOkGZz-uFAvZsBJcY";
		var address = "94116";
		var googleURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + googleKey + "&address=" + address;

		$.ajax({
			url: googleURL,
			method: "GET"
		}).done(function(representatives){
			console.log(representatives);
			for (var i = 2; i < 4; i++) {
					var senatorDiv = $('<div class="senateContainer">');

					var senatorName = representatives.officials[i].name;
					var senatorNameP = $('<p class="senatorName">').text("Senator Name: " + senatorName);

					var picture = representatives.officials[i].photoUrl;
					var senatorPic = $('<img class="senatorPic">');
					senatorPic.attr("src", picture);

					var party = representatives.officials[i].party;
					var partyP = $('<p>').text("Political Party: " + party);

					var phone = representatives.officials[i].phones[0];
					var phoneP = $('<p>').text("Phone Number: " + phone);

					var website = representatives.officials[i].urls[0];
					var websiteA = $('<p>website</p>');
					websiteA.attr('href', website);

					

					senatorDiv.append(senatorNameP);
					senatorDiv.append(senatorPic);
					senatorDiv.append(partyP);
					senatorDiv.append(phoneP);
					senatorDiv.append(website);

					$('.bills').append(senatorDiv);
				}
		});
	 // }
}();




