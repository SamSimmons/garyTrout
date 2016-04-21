<template>
	<div class="home-wrapper">
		<p>Click on a trout marker to review and delete</p>
		<div class="info-box">
			<p v-show="$parent.trout.x > 0">Caught by: {{ $parent.trout.angler }}</p>
			<p v-show="$parent.trout.dateCaught">Date: {{ $parent.trout.dateCaught }}</p>
			<p v-show="$parent.trout.timeCaught">Time: {{ $parent.trout.timeCaught }}</p>
			<p v-show="$parent.trout.weight > 0">Weight: {{ $parent.trout.weight }}KG</p>
			<p v-show="$parent.trout.comment">{{ $parent.trout.comment }}</p>
		</div>
		<div class="btn" v-on:click="delete">Delete</div>
	</div>
</template>

<script>
	import xhr from 'xhr'
	import map from '../map'

	export default {
		ready: function () {
			this.$parent.getAllTroutData()
			this.trout = this.$parent.trout
			this.clearMap()
			this.drawAllTrout()
			map.turnOnZoom()
		},
		data: function() {
			return {
				trout: {}
			}		
		},
		name: 'Delete',
		methods: {
			delete: function () {
				this.$parent.coordsSet = false
				xhr.post('/delete', {json: JSON.stringify(this.$parent.trout.id)},(err, res) => {
					this.$parent.troutCollection = res.body
					this.repaint()
				})
			},
			getTroutInfo: function (evt) {
			  if (evt.srcElement.localName === 'circle') {
			    var id = evt.srcElement.classList[1]
			    this.trout = _.find(this.troutCollection, ['id', id])
			  }
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