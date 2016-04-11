<template>
	<div class="add-wrapper">
	<h1>Add</h1>
		<p>Angler</p>
		<input type="text">
		<p>Lure</p>
		<input type="text">
		<p>Time</p>
		<input type="text">
		<p>Date</p>
		<input type="text">
		<p>Comment</p>
		<textarea></textarea>
		<div v-on:click="submit" class="btn">Add</div>
	</div>
</template>

<script>
	export default {
		name: 'Add',
		data: function() {
			return {
				trout: {}
			}		
		},
		methods: {
			addTrout: function (evt) {
				console.log(d3.mouse(this))
				// var newTrout = {
				//   x: coords[0],
				//   y: coords[1],
				//   id: Date.now(),
				//   angler: "delete",
				//   time: "",
				//   day: "",
				//   month: "",
				//   year: "",
				//   lure: "",
				//   comment: "" 
				// }
			},
			submit: function () {
					// xhr.post('http://localhost:3001/add',{json: JSON.stringify(newTrout)}, (err, data) => {
					//   if(err) {
					//     console.error(err)
					//   }
					// })
			}
		}
	}
</script>

