import Vue from 'vue'
import DemoApp from './DemoApp.vue'

let app = new Vue({ render: (h) => h(DemoApp) })

app.$mount('#app')
