import xhr from 'xhr'

module.exports = {
  //need to work out a way to set the scale based on device width and then use the scale to set the size of the markers etc
  create: function () {
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
  },
  drawMarker: function(trout) {
    console.log('drawing trout ---' + typeof trout)
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
  },
  clearMap: function () {
    var map = d3.select('#rotoma')
      .selectAll('circle').remove()
  },
  drawAllTrout: function () {
          xhr.get('/data', (err, data) => {
            if (err) { console.error(err)}
            else {
              var allTrout = JSON.parse(data.body)
              allTrout.forEach( trout => this.drawMarker(trout))
            }
          })
        }
}