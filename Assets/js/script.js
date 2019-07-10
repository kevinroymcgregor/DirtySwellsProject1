var elem = document.querySelector('.collapsible.expandable');
var instance = M.Collapsible.init(elem, {
    accordion: false
});

const config = {
<<<<<<< HEAD
  apiKey: "AIzaSyC6qpXOXBf2vixbC6YTlN6ihu8i9h9OkW8",
  authDomain: "gamr-13304.firebaseapp.com",
  databaseURL: "https://gamr-13304.firebaseio.com",
  projectId: "gamr-13304",
  storageBucket: "gamr-13304.appspot.com",
  messagingSenderId: "629746508175",
  appId: "1:629746508175:web:f78d2c9edbb66f2f"
=======
    apiKey: "AIzaSyC6qpXOXBf2vixbC6YTlN6ihu8i9h9OkW8",
    authDomain: "gamr-13304.firebaseapp.com",
    databaseURL: "https://gamr-13304.firebaseio.com",
    projectId: "gamr-13304",
    storageBucket: "gamr-13304.appspot.com",
    messagingSenderId: "629746508175",
    appId: "1:629746508175:web:f78d2c9edbb66f2f"
>>>>>>> a431d2d87e12c97dc8ff1f5c2266e86c33100df5
};

firebase.initializeApp(config);

const dataRef = firebase.database();

<<<<<<< HEAD
$('#push').on('click', function (event) {
  // console.log($('#name').val());
  event.preventDefault();

  const name = $('#name').val();
  const desc = $('#desc').val();
  const date = $('#date').val();
  const type = $('#type').val();
  const street = $('#street').val();
  const city = $('#city').val();
  const state = $('#state').val();
  const zip = $('#zip').val();
  let lat;
  let long;
  const queryString = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + snapshot.val().street +
    "%2C%20" + snapshot.val().city + "%2C%20" + snapshot.val().state + "%20" + snapshot.val().zip +
    ".json?access_token=pk.eyJ1Ijoiam9ucGtpbmciLCJhIjoiY2p4bW1kMjdsMDVkejNtcGF3azR6OWgyNSJ9.9PyL0KoB3385l1Se0xXz0g&cachebuster=1562436483413" +
    "&autocomplete=true&types=address%2Cpostcode&limit=1"
  $.ajax({
    url: queryString,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    console.log(response.features[0].center);
    lat = response.features[0].center[1];
    long = response.features[0].center[0];
  });
  if (zip > 1000 && zip < 99999) {
    dataRef.ref().push({
      name: name,
      desc: desc,
      date: date,
      type: type,
      street: street,
      city: city,
      state: state,
      zip: zip,
      lat: lat,
      long: long
    })
  };
});

dataRef.ref().on('child_added', function (snapshot) {
  // console.log(snapshot.val());
  let name;
  let date;
  let description;
  let game;
  // let lat;
  // let long;


  // const queryString = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + snapshot.val().street + 
  //   "%2C%20" + snapshot.val().city + "%2C%20" + snapshot.val().state + "%20" + snapshot.val().zip + 
  //   ".json?access_token=pk.eyJ1Ijoiam9ucGtpbmciLCJhIjoiY2p4bW1kMjdsMDVkejNtcGF3azR6OWgyNSJ9.9PyL0KoB3385l1Se0xXz0g&cachebuster=1562436483413" + 
  //   "&autocomplete=true&types=address%2Cpostcode&limit=1"
  // $.ajax({
  //   url: queryString,
  //   method: "GET"
  // }).then(function(response){
  //   console.log(response);
  //   console.log(response.features[0].center);
  //   lat = response.features[0].center[1];
  //   long = response.features[0].center[0];
  // });

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
  }).then(function (response) {
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
=======
// create map on page
const mymap = L.map('mapDiv').setView([33.348942153835495, -111.84857939835639], 10);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoiam9ucGtpbmciLCJhIjoiY2p4bW1kMjdsMDVkejNtcGF3azR6OWgyNSJ9.9PyL0KoB3385l1Se0xXz0g'
}).addTo(mymap);

dataRef.ref().on('child_added', function (snapshot) {
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
    }).then(function (response) {
        console.log(response);
        console.log(response.features[0].center);
        lat = response.features[0].center[1];
        long = response.features[0].center[0];
    });

    name = snapshot.val().name;
    date = snapshot.val().date;
    description = snapshot.val().desc;
    game = snapshot.val().type;

    createEventLists(name, date, description, game);
    addMapPin(long, lat, name, date);

    const boardgameString = "https://www.boardgameatlas.com/api/search?name="
        + snapshot.val().type + "&client_id=SB1VGnDv7M";
    $.ajax({
        url: boardgameString,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })

});

// add a pin to the map
function addMapPin(longitude, latitude, name, date) {
    const marker = L.marker([33.3, -111.8]).addTo(mymap);
    marker.bindPopup("<h5>" + name + "</h5><hr><p>" + date + "</p>").openPopup();
}
>>>>>>> a431d2d87e12c97dc8ff1f5c2266e86c33100df5

// add event to firebase from form on page
function addEvent() {
    event.preventDefault();
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
}

// function for dynamic event list generation
function createEventLists(name, date, description, game) {
    const listItem = $("<li>");
    const listDivHeader = $("<div class='collapsible-header'>" + name + "</div>");
    const listDivBody = $("<div class='collapsible-body'><span>" + description + "</span></div>");
    listDivBody.append($("<br>"));
    listDivBody.append($("<span>").text(`Event Date: ${date}`));
    listDivBody.append($("<br>"));
    listDivBody.append($("<span>").text(`Event Game: ${game}`));
    listItem.append(listDivHeader);
    listItem.append(listDivBody);
    $("#listLocation").append(listItem);
}

$(document).on("click", '#addEvent', addEvent);