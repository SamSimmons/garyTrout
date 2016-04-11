<template>
	<div class="add-wrapper">
	<h1>Add</h1>
		<h2>{{ $parent.trout | json }}</h2>
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
	</div>
</template>

<script>
	export default {
		name: 'Add',
		data: function() {
			return {
				trout: {}
			}		
		}
	}
</script>

