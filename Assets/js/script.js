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
//   const auth = firebase.auth();

  
//   const pw = $('#pw').val();

// let queryString = 
//'https://api.meetup.com/find/groups?zip=11211&radius=1&category=25&order=members&&sign=true'

// "https://secure.meetup.com/oauth2/authorize?client_id=40b5jegalp9o9b4470v1biqvdu&response_type=code" + 
// "&redirect_uri=http://127.0.0.1:5500/index.html"

// 'https://api.meetup.com/find/groups?zip=11211&radius=1&category=25&order=members'

// function getUrlParameter(name) {
//   name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
//   var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
//   var results = regex.exec(location.search);
//   return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
// };

// let queryURL = 'https://api.meetup.com/find/groups?zip=10021'

$('#push').on('click', function(){
  // console.log($('#name').val());
  const name = $('#name').val();
  const date = $('#date').val();
  const type = $('#type').val();
  const street = $('#street').val();
  const city = $('#city').val();
  const state = $('#state').val();
  const zip = $('#zip').val();
  // const lat = $('#lat').val();
  // const lon = $('#lon').val();
  dataRef.ref().push({
    name: name,
    date: date,
    type: type,
    street: street,
    city: city,
    state: state,
    zip: zip
    // lat: lat,
    // lon: lon
  });
});

dataRef.ref().on('child_added', function(snapshot){
  // console.log(snapshot.val());
  const queryString = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + snapshot.val().street + 
    "%2C%20" + snapshot.val().city + "%2C%20" + snapshot.val().state + "%20" + snapshot.val().zip + 
    ".json?access_token=pk.eyJ1Ijoiam9ucGtpbmciLCJhIjoiY2p4bW1kMjdsMDVkejNtcGF3azR6OWgyNSJ9.9PyL0KoB3385l1Se0xXz0g&cachebuster=1562436483413" + 
    "&autocomplete=true&types=address%2Cpostcode&limit=1"
  // "https://api.mapbox.com/geocoding/v5/mapbox.places/" 
  // + snapshot.val().street + " " + snapshot.val().city + " " + snapshot.val().state + " " + snapshot.val().zip + " " +
  // + "access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&cachebuster=1562436483413&autocomplete=true&types=address%2Cpostcode&limit=10"
  $.ajax({
    url: queryString,
    method: "GET"
  }).then(function(response){
    console.log(response);
  });
  const boardgameString = "https://www.boardgameatlas.com/api/search?name=" 
    + snapshot.val().type + "&client_id=SB1VGnDv7M";
  $.ajax({
    url: boardgameString,
    method: "GET"
  }).then(function(response){
    console.log(response);
  })
});
// let accessToken = getUrlParameter('code');

// if(accessToken != ""){
//   let queryURL = 'https://api.meetup.com/find/events?zip=10021' + '?access_token=' + accessToken
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response){
//     console.log(response);
//   })
//   // console.log(response);
// }
  