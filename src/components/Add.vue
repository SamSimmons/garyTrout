<template>
	<div class="add-wrapper">
	<p class='location-warning' v-if="!$parent.coordsSet">Click on the map to add the location of your trout</p>
		<div class="info-box" v-if="$parent.coordsSet">
			<label for="angler">Angler:</label>
			<input name="angler" type="text" v-model="trout.angler">
			<label for="weight">Weight(kg):</label>
			<input type="number" v-model="trout.weight">
			<label for="timeCaught">Time</label>
			<input name="timeCaught" type="text" value={{trout.timeCaught}}>
			<label for="date">Date</label>
			<input name="date" type="text" value={{trout.dateCaught}}>
			<label for="comment">Comment</label>
			<textarea name="comment" v-model="trout.comment"></textarea>
			<div class="btn submit" v-on:click="submit">Submit</div>
		</div>
	</div>
</template>

<script>
	import xhr from 'xhr'
	import map from '../map'

	//This component is in charge of adding new trout to the DB
	//TODO add left 0 padding to the time, it looks funny without the zeros
	//

	export default {
		ready: function () {
			this.setup()
			this.setupDThree()
		},
		name: 'Add',
		data: function() {
			return {
				trout: {
					x: 0,
					y: 0,
					id: "",
					angler: "",
					weight: "",
					dateCaught: "",
					timeCaught: "",
					comment: ""
				}
			}		
		},
		methods: {
			//that is required because going through d3 is required to use the coords
			//from the mouse event on the svg, however this steals the scope of "this" which is usually refers to the vue component.
			setupDThree: function () {
				var that = this
				d3.select('#rotoma').on('click', function() {
					var coords = d3.mouse(this)
				    that.trout.x = coords[0]
				    that.trout.y = coords[1]
				    that.drawMarker(that.trout)
				    that.$parent.coordsSet = true
				    d3.select('#rotoma').on('click', null)
				})
			},
			setup: function () {
				//resets the current trout to default values, autofills the time and date
				this.x = 0
				this.y = 0
				this.angler = ""
				this.weight = ""
				this.comment = ""
				this.trout.id = Date.now().toString()
				var d = new Date()
				this.trout.dateCaught = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
				this.trout.timeCaught = d.getHours() + ":" + d.getMinutes()
			},
			submit: function () {
				this.$parent.coordsSet = false
				this.updateDatabase()
				this.setup()
				this.setupDThree()
			},
			updateDatabase: function () {
				xhr.post('/add',{json: JSON.stringify(this.trout)},(err, res) => {
				  if(err) {
				    console.error(err)
				  }
				  this.$parent.troutCollection = res.body
				})
			},
			repaint: function () {
				this.clearMap()
				this.drawAllTrout()
			},
			drawMarker: map.drawMarker,
			clearMap: map.clearMap,
			drawAllTrout: map.drawAllTrout
		}
	}
</script>