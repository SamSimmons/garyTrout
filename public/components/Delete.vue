<template>
	<div class="home-wrapper">
	<h1>Delete</h1>
		<p>Click on a trout marker to edit or delete</p>
		<h2>{{ $parent.trout | json }}</h2>
		<div class="btn">Edit</div>
		<div class="btn" v-on:click="delete">Delete</div>
	</div>
</template>

<script>
	import xhr from 'xhr'

	export default {
		ready: function () {
			this.clearMap()
			this.drawAllTrout()
		},
		name: 'Delete',
		methods: {
			delete: function () {
				console.log('delete this trout')
				xhr.post('http://localhost:3001/delete', {json: JSON.stringify(this.$parent.trout.id) }, () => {
				  this.clearMap()
				  this.drawAllTrout()
				})
			},
			clearMap: function () {
				var map = d3.select('#rotoma')
				  .selectAll('circle').remove()
			},
			drawAllTrout: function () {
				xhr.get('http://localhost:3001/data', (err, data) => {
				  if (err) { console.error(err)}
				  else {
				    var allTrout = JSON.parse(data.body)
				    allTrout.forEach( trout => this.drawMarker(trout))
				  }
				})
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
		},
		data: function() {
			return {
				trout: {}
			}		
		}
	}
</script>