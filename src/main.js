import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css'
import './styles/element-variables.scss'
import './styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

// import './icons'
import './permission'
import './utils/error-log'

// 全局通用组件
import cmComponents from './components'
Vue.use(cmComponents)

// 业务定义组件
import viewComponents from './views'
Vue.use(viewComponents)

// 窗口切换检测
import visibility from 'vue-visibility-change'
Vue.use(visibility)



// 引入公共方法
import common from './utils/common'
Vue.use(common)

// 引入vue-UUID组件
import UUID from 'vue-uuid'
Vue.use(UUID)

// 消息提示
import msg from './utils/msg'
Vue.prototype.$msg = msg

// 页面打印
import Print from 'vue-print-nb'
Vue.use(Print)

// UI默认尺寸
Vue.use(Element, {
    size: Cookies.get('size') || 'medium'
})

// // 全局过滤器
// import * as filters from './filters'
// Object.keys(filters).forEach(key => {
//     Vue.filter(key, filters[key])
// })

// 禁止右键指令
Vue.directive('preventright', {
    bind: function(el, binding, vnode) {
        el.oncontextmenu = function() { return false }
    }
})

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

