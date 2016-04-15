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
		name: 'Home',
		data: function() {
			return {
				trout: {
					name: 'trouter',
					sizer: '2.2kg'
				}
			}		
		},
		methods: {
			drawAllTrout: function () {
				xhr.get('http://localhost:3001/data', (err, data) => {
				  if (err) { console.error(err)}
				  else {
				    var allTrout = JSON.parse(data.body)
				    allTrout.forEach( trout => this.drawMarker(trout))
				  }
				})
			},
			clearMap: map.clearMap,
			drawMarker: map.drawMarker
		}
	}
</script>


  	