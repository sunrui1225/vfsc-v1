// import Vue from 'vue'
// import CourseSelect from '@/components/CourseSelect/index.vue'
// import ExamSelect from '@/components/ExamSelect'
// export default {
//   install(value) {
//     console.log('xxxx注册')
//     Vue.component('CourseSelect', CourseSelect)
//     Vue.component('ExamSelect', ExamSelect)
//   }
// }
import Vue from 'vue'
const requireComponent = require.context('./', true, /\/index.vue$/)
export default {
  install() {
    requireComponent.keys().forEach(element => {
      // console.log('++++加载全局组件' + element)
      const name = element.replace(/(\.\/)|(\/index.vue)/gi, '')
      // console.log('++++注册全局组件：' + name)
      // 使用组件名进行注册组件
      Vue.component(name, requireComponent(element).default)
    })
  }
}

