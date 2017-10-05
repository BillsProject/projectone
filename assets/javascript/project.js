function displayBill() {

	// congress API key
	var apiKeyCongress = "wkEXsR0UlQgFmestVsn5LmX7oIygFk6ir1ej4Q8p";

	// removes previous bill data
	$("#middleCol").empty()
	window.that = this;
	//

	$(".searchClickMe").removeClass("current");               
    $(this).addClass("current");


	var topic = $(this).attr("data-label");

	var endPointBills = "https://api.propublica.org/congress/v1/bills/search.json?query=" + topic; 
	

	$.ajax({
	url: endPointBills,
	headers: {"X-API-Key": apiKeyCongress},
	method: "GET"
	}).done(function(response) {
		var amountBills = response.results[0].num_results;
		for (var i = 0; i < 5; i++) {
			var billDiv = $('<div class="billContainer">');

			var libBtn =$('<button type="button" class="libBtn"><span class="glyphicon glyphicon-bookmark"></span>')
			libBtn.attr('data-toggle', 'tooltip');
			libBtn.attr('data-placement', 'right');
			libBtn.attr('title', 'Add to Library');
			libBtn.attr('data-label', response.results[0].bills[i].bill_uri)
			billDiv.append(libBtn);

			var title = response.results[0].bills[i].title;
			var titleP = $('<p class="title" data-type="tooltip">').text("Bill Title: " + title);
			billDiv.append(titleP);
			
			var introDate = response.results[0].bills[i].introduced_date;
			var introP = $('<p class="dates">').text("Introduction Date: " + introDate);
			billDiv.append(introP);
			
			var summary = response.results[0].bills[i].summary_short;
			if (summary.length > 0) {
				var summaryP = $('<p class="summarySection">').text("Bill Summary: " + summary);
				billDiv.append(summaryP);
			}

			var majorActionDate = response.results[0].bills[i].latest_major_action_date;
			var actionDateP = $('<p class="dates">').text("Latest Major Action Date: " + majorActionDate);
			billDiv.append(actionDateP);

			var majorAction = response.results[0].bills[i].latest_major_action;
			var actionP = $('<p class="actions">').text("Latest Major Action: " + majorAction);
			billDiv.append(actionP);
			
			
			$('#middleCol').append(billDiv);
		}
	});
}

function showRep() {
	// var address = prompt("Enter your address to find your congress representatives");
	var address = "";


	var street = $("#street-input").val().trim();
  	var city = $("#city-input").val().trim();
  	var state = $("#state-input").val().trim();
  	var zip = $("#zip-input").val().trim();

  	address = street + " " + city + " " + state + " " + zip;



	var googleKey = "AIzaSyAAJXq0f3uIq0J7B-MOkGZz-uFAvZsBJcY";
	var googleURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + googleKey + "&address=" + address;


	$.ajax({
		url: googleURL,
		method: "GET"
	}).done(function(representatives){
		console.log(representatives);
		for (var i = 2; i < 5; i++) {
				var senatorDiv = $('<div class="senateContainer">');
				var senatorName = representatives.officials[i].name;

				if (i < 4) {
					var senatorNameP = $('<p class="senatorName">').text("Senator Name: " + senatorName);
					
				} else {
					var senatorNameP = $('<p class="senatorName">').text("Representative Name: " + senatorName);
				}
				
				var picture = representatives.officials[i].photoUrl;
				var senatorPic = $('<img class="senatorPic">');
				senatorPic.attr("src", picture);

				var party = representatives.officials[i].party;
				var partyP = $('<p>').text("Political Party: " + party);

				var phone = representatives.officials[i].phones[0];
				var phoneP = $('<p>').text("Phone Number: " + phone);

				senatorDiv.append(senatorNameP);
				senatorDiv.append(senatorPic);
				senatorDiv.append(partyP);
				senatorDiv.append(phoneP);
				// senatorDiv.append($("<hr>"));
				// senatorDiv.append(website);

				$('#middleCol').append(senatorDiv);
			}
	});
 };

function repSearch() {
	 	$("#middleCol").empty()

	 	var addressForm = $("<div id='addForm'>");

	 	var searchHeader = "Enter your address to find you Congress Representatives";
	 	var searchh3 = $('<h4 id="enter">').text(searchHeader); 

	 	var searchAddress = "Street Address";
	 	var addessh4 = $('<h5>').text(searchAddress).append($('<div>')).append($('<input id="street-input">')); 

	 	var searchCity = "City";
	 	var cityh4 = $('<h5>').text(searchCity).append($('<div>')).append($('<input id="city-input">'));

	 	var searchState = "State";
	 	var stateh4 = $('<h5>').text(searchState).append($('<div>')).append($('<input id="state-input">'));

	 	var searchZip = "Zip";
	 	var ziph4 = $('<h5>').text(searchZip).append($('<div>')).append($('<input id="zip-input">'));

	 	var searchButton = $('<button id="submitAdd">').text('Submit');

	 	addressForm.append(searchh3).append(addessh4).append(cityh4).append(stateh4).append(ziph4).append(searchButton);

	 	$('#middleCol').append(addressForm);
}

$(document).on("click", ".searchClickMe", displayBill);

$(document).on("click", "#contactRep", repSearch);

$(document).on("click", "#submitAdd", showRep);

