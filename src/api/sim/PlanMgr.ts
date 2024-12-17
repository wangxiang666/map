import request from '/@/utils/request'
// 查询预案管理列表
export function listPlanMgr(query:object) {
  return request({
    url: '/api/v1/sim/planMgr/list',
    method: 'get',
    params: query
  })
}
// 查询预案管理详细
export function getPlanMgr(id:number) {
  return request({
    url: '/api/v1/sim/planMgr/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增预案管理
export function addPlanMgr(data:object) {
  return request({
    url: '/api/v1/sim/planMgr/add',
    method: 'post',
    data: data
  })
}
// 修改预案管理
export function updatePlanMgr(data:object) {
  return request({
    url: '/api/v1/sim/planMgr/edit',
    method: 'put',
    data: data
  })
}
// 删除预案管理
export function delPlanMgr(ids:number[]) {
  return request({
    url: '/api/v1/sim/planMgr/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
