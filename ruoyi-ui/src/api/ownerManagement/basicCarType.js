import request from '@/utils/request'

// 获取路由

export const addCarType = (data) => {
  return request({
    url: '/basic/basicTypeAuth',
    method: 'post',
    data:data
  })
};
//获取车主管理列表
export const getOwnerCarType = (data) => {
  return request({
    url: '/basic/basicCarOwner/list',
    method: 'get',
    data:data
  })
}