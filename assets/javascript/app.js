
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD1Vt0F1oVmMN0E_fmDfbLzm3Vjr6cpyGM",
    authDomain: "train-homework-gt2018.firebaseapp.com",
    databaseURL: "https://train-homework-gt2018.firebaseio.com",
    projectId: "train-homework-gt2018",
    storageBucket: "train-homework-gt2018.appspot.com",
    messagingSenderId: "438175546984"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var trainName = '';
var destination = '';
var firstTrain = 0;
var frequency = 0;

// Adds train info on submit
$("#add-train").on("click", function(event){
    event.preventDefault();
    console.log("click");

    // grabs users input
    trainName = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // creates temporary object for info
    var newTrain = {
        name: trainName,
        destination: destination,
        time: firstTrain,
        frequency: frequency
    };

    // sends info to database
    database.ref().push(newTrain);

    // clears form for more input 
    $("#train-input").val('');
    $("#destination-input").val('');
    $("#time-input").val('');
    $("#frequency-input").val('');

});

// firebase event for adding info to the database
database.ref().on("child_added", function (snapshot){
    console.log(snapshot.val());

    // stores snapshots into variables
    trainName = snapshot.val().name;
    destination = snapshot.val().destination;
    firstTrain = snapshot.val().time;
    frequency = snapshot.val().frequency;

    // Subtract 1 yr so that this always comes before the current time
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted);

    // Get / log current time 
    var currentTime = moment();
    console.log("CURRENT TIME " + moment(currentTime).format("hh:mm"));

    // Get / log difference between current time and first train time 
    var timeDifference = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("Time Difference: " + timeDifference);

    var timeRemainder = timeDifference % frequency;
    console.log(timeRemainder);

    // get / log minutes until the next train
    var minutesAway = frequency - timeRemainder;
    console.log("Minutes until next train: " + minutesAway);

    // next train
    var upcomingTrain = moment().add(minutesAway, "minutes");
    console.log("Arriving at: " + moment(upcomingTrain).format("hh:mm"));

    var nextArrival = moment(upcomingTrain).format("hh:mm");


    

    // add trains to table 
    $("#train-schedule").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});



// Code this app to calculate when the next train will arrive; this should be relative to the current time.
// Users from many different machines must be able to view same train times.
// Styling and theme are completely up to you. Get Creative!