// Variables to use the Propublica Congress API
function displayBill() {
	// removes previous bill data
	$(".bills").empty()
	window.that = this;
	//
	var topic = $(this).attr("data-label");

	var urlCongress = "https://api.propublica.org/congress/v1/bills/search.json?query=" + topic; 
	var apiKeyCongress = "wkEXsR0UlQgFmestVsn5LmX7oIygFk6ir1ej4Q8p";

	$.ajax({
	url: urlCongress,
	headers: {"X-API-Key": apiKeyCongress},
	method: "GET"
	}).done(function(response) {
		var amountBills = response.results[0].num_results;
		for (var i = 0; i < amountBills; i++) {
			var billDiv = $('<div class="billContainer">');

			var title = response.results[0].bills[i].title;
			var titleP = $('<p class="title">').text("Bill Title: " + title);
			
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
}
// Ajax code to pull data with the Congress API

$(document).on("click", ".click", displayBill);



//begin code for pulling from nonprofit API

/* Note: this code is not yet finished. I am having trouble with the API 
and have contacted Propublica (the website claims that you don't need a key, which sounds odd.)
I am waiting to hear back from them. I've written some of the code that 
will be needed once I have the API working, but have not completed it yet. */


function displayOrgs() {
	//clear info from previous selections
	$("#orgs").empty();

	//set variables and AJAX request
	var state = $(".dropdown").attr(".dropdown-menu");

	var urlOrgs = "https://projects.propublica.org/nonprofits/api/v2/search.json?q=" + state;
	
	$.ajax({
		url: urlOrgs,
		method: "GET"
	}).done(function(response) {
		var amountOrgs = response.results[0].num_results;

		for (var i = 0; i < amountOrgs; i++) {
			var orgsDiv = $('<div class="orgsContainer">');

			var orgName = response.results[0].orgs[i].name;
			var orgNameP = $('<p class="name">').text(orgName);
			
			var orgSubName = response.results[0].orgs[i].sub_name;
			var orgSubNameP = $('<p class="sub-name">').text(orgSubName);
			
			var orgAddress = response.results[0].orgs[i].address;
			var orgAddressP = $('<p class="address">').text(orgAddress);

			var orgCity = response.results[0].orgs[i].city;
			var orgState = response.results[0].orgs[i].state;
			var orgZip = response.results[0].orgs[i].zipcode
			var orgCityStateZipP = $('<p class="city-state-zip">').text(orgCity + ", " + orgState + " " + orgZip);

			var guidestar = response.results[0].orgs[i].guidestar_url;
			var guidestarP = $("<p class="guidestar">").text("Guidestar Profile: " + guidestar);
		};
	});

};

displayOrgs();

