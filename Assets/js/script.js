$(document).ready(function () {
    $('.modal').modal();
});

var elem = document.querySelector('.collapsible.expandable');
var instance = M.Collapsible.init(elem, {
    accordion: false
});
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

// create map on page
const mymap = L.map('mapDiv').setView([33.348942153835495, -111.84857939835639], 10);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZ2FtZWtpbmczMTQiLCJhIjoiY2p4eTQ0eHR2MDZkNjNjbHQxMG1vZGl3YiJ9.KvEGNREjNS12RUEqFehhkw'
}).addTo(mymap);
dataRef.ref().on('child_added', function (snapshot) {
    let name;
    let date;
    let description;
    let game;
    let lat;
    let long;
    let m;
    name = snapshot.val().name;
    date = snapshot.val().date;
    description = snapshot.val().desc;
    game = snapshot.val().type;
    lat = snapshot.val().lat;
    long = snapshot.val().long;
    const boardgameString = "https://www.boardgameatlas.com/api/search?name="
        + snapshot.val().type + "&client_id=SB1VGnDv7M";
    $.ajax({
        url: boardgameString,
        method: "GET"
    }).then(function (response) {

        // name, description, min players, max players, min play time, max play time, picture, 
        let gameName = response.games[0].name;
        let gameDesc = response.games[0].description;
        let gameMinPlayers = response.games[0].min_players;
        let gameMaxPlayers = response.games[0].max_players;
        let gameMinPlayTime = response.games[0].min_playtime;
        let gameMaxPlayTime = response.games[0].max_playtime;
        let gamePic = response.games[0].images.small;
        createEventLists(name, date, description, game, gameName, gameDesc, gameMinPlayers, gameMaxPlayers, gameMinPlayTime, gameMaxPlayTime, gamePic);
    });
    addMapPin(long, lat, name, date);
});
// add a pin to the map
function addMapPin(longitude, latitude, name, date) {
    const marker = L.marker([latitude, longitude]).addTo(mymap);
    marker.bindPopup("<h5>" + name + "</h5><hr><p>" + date + "</p>").openPopup();
}
function resetLabels() {
    $('#zipLabel').empty().append('Zip Code');
    $('#zipLabel').attr('class', '');
    $('#zip').attr('class', 'white-text');

    $('#dateLabel').empty().append('Event Date');
    $('#dateLabel').attr('class', '');
    $('#date').attr('class', 'white-text');

    $('#nameLabel').empty().append('Event Name');
    $('#nameLabel').attr('class', '');
    $('#name').attr('class', 'white-text');

    $('#descLabel').empty().append('Description');
    $('#descLabel').attr('class', '');
    $('#desc').attr('class', 'white-text');

    $('#typeLabel').empty().append('Game to be Played');
    $('#typeLabel').attr('class', '');
    $('#type').attr('class', 'white-text');

    $('#streetLabel').empty().append('Street Address');
    $('#streetLabel').attr('class', '');
    $('#street').attr('class', 'white-text');

    $('#cityLabel').empty().append('City');
    $('#cityLabel').attr('class', '');
    $('#city').attr('class', 'white-text');

    $('#stateLabel').empty().append('State');
    $('#stateLabel').attr('class', '');
    $('#state').attr('class', 'white-text');
}
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
    const m = moment(date);
    const queryString = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + street +
        "%2C%20" + city + "%2C%20" + state + "%20" + zip +
        ".json?access_token=pk.eyJ1IjoiZ2FtZWtpbmczMTQiLCJhIjoiY2p4eTQ0eHR2MDZkNjNjbHQxMG1vZGl3YiJ9.KvEGNREjNS12RUEqFehhkw&cachebuster=1562436483413" +
        "&autocomplete=true&types=address%2Cpostcode&limit=1"
    if (zip > 501 && zip < 99950 && m.isValid() === true && name != ''
        && desc != '' && type != '' && street != '' && city != '') {
        resetLabels();
        $.ajax({
            url: queryString,
            method: "GET"
        }).then(function (response) {
            const latitude = response.features[0].center[1];
            const longitude = response.features[0].center[0];
            dataRef.ref().push({
                name: name,
                desc: desc,
                date: date,
                type: type,
                street: street,
                city: city,
                state: state,
                zip: zip,
                lat: latitude,
                long: longitude
            });
        })
    }
    else if (zip < 501 || zip > 99950) {
        $('#zipLabel').empty().append('Zip Code - Invalid Zip');
        $('#zipLabel').attr('class', 'red-text');
        $('#zip').attr('class', 'red-text');
    }
    else if (!m.isValid()) {
        $('#dateLabel').empty().append('Event Date - Invalid Date');
        $('#dateLabel').attr('class', 'red-text');
        $('#date').attr('class', 'red-text');
    }
    else if (name === '') {
        $('#nameLabel').empty().append('Event Name - Please enter a name');
        $('#nameLabel').attr('class', 'red-text');
        $('#name').attr('class', 'red-text');
    }
    else if (desc === '') {
        $('#descLabel').empty().append('Description - Please enter a description');
        $('#descLabel').attr('class', 'red-text');
        $('#desc').attr('class', 'red-text');
    }
    else if (type === '') {
        $('#typeLabel').empty().append('Game to be Played - Please enter a game');
        $('#typeLabel').attr('class', 'red-text');
        $('#type').attr('class', 'red-text');
    }
    else if (street === '') {
        $('#streetLabel').empty().append('Street Address - Please enter an address');
        $('#streetLabel').attr('class', 'red-text');
        $('#street').attr('class', 'red-text');
    }
    else if (city === '') {
        $('#cityLabel').empty().append('City - Please enter a city');
        $('#cityLabel').attr('class', 'red-text');
        $('#city').attr('class', 'red-text');
    }
    else if (state === '') {
        $('#stateLabel').empty().append('State - Please enter a state');
        $('#stateLabel').attr('class', 'red-text');
        $('#state').attr('class', 'red-text');
    }
}
// function for dynamic event list generation
function createEventLists(name, date, description, game, gameName, gameDesc,
    gameMinPlayers, gameMaxPlayers, gameMinPlayTime, gameMaxPlayTime, gamePic) {
    // modal creation
    const mod = $(`<div class="modal" id="modal${game}">`);
    const modContent = $('<div class="modal-content">');

    // modal content
    modContent.append(`<img src=${gamePic}>
        <h4>${gameName}</h4>
        <p>Players: ${gameMinPlayers} - ${gameMaxPlayers}</p>
        <p>Playtime (minutes): ${gameMinPlayTime} - ${gameMaxPlayTime}</p>
        <p>Description: ${gameDesc}</p>`);
    const modFooter = $('<div class="modal-footer">');
    modFooter.append('<a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>');
    $(mod).append(modContent);
    $(mod).append(modFooter);
    $('body').append(mod);
    $('.modal').modal();

    // list creation and content
    const listItem = $("<li>");
    const listDivHeader = $("<div class='collapsible-header' id='events-header'>" + name + "</div>");
    const listDivBody = $("<div class='collapsible-body'><span>Event Date: " + date + "</span></div>");
    listDivBody.append($("<br>"));
    listDivBody.append($("<span>").text(`Game being played: ${game}`));
    // listDivBody.append($("<br>"));
    listDivBody.append($("<br>"));
    // listDivBody.append($("<br>"));
    listDivBody.append($("<span>").text(`${description}`));
    listDivBody.append($("<br>"));
    // listDivBody.append($("<br>"));
    listItem.append(listDivHeader);
    listItem.append(listDivBody);
    $("#listLocation").append(listItem);
    listDivBody.append($('<button>').text('Game Details').attr('data-target', `modal${game}`).attr('class', "btn modal-trigger waves-effect").attr('id', 'info-btn'));
  }
  
  function resetForm() {
    event.preventDefault();
    resetLabels();
    document.getElementById("myForm").reset();
}

$(document).on("click", '#addEvent', addEvent);
$(document).on("click", '#resetForm', resetForm);