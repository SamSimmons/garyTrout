<template>
  <div v-show="filtered.length > 0">{{ filtered | json }}</div>
  <p v-show="$parent.trout.x > 0">{{ $parent.trout | json }}</p>
	<div class="inner-btn" @click="filterForYear">2005</div>
	<div class="inner-btn" @click="filterForYear">2006</div>
	<div class="inner-btn" @click="filterForYear">2007</div>
	<div class="inner-btn" @click="filterForYear">2008</div>
	<div class="inner-btn" @click="filterForYear">2009</div>
	<div class="inner-btn" @click="filterForYear">2010</div>
	<div class="inner-btn" @click="filterForYear">2011</div>
	<div class="inner-btn" @click="filterForYear">2012</div>
	<div class="inner-btn" @click="filterForYear">2013</div>
	<div class="inner-btn" @click="filterForYear">2014</div>
	<div class="inner-btn" @click="filterForYear">2015</div>
	<div class="inner-btn" @click="filterForTime">Morning</div>
	<div class="inner-btn" @click="filterForTime">Night</div>

  <div class="btn" @click="reset">Reset</div>
	<div class="btn" @click="clearMap">Clear Map</div>

</template>

<script>
	import xhr from 'xhr'
	import map from '../map'

	export default {
		ready: function () {
			this.clearMap()
      this.reset()
		},
		data: function() {
			return {
				collection: [],
				filtered: [],
				unfiltered: []
			}		
		},
		methods: {
			filterForYear: function (evt) {
				var param = evt.target.innerHTML
				this.collection = this.$parent.troutCollection.filter(trout => {
					return trout.dateCaught.includes(param)
				})
        this.clearMap()
				this.drawFilteredTrout()
			},
			filterForTime: function (evt) {
				var param = evt.target.innerHTML
				if (param === "Morning") {
          this.filtered.push(param)
					this.collection = this.collection.filter(trout => {
            console.log('comparing', (trout.timeCaught.slice(0,2)), 12)
            return parseInt(trout.timeCaught.slice(0,2)) < 12
          })
				}
        else if (param === "Night") {
          this.filtered.push(param)
          this.collection = this.collection.filter(trout => parseInt(trout.timeCaught.slice(0,2)) > 12)
        }
        console.log('repaint')
        this.clearMap()
        this.drawFilteredTrout()
			},
      reset: function () {
        this.filtered = []
        this.collection = this.$parent.troutCollection
      },
			clearMap: map.clearMap,
			drawMarker: map.drawMarker,
			drawFilteredTrout: function () {			
				this.collection.forEach(this.drawMarker)
			}
		}
	}
</script>  	