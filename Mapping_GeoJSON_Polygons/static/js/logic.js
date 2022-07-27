// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//create a base layer that holds both maps
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// Create the map object with center and zoom level.
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
});

//pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);


//accessing the Toronto airline routes GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/tanmelissa/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json"


//create a style for the lines
let myStyle = {
    color: "blue",
    weight: 1,
    fillColor: "#ffffa1"
};

//grabbing our GeoJSON data
d3.json(torontoHoods).then(function(data){
    console.log(data);
    //creating a GeoJSON layer with the retrieved data
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h3>Neighborhood: " + feature.properties.AREA_NAME + "</h3>")
        }
    }).addTo(map);
});
