import request from '@/utils/request'

// 获取列表
export const getTableList = (data) => {
    return request({
      url: 'basic/basicArea/list',
      method: 'get',
      data:data
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
  //删除
  export const delBasicArea = (data) => {
    return request({
      url: 'basic/basicArea/'+data,
      method: 'delete',
      data:data
    })
  }
