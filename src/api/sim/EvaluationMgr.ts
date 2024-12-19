import request from '/@/utils/request'
// 查询评估管理列表
export function listEvaluationMgr(query:object) {
  return request({
    url: '/api/v1/sim/evaluationMgr/list',
    method: 'get',
    params: query
  })
}
// 查询评估管理详细
export function getEvaluationMgr(id:number) {
  return request({
    url: '/api/v1/sim/evaluationMgr/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增评估管理
export function addEvaluationMgr(data:object) {
  return request({
    url: '/api/v1/sim/evaluationMgr/add',
    method: 'post',
    data: data
  })
}
// 修改评估管理
export function updateEvaluationMgr(data:object) {
  return request({
    url: '/api/v1/sim/evaluationMgr/edit',
    method: 'put',
    data: data
  })
}
// 删除评估管理
export function delEvaluationMgr(ids:number[]) {
  return request({
    url: '/api/v1/sim/evaluationMgr/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
//相关连表查询数据
export function linkedDataSearch(){
  return request({
    url: '/api/v1/sim/evaluationMgr/linkedData',
    method: 'get'
  })
}
