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
    $("#sign-in").empty()
    var signOutDiv = $('<div id="sign-out">')
    signOutDiv.html('<button id="sign-out">Sign Out</button>')
    $("#sign-in").append(signOutDiv)
    var navTab = $('<li id="myLibrary">')
    navTab.html('<a href="" class="disabled">My Tracked Bills</a>')
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
    $("#myLibrary").remove()
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

  $("#main-content").empty()

  var libraryDiv = $("<div id=library>")

  for (var i=0; i < myArray.length; i++){

    var p = $("<p>")
    var b = myArray[i]
    p.text(b)
    libraryDiv.append(p)
  }

  $("#main-content").append(libraryDiv)

}

$(document).on("click", "#sign-out", signOutOnClick)
$(document).on("click", ".searchClickMe", submitInterest)
$(document).on("click", "#myLibrary", showLibrary)



function userDataListener() {

  database.ref("userData/"+uid).on("value", snapShotArray, function(errorObject){ 
    console.log("The read failed: " + errorObject.code)

  });

}

function snapShotArray(snapshot) {
  myArray = snapshot.val().billArray
}