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
    });

var arr  = []
var getLocation = e => arr.push({"x": e.x, "y": e.y})

document.querySelector('svg').addEventListener('click', getLocation)