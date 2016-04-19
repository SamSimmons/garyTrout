<template>
	<div class="home-wrapper">
		<p>Click on a trout marker to edit or delete</p>
		<div class="info-box">
			<label for="angler">Angler:</label>
			<input name="angler" type="text" v-model="$parent.trout.angler">
			<label for="weight">Weight(kg):</label>
			<input type="number" v-model="trout.weight">
			<label for="timeCaught">Time</label>
			<input name="timeCaught" type="text" v-model="trout.timeCaught" value={{trout.timeCaught}}>
			<label for="date">Date</label>
			<input name="date" type="text" v-model="trout.dateCaught" value={{trout.dateCaught}}>
			<label for="comment">Comment</label>
			<textarea name="comment" v-model="trout.comment"></textarea>
		</div>
		<div class="btn">Edit</div>
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
		},
		data: function() {
			return {
				trout: {}
			}		
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