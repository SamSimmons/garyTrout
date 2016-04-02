//TODO refactor so all helper functions are in seperate modules
//look into making it responsive.

var width = 960,
    height = 960;

var arr  = []

var drawMarker = (trout, el) => {
  el.append("circle")
    .attr('class', 'marker-out')
      .attr("cx", trout.x)
        .attr("cy", trout.y)
          .attr("r", 40)

  el.append("circle")
    .attr('class', 'marker')
      .attr("cx", trout.x)
        .attr("cy", trout.y)
          .attr("r", 5);
}

//will need a function for adding individual trout to db
var addTrout = (coords) => {
  var newTrout = {
    x: coords[0],
    y: coords[1],
    id: Date.now(),
    angler: "",
    time: "",
    day: "",
    month: "",
    year: "",
    lure: "",
    comment: "" 
  }
  arr.push(newTrout)
  return newTrout
}

//will need a function for fetching information on a selected trout 
var fetchTrout = () => {}

//will need a function for drawing a new trout to map
var drawTrout = () => {}

//will need a function for drawing all selected trout to the map
var drawAllTrout = (arr) => {}


//appends the map to the page
var map = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)

  d3.json("lake.json", function(err, lake) {
    if (err) return console.error(error);

    var projection = d3.geo.mercator()
      .center([176.58, -38.04])
        .scale(550000)
    
    map.append("path")
      .datum(lake)
      .attr("d", d3.geo.path().projection(projection))

  map.on('click', function() {
    var coords = d3.mouse(this)
    var trout = addTrout(coords)
    drawMarker(trout, map)
  })


})