import request from '/@/utils/request'
// 查询区域字典列表
export function listAreaDict(query:object) {
  return request({
    url: '/api/v1/sim/AreaDict/list',
    method: 'get',
    params: query
  })
}
// 查询区域字典详细
export function getAreaDict(id:number) {
  return request({
    url: '/api/v1/sim/AreaDict/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增区域字典
export function addAreaDict(data:object) {
  return request({
    url: '/api/v1/sim/AreaDict/add',
    method: 'post',
    data: data
  })
}
// 修改区域字典
export function updateAreaDict(data:object) {
  return request({
    url: '/api/v1/sim/AreaDict/edit',
    method: 'put',
    data: data
  })
}
// 删除区域字典
export function delAreaDict(ids:number[]) {
  return request({
    url: '/api/v1/sim/AreaDict/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
