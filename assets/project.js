// Variables to use the Propublica Congress API
function displayBill() {
	// removes previous bill data
	$("#bills").empty()
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
		console.log(response.results[0].bills[0].title);
			// title
			// summary_short
			// introduced_date
			// latest_major_action_date
			// latest_major_action
});
}
// Ajax code to pull data with the Congress API
$(document).on("click", ".btn", displayBill);