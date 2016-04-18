<template>
	<div class="home-wrapper">
	<h1>Delete</h1>
		<p>Click on a trout marker to edit or delete</p>
		<h2 v-if="$parent.trout">{{ $parent.trout | json }}</h2>
<!-- 		<div class="btn">Edit</div> -->
		<div class="btn" v-on:click="delete">Delete</div>
	</div>
</template>

<script>
	import xhr from 'xhr'
	import map from '../map'

	export default {
		ready: function () {
			this.$parent.getAllTroutData()
			this.clearMap()
			this.drawAllTrout()
		},
		name: 'Delete',
		methods: {
			delete: function () {
				console.log('delete')
				this.$parent.coordsSet = false
				xhr.post('/delete', {json: JSON.stringify(this.$parent.trout.id)},(err, res) => {
					this.$parent.troutCollection = res.body
					this.repaint()
				})
			},
			repaint: function () {
				this.clearMap()
				this.drawAllTrout()
			},
			clearMap: map.clearMap,
			drawAllTrout: function () {this.$parent.troutCollection.forEach(this.drawMarker)},
			drawMarker: map.drawMarker
		},
		data: function() {
			return {
				trout: {}
			}		
		}
	}
</script>