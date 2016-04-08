import mapper from './map'
import Vue from 'vue'
// import App from './components/App.vue'
// import Home from './components/Home.vue'
// import Add from './components/Add.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

export var router = new VueRouter()

mapper()

new Vue({
  el: '#tasks',
  data: {
  	trout: [
  		{
  			name: "Gary Simmons",
  			date: '4/4/2015',
  			weight: 2.23,
  			length: 45
  		},
  		{
  			name: "Gary Simmons",
  			date: '19/8/2014',
  			weight: 2.20,
  			length: 43
  		},
  		{
  			name: "Jill Simmons",
  			date: '2/1/2013',
  			weight: 3.03,
  			length: 75
  		}

  	]
  }
})