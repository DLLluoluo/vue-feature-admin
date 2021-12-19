import request from '@/utils/request'

export function uploadFile (query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}