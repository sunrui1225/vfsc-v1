import axios from 'axios'
import { Notification, Loading } from 'element-ui'
import store from '../store'
import { getToken } from './auth'

// 请求实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000
})

// 请求前置过滤器
instance.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应数据拦截并做通用处理
instance.interceptors.response.use(
  response => {
    const res = response.data

    // 下载文件直接返回
    if (res.type === 'application/octet-stream') {
      return response
    }

    if (res.type === 'application/vnd.ms-excel') {
      return response
    }

    // 非正常标准的数据，可能是第三方接口，直接返回响应
    if (res.code == null) {
      return response
    }

    // 0为正确响应码
    if (res.code !== 0) {
      Notification.error({
        title: '提示信息',
        message: res.msg || '服务器开小差了呢！'
      })

      // 登录超时响应码
      if (res.code === 10010002) {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      }

      // 业务错误，返回错误码
      return Promise.reject(new Error(res.code))
    } else {
      return res
    }
  },
  error => {
    // 错误响应
    const response = error.response

    // 网络不通畅的情况
    if (error.name === 'Error' && response === undefined) {
      Notification.error({
        title: '提示信息',
        message: '服务器无法连接或无法响应！'
      })

      return Promise.reject(error)
    }

    // 502网络不通
    if (response.status === 502) {
      Notification.error({
        title: '提示信息',
        message: '无法连接到服务器。'
      })

      return Promise.reject(error)
    }

    // 500服务器错误
    if (response.status === 500) {
      Notification.error({
        title: '提示信息',
        message: '糟糕，服务器开小差了。'
      })
      return Promise.reject(error)
    }

    // 400服务器错误
    if (response.status === 400) {
      Notification.error({
        title: '提示信息',
        message: '缺少必要参数或参数类型不正确。'
      })

      return Promise.reject(error)
    }

    // 404接口路径错误
    if (response.status === 404) {
      Notification.error({
        title: '提示信息',
        message: '接口地址错误，请联系管理员。'
      })

      return Promise.reject(error)
    }

    // 其它错误
    Notification.error({
      title: '提示信息',
      message: error.message || '请求服务器出现错误。'
    })

    return Promise.reject(error)
  }
)

/**
 * 上传
 * @param url
 * @param file
 * @param data
 */
export function upload(url, file, data) {
  const formData = new FormData()

  // 附加数据
  if (data != null) {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
  }

  formData.append('file', file)

  return new Promise((resolve, reject) => {
    // 打开
    const loading = Loading.service({
      text: '正在上传...',
      background: 'rgba(0, 0, 0, 0.7)'
    })

    instance.request({
      url: url,
      method: 'post',
      data: formData,
      timeout: 1200000
    }).then(response => {
      console.log(response)
      loading.close()
      resolve(response)
    }).catch(err => {
      loading.close()
      reject(err)
    })
  })
}

/**
 * 下载
 * @param url
 * @param data
 * @param fileName
 */
export function download(url, data, fileName) {
  return new Promise((resolve, reject) => {
    // 打开
    const loading = Loading.service({
      text: '正在下载...',
      background: 'rgba(0, 0, 0, 0.7)'
    })

    instance.request({
      url: url,
      method: 'post',
      data: data,
      timeout: 1200000,
      responseType: 'blob'
    }).then(res => {
      loading.close()

      // 获取数据类型
      const type = res.data.type

      // 后台返回JSON错误信息
      if (type === 'application/json') {
        res.data.text().then(text => {
          const json = JSON.parse(text)
          // 其它错误
          Notification.error({
            title: '提示信息',
            message: json.msg
          })
        })
        return
      }

      // 模拟下载行为
      let link = document.createElement('a')
      link.href = URL.createObjectURL(res.data)
      link.setAttribute('download', fileName)
      link.click()
      link = null

      Notification.success({
        title: '提示信息',
        message: '数据导出成功！'
      })
    }).catch(err => {
      loading.close()
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @param options
 * @returns {Promise}
 */
export function post(url, data = {}, options = {}) {


  console.info("url:%s,baseUrl:%s",url, process.env.VUE_APP_BASE_API)
  return new Promise((resolve, reject) => {
    instance.post(url, data, options)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}
