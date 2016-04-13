<template>
	<div class="add-wrapper">
		<div class="info-box">
			<label for="angler">Angler:</label>
			<input name="angler" type="text" v-model="angler">
			<label for="lure">Lure:</label>
			<input type="text" v-model="lure">
			<label for="timeCaught">Time</label>
			<input name="timeCaught" type="text" value={{timeCaught}}>
			<label for="date">Date</label>
			<input name="date" type="text" value={{dateCaught}}>
			<label for="comment">Comment</label>
			<textarea name="comment" v-model="comment"></textarea>
			<div class="btn submit" v-on:click="submit">Submit</div>
		</div>
		<div class="trout-info">
			<p>{{ angler }}</p>
			<p>{{ lure }}</p>
			<p>{{ dateCaught}}</p>
			<p>{{ timeCaught}}</p>
			<p>{{ comment }}</p>
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
				lure: "default",
				dateCaught: "",
				timeCaught: "",
				comment: "default"
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