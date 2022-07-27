// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//create a base layer that holds both maps
let baseMaps = {
    Light: light,
    Dark: dark
};

// Create the map object with center and zoom level.
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [light]
});

//pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);


//accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/tanmelissa/Mapping_Earthquakes/Mapping_GeoJson_Points/majorAirports.json"

//grabbing out GeoJSON data
d3.json(airportData).then(function(data){
    console.log(data);
    //creating a GeoJSON layer with the retrieved data
    L.geoJSON(data, {
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2> <hr> <h3>Airport name: " + feature.properties.name + "</h3>")
        }
    }).addTo(map);
});
