<template>
  <p v-show="this.filtered.length > 0">{{ filtered | json }}</p>
  <h2>Years:</h2>
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
  <div class="inner-btn" @click="filterForYear">2016</div>
  <br>
  <h2>Time:</h2>
	<div class="inner-btn" @click="filterForTime">Morning</div>
	<div class="inner-btn" @click="filterForTime">Night</div>
  
  <h2>Angler:</h2>
  <input name="angler" type="text" v-model="angler">
  <div class="inner-btn" @click="filterByName">Submit Name</div>
  <br>
  <div class="btn" @click="showAll">All</div>
  <div class="btn" @click="reset">Reset</div>
	<div class="btn" @click="clearMap">Clear Map</div>

  <div class="filter-info-box">
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

	export default {
		ready: function () {
      this.$parent.trout.x = null
      this.collection = this.$parent.troutCollection
      this.reset()
      this.clearMap()
      map.turnOnZoom()
		},
		data: function() {
			return {
        angler: "",
				collection: [],
				filtered: [],
				unfiltered: []
			}		
		},
		methods: {
			filterForYear: function (evt) {
				var param = evt.target.innerHTML
        this.filtered.push(param)
				this.collection = this.collection.filter(trout => {
					if (trout.dateCaught)
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
            if (trout.timeCaught)
              return parseInt(trout.timeCaught.slice(0,2)) < 12
          })
				}
        else if (param === "Night") {
          this.filtered.push(param)
          this.collection = this.collection.filter(trout => {
            if (trout.timeCaught)
              return parseInt(trout.timeCaught.slice(0,2)) > 12})
        }
        this.clearMap()
        this.drawFilteredTrout()
			},
      filterByName: function () {
        this.filtered.push(this.angler)
        this.collection = this.collection.filter(trout => trout.angler === this.angler)
        this.clearMap()
        this.drawFilteredTrout()
      }
      ,
      reset: function () {
        this.filtered = []
        this.collection = this.$parent.troutCollection
      },
      showAll: function () {
        this.collection = this.$parent.troutCollection
        this.clearMap()
        this.drawFilteredTrout()
      },
			clearMap: map.clearMap,
			drawMarker: map.drawMarker,
			drawFilteredTrout: function () {			
				this.collection.forEach(this.drawMarker)
			}
		}
	}
</script>  	