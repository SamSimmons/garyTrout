<template>
	<div class="home-wrapper">
	<h1>Your Selected Trout</h1>
	<div class="info-box">
		<p v-show="$parent.trout.x > 0">Caught by: {{ $parent.trout.angler }}</p>
		<p v-show="$parent.trout.dateCaught">Date: {{ $parent.trout.dateCaught }}</p>
		<p v-show="$parent.trout.timeCaught">Time: {{ $parent.trout.timeCaught }}</p>
		<p v-show="$parent.trout.weight > 0">Weight: {{ $parent.trout.weight }}KG</p>
		<p v-show="$parent.trout.comment">{{ $parent.trout.comment }}</p>
	</div>
</template>

<script>
	import xhr from 'xhr'
	import map from '../map'
//----------------------------------------------------------------------------
// currently a stub component, will be built out more when the styling is done, and there is more information to display on each trout
//--------------------------------------------------------------------------------
	export default {
		ready: function () {
			this.collection = this.$parent.troutCollection
			this.clearMap()
			this.drawAllTrout()
			map.turnOnZoom()
		},
		data: function() {
			return {
				trout: {}
			}		
		},
		methods: {
			drawAllTrout: function () {
      			this.$parent.troutCollection.forEach(this.drawMarker)
    		},
			clearMap: map.clearMap,
			drawMarker: map.drawMarker
		}
	}
</script>


  	