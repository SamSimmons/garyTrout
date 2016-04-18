<template>
	<div class="add-wrapper">
	<p class='location-warning' v-if="!$parent.coordsSet">Click on the map to add the location of your trout</p>
		<div class="info-box" v-if="$parent.coordsSet">
			<label for="angler">Angler:</label>
			<input name="angler" type="text" v-model="angler">
			<label for="weight">Weight(kg):</label>
			<input type="number" v-model="weight">
			<label for="timeCaught">Time</label>
			<input name="timeCaught" type="text" value={{timeCaught}}>
			<label for="date">Date</label>
			<input name="date" type="text" value={{dateCaught}}>
			<label for="comment">Comment</label>
			<textarea name="comment" v-model="comment"></textarea>
			<div class="btn submit" v-on:click="submit">Submit</div>
		</div>
	</div>
</template>

<script>
	import xhr from 'xhr'
	import map from '../map'

	export default {
		ready: function () {
			this.autofill()
			this.setup()
			this.setupDThree()
		},
		name: 'Add',
		data: function() {
			return {
				angler: "name",
				weight: '',
				lure: "",
				dateCaught: "",
				timeCaught: "",
				comment: ""
			}		
		},
		methods: {
			setupDThree: function () {
				var that = this
				d3.select('#rotoma').on('click', function() {
					var coords = d3.mouse(this)
				    that.$parent.trout.x = coords[0]
				    that.$parent.trout.y = coords[1]
				    that.drawMarker(that.$parent.trout)
				    that.$parent.coordsSet = true
				    d3.select('#rotoma').on('click', null)
				})
			},
			setup: function () {
				this.$parent.trout.id = Date.now().toString()
				this.$parent.trout.dateCaught = this.dateCaught
				this.$parent.trout.timeCaught = this.timeCaught
			},
			submit: function () {
				this.$parent.trout.angler = this.angler
				this.$parent.trout.lure = this.lure
				this.$parent.trout.comment = this.comment
				this.$parent.trout.weight = this.weight
				this.$parent.trout.dateCaught = this.dateCaught
				this.$parent.trout.timeCaught = this.timeCaught
				this.$parent.coordsSet = false
				this.updateDatabase()
				this.setupDThree()
			},
			autofill: function () {
				var d = new Date()
				this.dateCaught = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
				this.timeCaught = d.getHours() + ":" + d.getMinutes()
			},
			updateDatabase: function () {
				xhr.post('/add',{json: JSON.stringify(this.$parent.trout)},(err, res) => {
				  if(err) {
				    console.error(err)
				  }
				  this.$parent.troutCollection = res.body
				  // that.$parent.troutCollection = res.body
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