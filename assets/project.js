// Variables to use the Propublica Congress API
function displayBill() {
	// removes previous bill data
	$(".bills").empty()
	window.that = this;
	//
	var topic = $(this).attr("data-name");

	var urlCongress = "https://api.propublica.org/congress/v1/bills/search.json?query=" + topic; 
	var apiKeyCongress = "wkEXsR0UlQgFmestVsn5LmX7oIygFk6ir1ej4Q8p";

	$.ajax({
	url: urlCongress,
	headers: {"X-API-Key": apiKeyCongress},
	method: "GET"
	}).done(function(response) {
		var amountBills = response.results[0].num_results;
		for (var i = 0; i < amountBills; i++) {
			var billDiv = $('<div>');

			var title = response.results[0].bills[i].title;
			var titleP = $('<p>').text("Bill Title: " + title);
			
			var introDate = response.results[0].bills[i].introduced_date;
			var introP = $('<p>').text("Introduction Date: " + introDate);
			
			var summary = response.results[0].bills[i].summary_short;
			var summaryP = $('<p>').text("Bill Summary: " + summary);

			var majorActionDate = response.results[0].bills[i].latest_major_action_date;
			var actionDateP = $('<p>').text("Latest Major Action Date: " + majorActionDate);

			var majorAction = response.results[0].bills[i].latest_major_action;
			var actionP = $('<p>').text("Latest Major Action: " + majorAction);

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
$(document).on("click", ".btn", displayBill);