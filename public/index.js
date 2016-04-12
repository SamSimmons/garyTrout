import mapper from './map'
import Vue from 'vue'
// import App from './components/App.vue'
import Home from './components/Home.vue'
import Add from './components/Add.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import xhr from 'xhr'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.debug = true

mapper()

var coords
d3.select('#rotoma').on('click', function () {
  coords = d3.mouse(this)
})

var App = Vue.extend({
  data: function () {
    return {
      trout: {
        x: 0,
        y: 0,
        id: "",
        angler: "",
        time: "",
        day: "",
        month: "",
        year: "",
        lure: "",
        comment: "" 
      }
    }
  },
  methods: {
    getTroutData: function (evt) {      
      if (evt.srcElement.localName === 'circle') {
        var id = evt.srcElement.classList[1]
        xhr.get('http://localhost:3001/data/' + id, (err, data) => {
          this.trout = JSON.parse(data.body)
          console.log(this.trout)
        })
      }
    },
    log: function () {
      console.log(coords)
    },
    getCoords: function(evt) {
    },
    drawMarker: function(trout) {
      var map = d3.select('#rotoma')

      map.append("circle")
        .attr('class', 'marker-out ' + trout.id)
          .attr("cx", trout.x)
            .attr("cy", trout.y)
              .attr("r", 40)

      map.append("circle")
        .attr('class', 'marker ' + trout.id)
          .attr("cx", trout.x)
            .attr("cy", trout.y)
              .attr("r", 5);
    }
  }
})

var router = new VueRouter()
router.map({
    '/add': {
        component: Add
    },
    '/home': {
        component: Home
    }
})

router.start(App, 'body')