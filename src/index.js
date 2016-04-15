import map from './map'
import Vue from 'vue'
import Home from './components/Home.vue'
import Add from './components/Add.vue'
import Delete from './components/Delete.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import xhr from 'xhr'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.debug = true

map.create()

console.log('change')

//TODO fix this dirty dirty global
var coords = []

var App = Vue.extend({
  data: function () {
    return {
      trout: {
        x: 0,
        y: 0,
        id: "",
        angler: "",
        dateCaught: "",
        timeCaught: "",
        lure: "",
        comment: "" 
      }
    }
  },
  methods: {
    getTroutData: function (evt) {      
      if (evt.srcElement.localName === 'circle') {
        var id = evt.srcElement.classList[1]
        xhr.get('/data/' + id, (err, data) => {
          this.trout = JSON.parse(data.body)
          console.log(this.trout)
        })
      }
    },
    turnOffAddListener: function () {
      console.log('turn off listener')
      d3.select('#rotoma').on('click', null)
    },
    handleClick: function () {
      var that = this
      d3.select('#rotoma').on('click', function () {
        coords = d3.mouse(this)
        that.setTroutData(coords)
      })
    },
    setTroutData: function(xy) {
      this.trout.x = xy[0]
      this.trout.y = xy[1]
      this.drawMarker(this.trout)
    },
    drawMarker: map.drawMarker
  }
})

var router = new VueRouter()
router.map({
    '/delete': {
      component: Delete
    },
    '/add': {
        component: Add
    },
    '/home': {
        component: Home
    }
})

router.start(App, 'body')