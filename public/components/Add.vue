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
		<div class="btn submit">Add</div>
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
		methods: {}
	}
</script>

