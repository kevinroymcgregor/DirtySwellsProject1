const longitude = 51.505;
const latitude = -0.09;
const zoom = 13;

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
function createEventCard() {
    $(".cardLocation").append("<div class='col s3 m3 eventColumn'></div>");
    $(".eventColumn").append("<div class='card-panel teal eventCard'>TEST</div>");
    // $(".eventCard").append("<span class='white-text'>TEST</span>");
}

// todo - create array to pull from to create cards, create functions below

// function for search

// function for filter

// function to add data to database

// function to pull data from database

createMap(longitude, latitude, zoom);
$(document).on("click", '#addEvent', createEventCard);