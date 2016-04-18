<template>
	<div class="home-wrapper">
	<h1>View</h1>
		<h2>{{ $parent.trout | json }}</h2>
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
		data: function() {
			return {
				trout: {}
			}		
		},
		methods: {
			drawAllTrout: map.drawAllTrout,
			clearMap: map.clearMap,
			drawMarker: map.drawMarker
		}
	}
</script>


  	