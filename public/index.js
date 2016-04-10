import mapper from './map'
import Vue from 'vue'
// import App from './components/App.vue'
// import Home from './components/Home.vue'
// import Add from './components/Add.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import xhr from 'xhr'

Vue.use(VueRouter)
Vue.use(VueResource)

export var router = new VueRouter()

mapper()

new Vue({
  el: 'body',
  data: {
  	trout: {}
  },
  methods: {
  	getTroutData: function (evt) {
  		
		if(evt.srcElement.localName === 'circle') {
			var id = evt.srcElement.classList[1]
			xhr.get('http://localhost:3001/data/' + id, (err, data) => {
				this.trout = JSON.parse(data.body)
			})
		}  		
  	},
  	log: function () {
  		console.log(this.trout)
  	}
  }
})