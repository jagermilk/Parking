import request from '@/utils/request'

// 获取列表
export const getTableList = (query) => {
  console.log(query);
    return request({
      url: 'basic/basicArea/list',
      method: 'get',
      params:query
    })
  }
// 添加区域
export const addBasicArea = (data) => {
    return request({
      url: 'basic/basicArea',
      method: 'post',
      data:data
    })
  }
  // 修改区域
export const editBasicArea = (data) => {
  return request({
    url: 'basic/basicArea',
    method: 'put',
    data:data
  })
}
  //删除
  export const delBasicArea = (data) => {
    return request({
      url: 'basic/basicArea/'+data,
      method: 'delete',
      data:data
    })
  }
//获取区域列表
export const getAreaTree = (data) => {
  return request({
    url: 'basic/basicArea/areaTree',
    method: 'get',
    data:data
  })
}
// 获取详细信息
export const getIdData = (data) => {
  return request({
    url: 'basic/basicArea/'+data,
    method: 'get',
    data:data
  })
}