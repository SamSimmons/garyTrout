<script>
import xhr from 'xhr'
import map from '../map'
import _ from 'lodash'

export default {
  ready: function () {
    xhr.get('/data', (err, data) => {
      if (err) { console.error(err)}
      else {
        this.troutCollection = JSON.parse(data.body)
        this.troutCollection.forEach(this.drawMarker)
      }
    })
  },
  data: function () {
    return {
      trout: {
        x: 0,
        y: 0,
        id: "",
        angler: "",
        weight: "",
        dateCaught: "",
        timeCaught: "",
        comment: "",
      },
      coordsSet: false,
      troutCollection: []
    }
  },
  methods: {
    getTroutInfo: function (evt) {
        if (evt.srcElement.localName === 'circle') {
          var id = evt.srcElement.classList[1]
          this.trout = _.find(this.troutCollection, ['id', id])
        }
    },
    getAllTroutData: function () {
      var that = this
      xhr.get('/data', (err, data) => {
        if (err) { console.error(err)}
        this.troutCollection = JSON.parse(data.body)
      })
    },
    turnOffAddListener: function () {
      d3.select('#rotoma').on('click', null)
    },
    setTroutData: function(xy) {
      this.trout.x = xy[0]
      this.trout.y = xy[1]
      this.drawMarker(this.trout)
    },
    drawMarker: map.drawMarker,
    clearMap: map.clearMap,
    drawAllTrout: function () {
      this.troutCollection.forEach(this.drawMarker)
    }
  }
}
</script>