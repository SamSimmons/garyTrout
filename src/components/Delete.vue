<template>
	<div class="home-wrapper">
	<h1>Delete</h1>
		<p>Click on a trout marker to edit or delete</p>
		<h2 v-if="$parent.trout.x > 0">{{ $parent.trout | json }}</h2>
		<div class="btn">Edit</div>
		<div class="btn" v-on:click="delete" v-link="{path: '/home'}">Delete</div>
	</div>
</template>

<script>
	import xhr from 'xhr'
	import map from '../map'

	export default {
		ready: function () {
			this.clearMap()
			this.drawAllTrout()
		},
		name: 'Delete',
		methods: {
			delete: function () {
				console.log('delete this trout')
				this.$parent.coordsSet = false
				xhr.post('/delete', {json: JSON.stringify(this.$parent.trout.id) }, () => {
				  this.clearMap()
				  this.drawAllTrout()
				})
			},
			clearMap: map.clearMap,
			drawAllTrout: map.drawAllTrout,
			drawMarker: map.drawMarker
		},
		data: function() {
			return {
				trout: {}
			}		
		}
	}
</script>