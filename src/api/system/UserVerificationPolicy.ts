import request from '/@/utils/request'
// 查询用户验证策略列表
export function listUserVerificationPolicy(query:object) {
  return request({
    url: '/api/v1/system/UserVerificationPolicy/list',
    method: 'get',
    params: query
  })
}
// 查询用户验证策略详细
export function getUserVerificationPolicy(id:number) {
  return request({
    url: '/api/v1/system/UserVerificationPolicy/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增用户验证策略
export function addUserVerificationPolicy(data:object) {
  return request({
    url: '/api/v1/system/UserVerificationPolicy/add',
    method: 'post',
    data: data
  })
}
// 修改用户验证策略
export function updateUserVerificationPolicy(data:object) {
  return request({
    url: '/api/v1/system/UserVerificationPolicy/edit',
    method: 'put',
    data: data
  })
}
// 删除用户验证策略
export function delUserVerificationPolicy(ids:number[]) {
  return request({
    url: '/api/v1/system/UserVerificationPolicy/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
