<script>
import xhr from 'xhr'
import map from '../map'

export default {
  ready: function () {
    console.log('DEBUG control is App')
    this.clearMap()
    this.drawAllTrout()
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
      coordsSet: false
    }
  },
  methods: {
    getTroutData: function (evt) {
      if (evt.srcElement.localName === 'circle') {
        var id = evt.srcElement.classList[1]
        console.log('id looking for is: '+ id)
        xhr.get('/data/' + id, (err, data) => {
          this.trout = JSON.parse(data.body)
        })
      }
    },
    turnOffAddListener: function () {
      console.log('turn off listener')
      d3.select('#rotoma').on('click', null)
    },
    handleClick: function () {
    	console.log('listner is on')
      var that = this
      d3.select('#rotoma').on('click', function () {
        var coords = d3.mouse(this)
        that.trout.x = coords[0]
        that.trout.y = coords[1]
        that.drawMarker(that.trout)
        that.turnOffAddListener()
        that.coordsSet = true
      })
    },
    setTroutData: function(xy) {
      this.trout.x = xy[0]
      this.trout.y = xy[1]
      this.drawMarker(this.trout)
    },
    drawMarker: map.drawMarker,
    clearMap: map.clearMap,
    drawAllTrout: map.drawAllTrout
  }
}
</script>