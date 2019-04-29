import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
export function getListMnage(params) {
  return request({
    url: '/table/manage',
    method: 'get',
    params
  })
}
