import request from '@/utils/request'

//获取车类型列表
export const getBasicCarList = (query) => {
    return request({
      url: '/basic/basicCarType/list',
      method: 'get',
      params:query
    })
  }
  //基础类型数据
  export const getBasicType = (data) => {
    return request({
      url: 'basic/basicType/select',
      method: 'get',
      data:data
    })
  }
  //新建车类
  export const addBasicCarType = (data) => {
    return request({
      url: 'basic/basicCarType',
      method: 'post',
      data:data
    })
  }
  export const editBasicCarType = (data) => {
    return request({
      url: 'basic/basicCarType',
      method: 'put',
      data:data
    })
  }
    //删除车类
    export const deleteBasicCarType = (data) => {
      return request({
        url: 'basic/basicCarType/'+data,
        method: 'delete',
        data:data
      })
    }
    // 获取详细信息
export const getBasicCarData = (data) => {
  return request({
    url: 'basic/basicCarType/'+data,
    method: 'get',
    data:data
  })
}
