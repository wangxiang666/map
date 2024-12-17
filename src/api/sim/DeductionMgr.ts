import request from '/@/utils/request'
// 查询推演任务管理列表
export function listDeductionMgr(query:object) {
  return request({
    url: '/api/v1/sim/deductionMgr/list',
    method: 'get',
    params: query
  })
}
// 查询推演任务管理详细
export function getDeductionMgr(id:number) {
  return request({
    url: '/api/v1/sim/deductionMgr/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增推演任务管理
export function addDeductionMgr(data:object) {
  return request({
    url: '/api/v1/sim/deductionMgr/add',
    method: 'post',
    data: data
  })
}
// 修改推演任务管理
export function updateDeductionMgr(data:object) {
  return request({
    url: '/api/v1/sim/deductionMgr/edit',
    method: 'put',
    data: data
  })
}
// 删除推演任务管理
export function delDeductionMgr(ids:number[]) {
  return request({
    url: '/api/v1/sim/deductionMgr/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
