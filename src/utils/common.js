export default {
  install(Vue, options) {
    Vue.prototype.$navBack = function() {
      window.history.back()
    }

    Vue.prototype.$isDemo = process.env.VUE_APP_ENV === 'demo'

    Vue.prototype.$isDev = process.env.VUE_APP_ENV === 'development'
  }
}
