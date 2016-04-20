import xhr from 'xhr'

module.exports = {
  //need to work out a way to set the scale based on device width and then use the scale to set the size of the markers etc
  create: function () {
    var width = 600,
        height = 600;

    //appends the map to the page
    var map = d3.select("#vis").append("svg")
      .attr('id', 'rotoma')
      .attr("width", width)
      .attr("height", height)
        .append("g")
          .attr("class", "grouping")

      d3.json("lake.json", function(err, lake) {
        if (err) return console.error(error);

        var offset = [width/2, height/2]

        var projection = d3.geo.mercator()
          .center(d3.geo.centroid(lake))
          .translate(offset)
          .scale(500000)
        
        d3.select('.grouping')
          .append("path")
          .datum(lake)
          .attr("d", d3.geo.path().projection(projection))
      })
  },
  destroy: function() {
    d3.select('#rotoma').remove()
  },
  turnOnZoom: function () {
    d3.select('#rotoma').call(d3.behavior.zoom().on("zoom", function () {
      d3.select('#rotoma g').attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
    }))
  },
  turnOffZoom: function () {
    d3.select('#rotoma').call(d3.behavior.zoom(), null)
  },
  drawMarker: function(trout) {
    var map = d3.select('.grouping')

    map.append("circle")
      .attr('class', 'marker-out ' + trout.id)
      .attr("cx", trout.x)
      .attr("cy", trout.y)
      .attr("r", 15)

    map.append("circle")
      .attr('class', 'marker ' + trout.id)
      .attr("cx", trout.x)
      .attr("cy", trout.y)
      .attr("r", 2);
  },
  clearMap: function () {
    var map = d3.select('#rotoma')
      .selectAll('circle').remove()
  },
  drawAllTrout: function (arr) {
      arr.forEach(drawMarker)
  },
}
