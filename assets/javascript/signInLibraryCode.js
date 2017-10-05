var config = {
  apiKey: "AIzaSyB7rZu-R8DunMdMeAJiRJOl9kMtzKxzxAU",
  authDomain: "bill-seeker.firebaseapp.com",
  databaseURL: "https://bill-seeker.firebaseio.com",
  projectId: "bill-seeker",
  storageBucket: "bill-seeker.appspot.com",
  messagingSenderId: "554055940939"
};
firebase.initializeApp(config);

var uiConfig = {
  signInSuccessUrl: "index.html",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.EmailAuthProvider.PROVIDER_ID
    
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>'
};

database = firebase.database()

var uid
var myArray = []
var signedIn = false

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // $("#status").text("signed in, "+ user.displayName)
    $("#accountStatus").empty()
    var signOutDiv = $('<div id="sign-out" style="margin-top: -10px">')
    signOutDiv.html("<p>Sign Out</p>")
    $("#accountGreeting").html("<p>Hello, " + user.displayName + "!</p>")
    $("#accountStatus").append(signOutDiv)
    var navTab = $('<li id="myLibrary">')
    navTab.html('<a href="#" class="disabled">My Tracked Bills</a>')
    // navTab.text("My Tracked Bills")
    $("#nav-tab-list").append(navTab)
    // $("#account").html("Sign Out")


    uid = user.uid;
    userDataListener()


    // signedIn = true
    console.log(uid)
  } else {
    // Initialize the FirebaseUI Widget using Firebase.
    // The start method will wait until the DOM is loaded.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#sign-in', uiConfig);     
    $("#sign-out").empty()
    $("#accountStatus").text("Sign In")
    $("#accountGreeting").empty()
    $("#myLibrary").remove()
    $("#library").text("Oh no! You're signed out!")
    database.ref("userData/"+uid).off('value', snapShotArray)
    uid = undefined

  }
});


function signOutOnClick() {
  firebase.auth().signOut().then(function() {
    // $("#status").text("signed out")
    

  })
  signedIn = false
}

function submitInterest(event){
  event.preventDefault();

  //create a variable for the info submitted

  var clickedBill = $(this).attr("data-label")

  myArray.push(clickedBill)

  //push the info submitted into the database

  database.ref("userData/"+ uid).set({     
    billArray: myArray,
    uid: uid
    })

}

function showLibrary(){

  $("#middleCol").empty()

  billUri = $(this).attr("data-label")
  $("#middleCol").html("<h3>Things I care about!</h3>")

  var libraryDiv = $("<div id=library style='overflow:scroll'>")


  for (var i=0; i < myArray.length; i++){

    var apiKey = "wkEXsR0UlQgFmestVsn5LmX7oIygFk6ir1ej4Q8p";

    var url = myArray[i]

    $.ajax({
    url: url,
    headers: {"X-API-Key": apiKey},
    method: "GET"
    }).done(function(response) {
     
        console.log(response)
        

        var title = response.results[0].title;
        var something = response.results[0].congressdotgov_url
        var titleP = $("<h2>Bill Title: <a href="+something+">"+title+"</a></h2>")
        
        

        // var introDate = response.results[0].bills[i].introduced_date;
        // var introP = $('<p class="dates">').text("Introduction Date: " + introDate);
        
        var summary = response.results[0].summary_short;
        var summaryP = $('<p class="summarySection">').text("Bill Summary: " + summary);

        // var majorActionDate = response.results[0].bills[i].latest_major_action_date;
        // var actionDateP = $('<p class="dates">').text("Latest Major Action Date: " + majorActionDate);

        // var majorAction = response.results[0].bills[i].latest_major_action;
        // var actionP = $('<p class="actions">').text("Latest Major Action: " + majorAction);

        // // libBtn.attr('data-label', title)
        

        
        libraryDiv.append(titleP);
        libraryDiv.append(summaryP);
        // billDiv.append(summaryP);
        // billDiv.append(actionDateP);
        // billDiv.append(actionP);
        

        $("#library").append(libraryDiv);
      
    });
  }

  $("#middleCol").append(libraryDiv)

}

$(document).on("click", "#sign-out", signOutOnClick)
$(document).on("click", ".libBtn", submitInterest)
$(document).on("click", "#myLibrary", showLibrary)



function userDataListener() {

  database.ref("userData/"+uid).on("value", snapShotArray, function(errorObject){ 
    console.log("The read failed: " + errorObject.code)

  });

}

function snapShotArray(snapshot) {
  myArray = snapshot.val().billArray
}