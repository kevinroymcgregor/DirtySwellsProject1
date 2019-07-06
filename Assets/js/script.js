const longitude = 51.505;
const latitude = -0.09;
const zoom = 13;

const config = {
    apiKey: "AIzaSyC6qpXOXBf2vixbC6YTlN6ihu8i9h9OkW8",
    authDomain: "gamr-13304.firebaseapp.com",
    databaseURL: "https://gamr-13304.firebaseio.com",
    projectId: "gamr-13304",
    storageBucket: "gamr-13304.appspot.com",
    messagingSenderId: "629746508175",
    appId: "1:629746508175:web:f78d2c9edbb66f2f"
  };

  firebase.initializeApp(config);

  const dataRef = firebase.database();

$('#push').on('click', function(){
  // console.log($('#name').val());
  const name = $('#name').val();
  const desc = $('#desc').val();
  const date = $('#date').val();
  const type = $('#type').val();
  const street = $('#street').val();
  const city = $('#city').val();
  const state = $('#state').val();
  const zip = $('#zip').val();
  dataRef.ref().push({
    name: name,
    desc: desc,
    date: date,
    type: type,
    street: street,
    city: city,
    state: state,
    zip: zip
  });
});

dataRef.ref().on('child_added', function(snapshot){
  // console.log(snapshot.val());
  let name;
  let date;
  let description;
  let game;
  let lat;
  let long;


  const queryString = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + snapshot.val().street + 
    "%2C%20" + snapshot.val().city + "%2C%20" + snapshot.val().state + "%20" + snapshot.val().zip + 
    ".json?access_token=pk.eyJ1Ijoiam9ucGtpbmciLCJhIjoiY2p4bW1kMjdsMDVkejNtcGF3azR6OWgyNSJ9.9PyL0KoB3385l1Se0xXz0g&cachebuster=1562436483413" + 
    "&autocomplete=true&types=address%2Cpostcode&limit=1"
  $.ajax({
    url: queryString,
    method: "GET"
  }).then(function(response){
    console.log(response);
    console.log(response.features[0].center);
    lat = response.features[0].center[1];
    long = response.features[0].center[0];
  });

  name = snapshot.val().name;
  date = snapshot.val().date;
  description = snapshot.val().desc;
  game = snapshot.val().type;

  createEventCards();

  const boardgameString = "https://www.boardgameatlas.com/api/search?name=" 
    + snapshot.val().type + "&client_id=SB1VGnDv7M";
  $.ajax({
    url: boardgameString,
    method: "GET"
  }).then(function(response){
    console.log(response);
  })

});

// const eventArray = [
//     {
//         name: "name1",
//         date: "date1",
//         description: "desc1",
//         game: "game2",
//         latitude: "lat1",
//         longitude: "long1"
//     },
//     {
//         name: "name2",
//         date: "date2",
//         description: "desc2",
//         game: "game2",
//         latitude: "lat2",
//         longitude: "long2"
//     },
//     {
//         name: "name3",
//         date: "date3",
//         description: "desc3",
//         game: "game3",
//         latitude: "lat3",
//         longitude: "long3"
//     }
// ];

// TO DO: add pin functionality to map, add multiple pins so that each event drops a pin on the same map

function createMap(longitude, latitude, zoom) {
    const mymap = L.map('mapDiv').setView([longitude, latitude], zoom);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoiam9ucGtpbmciLCJhIjoiY2p4bW1kMjdsMDVkejNtcGF3azR6OWgyNSJ9.9PyL0KoB3385l1Se0xXz0g'
    }).addTo(mymap);
}
// function for dynamic card generation
function createEventCards() {
    $(".cardLocation").empty();
    const col = $("<div class='col s3 m3'>");
    const card = $("<div class='card-panel teal white-text'>");
    card.append($("<span>").text(`Event Name: ${name}`));
    card.append("<hr>");
    card.append("<span>" + "Event Date: " + date + "</span>");
    card.append("<br>");
    card.append("<span>" + "Event Description: " + description + "</span>");
    card.append("<br>");
    card.append("<span>" + "Game Type: " + game + "</span>");
    col.append(card)
    $(".cardLocation").append(col);
}

// function createEventCards() {
//     $(".cardLocation").empty();
//     for (let i = 0; i < eventArray.length; i++) {
//         const col = $("<div class='col s3 m3'>");
//         const card = $("<div class='card-panel teal white-text'>");
//         card.append($("<span>").text(`Event Name: ${eventArray[i].name}`));
//         card.append("<hr>");
//         card.append("<span>" + "Event Date: " + eventArray[i].date + "</span>");
//         card.append("<br>");
//         card.append("<span>" + "Event Description: " + eventArray[i].description + "</span>");
//         card.append("<br>");
//         card.append("<span>" + "Game Type: " + eventArray[i].game + "</span>");
//         col.append(card)
//         $(".cardLocation").append(col);
//     }
// }

// function to add new objects to eventArray using database data
// function addEvent(eventName, eventDate, eventDescription, eventGame, eventLatitude, eventLongitude) {
//     event.preventDefault();
//     const eventMeeting = {
//         name: eventName,
//         date: eventDate,
//         description: eventDescription,
//         game: eventGame,
//         latitude: eventLatitude,
//         longitude: eventLongitude
//     };
//     eventArray.push(eventMeeting);
//     createEventCards();
// }

// function addEvent() {
//     event.preventDefault();
//     const eventMeeting = {
//         name: $("#eventNameInput").val().trim(),
//         date: $("#eventDateInput").val().trim(),
//         description: $("#eventDescriptionInput").val().trim(),
//         game: $("#eventGameInput").val().trim(),
//         // latitude: $("eventLatitudeInput").val().trim(),
//         // longitude: $("eventLongitudeInput").val().trim()
//     };
//     eventArray.push(eventMeeting);
//     createEventCards();
// }

createMap(longitude, latitude, zoom);
$(document).on("click", '#addEvent', addEvent);
