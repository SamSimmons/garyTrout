<template>
	<div class="add-wrapper">
	<p class='location-warning' v-if="!$parent.coordsSet">Click on the map to add the location of your trout</p>
		<div class="info-box" v-if="$parent.coordsSet">
			<label for="angler">Angler:</label>
			<input name="angler" type="text" v-model="angler">
			<label for="lure">Lure:</label>
			<input type="text" v-model="lure">
			<label for="weight">Weight(kg):</label>
			<input type="number" v-model="weight">
			<label for="timeCaught">Time</label>
			<input name="timeCaught" type="text" value={{timeCaught}}>
			<label for="date">Date</label>
			<input name="date" type="text" value={{dateCaught}}>
			<label for="comment">Comment</label>
			<textarea name="comment" v-model="comment"></textarea>
			<div class="btn submit" v-on:click="submit" v-link="{path: '/home'}">Submit</div>
		</div>
	</div>
</template>

<script>
	import xhr from 'xhr'

	export default {
		ready: function () {
			this.autofill()
			this.setup()
		},
		name: 'Add',
		data: function() {
			return {
				angler: "name",
				weight: '',
				lure: "default",
				dateCaught: "",
				timeCaught: "",
				comment: "default"
			}		
		},
		methods: {
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
				xhr.post('/add',{json: JSON.stringify(this.$parent.trout)}, (err, data) => {
				  if(err) {
				    console.error(err)
				  }
				  this.$parent.coordsSet = false
				})
			},
			autofill: function () {
				var d = new Date()
				this.dateCaught = d.getDay() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
				this.timeCaught = d.getHours() + ":" + d.getMinutes()
			}
		}
	}
</script>