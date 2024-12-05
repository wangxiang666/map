import request from '/@/utils/request'
// 查询例外文件策略列表
export function listExceptionFilePolicy(query:object) {
  return request({
    url: '/api/v1/engine/ExceptionFilePolicy/list',
    method: 'get',
    params: query
  })
}
// 查询例外文件策略详细
export function getExceptionFilePolicy(id:number) {
  return request({
    url: '/api/v1/engine/ExceptionFilePolicy/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增例外文件策略
export function addExceptionFilePolicy(data:object) {
  return request({
    url: '/api/v1/engine/ExceptionFilePolicy/add',
    method: 'post',
    data: data
  })
}
// 修改例外文件策略
export function updateExceptionFilePolicy(data:object) {
  return request({
    url: '/api/v1/engine/ExceptionFilePolicy/edit',
    method: 'put',
    data: data
  })
}
// 删除例外文件策略
export function delExceptionFilePolicy(ids:number[]) {
  return request({
    url: '/api/v1/engine/ExceptionFilePolicy/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
