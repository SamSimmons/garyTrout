import Vue from 'vue'
import App from './components/App.vue'
import Home from './components/Home.vue'
import Add from './components/Add.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

export var router = new VueRouter()

router.map({
	'/home' : {
		component: Home
	},
	'/add' : {
		component: Add
	}
})

router.redirect({
	'*': '/home'
})

router.start(App, '#app')

new Vue({
  el: '#app',
  data: {}
})