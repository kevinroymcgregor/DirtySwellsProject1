const longitude = 51.505;
const latitude = -0.09;
const zoom = 13;
const eventArray = [
    {
        name: "name1",
        description: "desc1",
        game: "game2",
        latitude: "lat1",
        longitude: "long1"
    },
    {
        name: "name2",
        description: "desc2",
        game: "game2",
        latitude: "lat2",
        longitude: "long2"
    },
    {
        name: "name3",
        description: "desc3",
        game: "game3",
        latitude: "lat3",
        longitude: "long3"
    }
];

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
    for (let i = 0; i < eventArray.length; i++) {
        const col = $("<div class='col s3 m3'>");
        const card = $("<div class='card-panel teal white-text'>");
        card.append($("<span>").text(`Event Name: ${eventArray[0].name}`));
        card.append("<hr>");
        card.append("<span>" + "Event Description: " + eventArray[0].description + "</span>");
        card.append("<br>");
        card.append("<span>" + "Game Type: " + eventArray[0].game + "</span>");
        col.append(card)
        $(".cardLocation").append(col);
    }
}

// function to add new objects to eventArray using database data
function addEvent(eventName, eventDescription, eventGame, eventLatitude, eventLongitude) {
    event.preventDefault();
    const eventMeeting = {
        name: eventName,
        description: eventDescription,
        game: eventGame,
        latitude: eventLatitude,
        longitude: eventLongitude
    };
    eventArray.push(eventMeeting);
    createEventCards();
}

// function for search

// function for filter

// function to add data to database

// function to pull data from database

createMap(longitude, latitude, zoom);
$(document).on("click", '#addEvent', addEvent);