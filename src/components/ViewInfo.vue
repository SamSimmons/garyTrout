<template>
	<div class="home-wrapper">
	<h1>View</h1>
		<h2>{{ $parent.trout | json }}</h2>
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
			this.$parent.getAllTroutData()
			this.clearMap()
			this.drawAllTrout()
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


  	