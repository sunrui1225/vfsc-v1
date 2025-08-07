import { MessageBox } from 'element-ui'

/**
 * 消息提示封装
 * @param vue
 * @param title
 * @param msgList
 * @returns {Promise<unknown>}
 */
const confirm = function(vue, title, msgList, input) {
  return new Promise((resolve, reject) => {
    const h = vue.$createElement
    const list = []
    for (let i = 0; i<msgList.length; i++) {
      list[i] = h('div', { style: 'color: #FF5A33' }, msgList[i])
    }

    list.unshift(h('div', { style: 'font-weight: 700; margin-bottom: 5px' }, title))

    MessageBox({
      showInput: !!input,
      title: '确认信息',
      message: h('p', null, list),
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      beforeClose: (action, instance, done) => {
        console.log('instance', instance)


        if (action === 'confirm') {
          if (input && input !== instance.inputValue) {
            vue.$message.error('请输入：【' + input + '】来确认操作！')
            return
          }
          resolve()
        }
        done()
      }
    })
  })
}

export default {
  confirm
}
