import request from '@/utils/request'

// 获取车道列表
export const getCameraList = (query) => {
    return request({
      url: 'basic/basicCamera/list',
      method: 'get',
      params:query
    })
  }
// 获取车道列表
export const getBasicLaneList = (query) => {
    return request({
      url: 'basic/basicLane/list',
      method: 'get',
      params:query
    })
  }
// 添加车道
export const addbasicLane = (data) => {
    return request({
      url: 'basic/basicLane',
      method: 'post',
      data:data
    })
  }
  // 修改车道
export const editbasicLane = (data) => {
  return request({
    url: 'basic/basicLane',
    method: 'put',
    data:data
  })
}
  //删除
  export const delbasicLane = (data) => {
    return request({
      url: 'basic/basicLane/'+data,
      method: 'delete',
      data:data
    })
  }
// 获取详细信息
export const getLaneDetail = (data) => {
  return request({
    url: 'basic/basicLane/'+data,
    method: 'get',
    params:data
  })
}
