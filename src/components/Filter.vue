<template>
	<div class="inner-btn" @click="filterFor">2008</div>

</template>

<script>
	import xhr from 'xhr'
	import map from '../map'

	export default {
		ready: function () {
			this.clearMap()
		},
		data: function() {
			return {
				collection: []
			}		
		},
		methods: {
    		filterFor: function (evt) {
    			var param = evt.target.innerHTML
    			this.collection = this.$parent.troutCollection.filter(trout => {
    				return trout.dateCaught.includes(param)
    			})
    			this.drawAllTrout
    		},
			clearMap: map.clearMap,
			drawMarker: map.drawMarker,
			drawAllTrout: function () {
			  this.collection.forEach(this.drawMarker)
			}
		}
	}
</script>


  	