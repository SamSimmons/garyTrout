//need to work out a way to set the scale based on device width and then use the scale to set the size of the markers etc
var scale = 0;


var width = 600,
    height = 600,
    scale0 = (width - 1) / 2 / Math.PI;

// var zoom = d3.behavior.zoom()
//     .translate([width / 2, height / 2])
//     .scale(scale0)
//     .scaleExtent([scale0, 8 * scale0])
//     .on("zoom", zoomed);

var arr  = []

var drawMarker = (trout, el) => {
  el.append("circle")
    .attr('class', 'marker-out ' + trout.id)

      .attr("cx", trout.x)
        .attr("cy", trout.y)
          .attr("r", 40)

  el.append("circle")
    .attr('class', 'marker ' + trout.id)

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

var clearMap = () => {
  var map = d3.select('#rotoma')
    .selectAll('circle').remove()
}

var removeSingleTrout = (domElt) => {
  //arr = arr.filter()
  clearMap()
  drawAllTrout(arr)

}

//will need a function for fetching information on a selected trout 
var fetchTrout = () => {}

//will need a function for drawing a new trout to map
var drawTrout = () => {}

//will need a function for drawing all selected trout to the map
var drawAllTrout = () => {
  arr.forEach( (trout) => {
    drawMarker(trout, map)
  })
}


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
  })



//remove one trout -- TODO markers need to have an id when they're created so they can be removed, and they need to be removed from the db
document.querySelector('.edit-mode').addEventListener('click', function () {
  map.on('click', null)
  d3.selectAll('circle')
    .on('click', function () {
      var id = d3.select(this)
        .attr('class')
//-----------------------------------------------------working here pass this id to remove function
      id
    })


})
document.querySelector('.remove-all').addEventListener('click', function () {
  clearMap()    
})

document.querySelector('.add-single').addEventListener('click', function() {
  map.on('click', function() {
    var coords = d3.mouse(this)
    //trout is added to array here
    var trout = addTrout(coords)
    drawMarker(trout, map)
  })
})

document.querySelector('.add-all').addEventListener('click', function() {
  drawAllTrout()
})


