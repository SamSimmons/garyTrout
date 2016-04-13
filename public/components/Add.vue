<template>
	<div class="add-wrapper">
	<h1>Add</h1>
		<div class="btn" v-on:click="autofill">--autofill time stuff--</div>
		<p>Angler: {{ angler }}</p>
		<input type="text" v-model="angler">
		<p>Lure: {{ lure }}</p>
		<input type="text" v-model="lure">
		<p>Time</p>
		<input type="text" value={{timeCaught}}>
		<p>Date</p>
		<input type="text" value={{dateCaught}}>
		<p>Comment</p>
		<textarea v-model="comment"></textarea>
		<div class="btn submit" v-on:click="submit">Submit</div>
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
				angler: "",
				lure: "",
				dateCaught: "",
				timeCaught: "",
				comment: ""
			}		
		},
		methods: {
			setup: function () {
				this.$parent.trout.id = Date.now()
				this.$parent.trout.dateCaught = this.dateCaught
				this.$parent.trout.timeCaught = this.timeCaught
			},
			submit: function () {
				this.$parent.trout.angler = this.angler
				this.$parent.trout.lure = this.lure
				this.$parent.trout.comment = this.comment
				xhr.post('http://localhost:3001/add',{json: JSON.stringify(this.$parent.trout)}, (err, data) => {
				  if(err) {
				    console.error(err)
				  }
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