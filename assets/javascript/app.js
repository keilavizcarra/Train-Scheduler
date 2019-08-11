$(document).ready(function () {

    const firebaseConfig = {
        apiKey: "AIzaSyD6yJ9lLoShHfdIMQd4KeunTxUi7NQ-wmU",
        authDomain: "train-scheduler-28c46.firebaseapp.com",
        databaseURL: "https://train-scheduler-28c46.firebaseio.com",
        projectId: "train-scheduler-28c46",
        storageBucket: "",
        messagingSenderId: "634500321721",
        appId: "1:634500321721:web:a4d14cfbb6dee6ed"
      };
  
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  // Button Click
  $("#searchTrain").on("click", function (event) {
    event.preventDefault();
        
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var freq = $("#frequency").val().trim();
    
       
        database.ref().push({
          trainName: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: freq
        });
      });

      database.ref().on("child_added", function (childSnapshot) {

        var newTrain = childSnapshot.val().trainName;
        var newLocation = childSnapshot.val().destination;
        var newFirstTrain = childSnapshot.val().firstTrain;
        var newFreq = childSnapshot.val().frequency;
    
       
        var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(startTimeConverted), "minutes");
        var tRemainder = diffTime % newFreq;
        var tMinutesTillTrain = newFreq - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var catchTrain = moment(nextTrain).format("HH:mm");
    
        
        $("#all-display").append(
          ' <tr><td>' + newTrain +
          ' </td><td>' + newLocation +
          ' </td><td>' + newFreq +
          ' </td><td>' + catchTrain +
          ' </td><td>' + tMinutesTillTrain + ' </td></tr>');

 });
}); 
