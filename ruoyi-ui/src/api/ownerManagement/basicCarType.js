
import request from '@/utils/request'

// 查询车主管理列表
export function listBasicCarOwner(query) {
  return request({
    url: '/basic/basicCarOwner/list',
    method: 'get',
    params: query
  })
}

// 查询车主管理详细
export function getBasicCarOwner(id) {
  return request({
    url: '/basic/basicCarOwner/' + id,
    method: 'get'
  })
}

// 新增车主管理
export function addBasicCarOwner(data) {
  return request({
    url: '/basic/basicCarOwner',
    method: 'post',
    data: data
  })
}

// 修改车主管理
export function updateBasicCarOwner(data) {
  return request({
    url: '/basic/basicCarOwner',
    method: 'put',
    data: data
  })
}

// 删除车主管理
export function delBasicCarOwner(id) {
  return request({
    url: '/basic/basicCarOwner/' + id,
    method: 'delete'
  })
}
// 查询车位列表
export function getParkingSpaceList(data) {
  return request({
    url: 'basic/basicParkingSpace/list',
    method: 'get',
    data: data
  })
}