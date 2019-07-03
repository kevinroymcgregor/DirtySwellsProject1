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

createMap(longitude, latitude, zoom);