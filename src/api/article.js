import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vfsc-v1/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vfsc-v1/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vfsc-v1/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vfsc-v1/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vfsc-v1/article/update',
    method: 'post',
    data
  })
}
