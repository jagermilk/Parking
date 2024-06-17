import request from '@/utils/request'

//获取车类型列表
export const getBasicCarType = (data) => {
    return request({
      url: '/basic/basicCarType/list',
      method: 'get',
      data:data
    })
  }