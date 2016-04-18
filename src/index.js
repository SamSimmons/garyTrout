import map from './map'
import Vue from 'vue'
import ViewInfo from './components/ViewInfo.vue'
import Add from './components/Add.vue'
import Delete from './components/Delete.vue'
import App from './components/App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import xhr from 'xhr'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.debug = true

map.create()

var router = new VueRouter()
router.map({
    '/delete': {
      component: Delete
    },
    '/add': {
        component: Add
    },
    '/view': {
        component: ViewInfo
    }
})

router.start(App, 'body')