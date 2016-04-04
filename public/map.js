//need to work out a way to set the scale based on device width and then use the scale to set the size of the markers etc
var scale = 0;


var width = 600,
    height = 600;

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

var removeAllTrout = () => {
  var map = d3.select('#rotoma')
    .selectAll('circle').remove()
}

//will need a function for fetching information on a selected trout 
var fetchTrout = () => {}

//will need a function for drawing a new trout to map
var drawTrout = () => {}

//will need a function for drawing all selected trout to the map
var drawAllTrout = (arr) => {}


//appends the map to the page
var map = d3.select("body").append("svg")
  .attr('id', 'rotoma')
  .attr("width", width)
  .attr("height", height)

  d3.json("lake.json", function(err, lake) {
    if (err) return console.error(error);

    var offset = [width/2, height/2]

    var projection = d3.geo.mercator()
      .center(d3.geo.centroid(lake))
      .translate(offset)
        .scale(500000)
    
    map.append("path")
      .datum(lake)
      .attr("d", d3.geo.path().projection(projection))

  map.on('click', function() {
    var coords = d3.mouse(this)
    //trout is added to array here
    var trout = addTrout(coords)
    drawMarker(trout, map)
  })


//remove one trout -- TODO markers need to have an id when they're created so they can be removed, and they need to be removed from the db
  document.querySelector('.edit-mode').addEventListener('click', function () {
    map.on('click', null)
     document.querySelector('.marker').addEventListener('click', (e) => {
      //need
      e.target.remove()
     })
  })

  document.querySelector('.add-all').addEventListener('click', function () {
    arr.forEach((trout) => {
      drawMarker(trout, map)
    })
  })

  document.querySelector('.remove-all').addEventListener('click', function () {
    removeAllTrout()    
  })
})