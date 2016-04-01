var width = 960,
    height = 960;

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

  d3.json("lake.json", function(err, lake) {
   	if (err) return console.error(error);

   	var projection = d3.geo.mercator()
    	.center([176.58, -38.04])
        .scale(550000)
    
    svg.append("path")
      .datum(lake)
      .attr("d", d3.geo.path().projection(projection));

    var drawMarker = (trout) => {
      svg.append("circle")
        .attr('class', 'marker-out')
          .attr("cx", trout.x)
            .attr("cy", trout.y)
              .attr("r", 40)

      svg.append("circle")
        .attr('class', 'marker')
          .attr("cx", trout.x)
            .attr("cy", trout.y)
              .attr("r", 5);
    }
  var arr  = [{ x: 423, y: 399 }, { x: 493, y:526}, {x: 512, y:430}]

  svg.on('click', function() {
    var coords = d3.mouse(this);
    console.log(coords);
    arr.forEach( elt => drawMarker(elt))
    // drawMarker(coords[0], coords[1]);
  });
});

//will need a function for adding individual trout to db
var addTrout = () => {}

//will need a function for fetching information on a selected trout 
var fetchTrout = () => {}

//will need a function for drawing a new trout to map
var drawTrout = () => {}

//will need a function for drawing all selected trout to the map
var drawAllTrout = (arr) => {}