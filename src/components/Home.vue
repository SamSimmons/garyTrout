<template>
	<div class="home-wrapper">
	<h1>View</h1>
		<h2>{{ $parent.trout | json }}</h2>
	</div>
</template>

<script>
	import xhr from 'xhr'

	export default {
		ready: function () {
			this.clearMap()
			this.drawAllTrout()
		},
		name: 'Home',
		data: function() {
			return {
				trout: {
					name: 'trouter',
					sizer: '2.2kg'
				}
			}		
		},
		methods: {
			drawAllTrout: function () {
				xhr.get('http://localhost:3001/data', (err, data) => {
				  if (err) { console.error(err)}
				  else {
				    var allTrout = JSON.parse(data.body)
				    allTrout.forEach( trout => this.drawMarker(trout))
				  }
				})
			},
			clearMap: function () {
				var map = d3.select('#rotoma')
				  .selectAll('circle').remove()
			},
			drawMarker: function (trout) {
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
		}
	}
</script>


  	