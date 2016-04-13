var mapper = function () {
  var xhr = require('xhr')

  //need to work out a way to set the scale based on device width and then use the scale to set the size of the markers etc
  var scale = 0;
  var width = 600,
      height = 600,
      scale0 = (width - 1) / 2 / Math.PI;

  //appends the map to the page
  var map = d3.select("#vis").append("svg")
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

  var drawMarker = (trout) => {
    var map = d3.select('#rotoma')

    map.append("circle")
      .attr('class', 'marker-out ' + trout.id)
        .attr("cx", trout.x)
          .attr("cy", trout.y)
            .attr("r", 40)

    map.append("circle")
      .attr('class', 'marker ' + trout.id)
        .attr("cx", trout.x)
          .attr("cy", trout.y)
            .attr("r", 5);
  }

  var clearMap = () => {
    var map = d3.select('#rotoma')
      .selectAll('circle').remove()
  }

  var removeSingleTrout = (id) => {
    xhr.post('http://localhost:3001/delete', {json: JSON.stringify(id) }, function() {
      clearMap()
      drawAllTrout()
    })
  }

  //will need a function for fetching information on a selected trout 
  var fetchTrout = () => {
    xhr.get('http://localhost:3001/data', (err, data) => {
      console.log(JSON.parse(data.body))  
    })
  }

  //error here i think
  var drawAllTrout = function (arr) {
    xhr.get('http://localhost:3001/data', (err, data) => {
      if (err) { console.error(err)}
      else {
        var allTrout = JSON.parse(data.body)
        allTrout.forEach( trout => drawMarker(trout))
      }
    })
  }

  var stripId = (classes) => {return classes.split(' ').splice(1).toString()}

  var turnOnDeleteMode = function () {
    map.on('click', null)
    d3.selectAll('circle')
      .on('click', function () {
        var circleClass = d3.select(this)
          .attr('class')
        var id = stripId(circleClass)
        removeSingleTrout(id)
      })
  }

  //remove one trout -- TODO markers need to have an id when they're created so they can be removed, and they need to be removed from the db
  document.querySelector('.edit-mode').addEventListener('click', turnOnDeleteMode)

  document.querySelector('.remove-all').addEventListener('click', function () {
    clearMap()    
  })

  document.querySelector('.add-all').addEventListener('click', function() {
    drawAllTrout()
  })
}

module.exports = mapper
