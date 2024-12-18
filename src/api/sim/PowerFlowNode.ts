import request from '/@/utils/request'
// 查询潮流计算节点
export function listPowerFlowNodeMgr(query:object) {
  return request({
    url: '/api/v1/sim/flowAnalysisNode/list',
    method: 'get',
    params: query
  })
}