<template>
	<div class="add-wrapper">
	<h1>Add</h1>
		<div class="btn" v-on:click="autofill">--autofill time stuff--</div>
		<p>Angler: {{ angler }}</p>
		<input type="text" v-model="angler">
		<p>Lure: {{ lure }}</p>
		<input type="text" v-model="lure">
		<p>Time</p>
		<input type="text">
		<p>Date</p>
		<input type="text">
		<p>Comment</p>
		<textarea></textarea>
		<div class="btn submit" v-on:click="submit">Submit</div>
	</div>
</template>

<script>
	export default {
		name: 'Add',
		data: function() {
			return {
				angler: "",
				lure: "",
				dateCaught: ""
			}		
		},
		methods: {
			submit: function () {
				this.$parent.trout.id = Date.now()
				this.$parent.trout.angler = this.angler
				this.$parent.dateCaught = this.dateCaught
				console.log(this.$parent.trout)
			},
			autofill: function () {
				var d = new Date()
				console.log(d)
				this.time = d.getHours() + ":" + d.getMinutes()
				this.day = d.getDay()
				this.month = d.getMonth()
				this.year = d.getFullYear()
			}
		}
	}
</script>


time: "",
day: "",
month: "",
year: "",
