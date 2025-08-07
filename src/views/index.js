import Vue from 'vue'
const requireComponent = require.context('./', true, /\/components\/(.*)\/index.vue$/)
export default {
  install() {
    requireComponent.keys().forEach(element => {
      // console.log('++++加载业务组件' + element)
      // 去除index.vue
      let name = element.replace(/(\.\/)|(\/index.vue)/gi, '')
      // 再次替换取最后目录
      name = name.replace(/(.*\/)/gi, '')
      // console.log('++++注册业务组件：' + name)
      // 使用组件名进行注册组件
      Vue.component(name, requireComponent(element).default)
    })
  }
}

