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
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
    
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
    $("#nav-tab-list").prepend(navTab)
    // $("#account").html("Sign Out")


    uid = user.uid;
    userDataListener()


    signedIn = true
    // console.log(uid)
  } else {
    // Initialize the FirebaseUI Widget using Firebase.
    // The start method will wait until the DOM is loaded.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#sign-in', uiConfig);     
    $("#sign-out").empty()
    $("#accountStatus").text("Sign In")
    $("#accountGreeting").empty()
    $("#myLibrary").remove()
    $("#innerMid").text("Oh no! You're signed out!")
    database.ref("userData/"+uid).off('value', snapShotArray)
    uid = undefined
    signedIn = false

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

  if (signedIn === true) {
  //create a variable for the data label clicked

  var clickedBill = $(this).attr("data-label")

  myArray.push(clickedBill)

  //push the info submitted into the database

  database.ref("userData/"+ uid).set({     
    billArray: myArray,
    uid: uid
    })
  } else {
    $("#message").show()
    setTimeout(function() {
      $("#message").hide()
    }, 2000)

  }
}

function showLibrary(){

  $("#middleCol").empty()

  // billUri = $(this).attr("data-label")
  $("#middleCol").html("<h3>Bills I'm tracking:</h3><div id='innerMid' style='overflow:scroll; height:700px'; overflow-x:'hidden'></div>")

  


  for (var i=0; i < myArray.length; i++){

    var apiKey = "wkEXsR0UlQgFmestVsn5LmX7oIygFk6ir1ej4Q8p";

    var url = myArray[i]

    $.ajax({
    url: url,
    headers: {"X-API-Key": apiKey},
    method: "GET"
    }).done(function(response) {
     
        
        var libraryDiv = $("<div id=library class='billContainer'>")

        var title = response.results[0].title;
        var something = response.results[0].congressdotgov_url
        var titleP = $("<h3>Title: <a href="+something+">"+title+"</a></h3>")
        
        var removeButton = $("<button class='remove' data-label=" + url + "><span class='glyphicon glyphicon-remove'></span></button>")

        
        var summary = response.results[0].summary_short;
        
        libraryDiv.prepend(titleP);
        
        if (summary.length > 0) {
        var summaryP = $('<p class="summarySection">').text("Bill Summary: " + summary);
        libraryDiv.append(summaryP);
        }
        
        libraryDiv.prepend(removeButton)

        $("#library").prepend(libraryDiv);
        $("#innerMid").prepend(libraryDiv)
      
    });
  }

  

}

$(document).on("click", "#sign-out", signOutOnClick)
$(document).on("click", ".libBtn", submitInterest)
$(document).on("click", "#myLibrary", showLibrary)
$(document).on("click", ".remove", removeFromLibrary)


function removeFromLibrary (){
  var billURI = $(this).attr("data-label")
  // console.log(billURI)
  var index = myArray.indexOf(billURI);

  if (index > -1) {
    myArray.splice(index, 1);
  }

  // console.log(myArray)
  //push the info submitted into the database

  database.ref("userData/"+ uid).set({     
    billArray: myArray,
    uid: uid
    })

  showLibrary()
}

function userDataListener() {

  database.ref("userData/"+uid).on("value", snapShotArray, function(errorObject){ 
    console.log("The read failed: " + errorObject.code)

  });

}

function snapShotArray(snapshot) {
  if (snapshot.val().billArray === undefined) {
    myArray = []

  }else {
    myArray = snapshot.val().billArray
  }
}