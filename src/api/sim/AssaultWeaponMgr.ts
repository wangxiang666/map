import request from '/@/utils/request'
// 查询攻击武器管理列表
export function listAssaultWeaponMgr(query:object) {
  return request({
    url: '/api/v1/sim/assaultWeaponMgr/list',
    method: 'get',
    params: query
  })
}
// 查询攻击武器管理详细
export function getAssaultWeaponMgr(id:number) {
  return request({
    url: '/api/v1/sim/assaultWeaponMgr/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增攻击武器管理
export function addAssaultWeaponMgr(data:object) {
  return request({
    url: '/api/v1/sim/assaultWeaponMgr/add',
    method: 'post',
    data: data
  })
}
// 修改攻击武器管理
export function updateAssaultWeaponMgr(data:object) {
  return request({
    url: '/api/v1/sim/assaultWeaponMgr/edit',
    method: 'put',
    data: data
  })
}
// 删除攻击武器管理
export function delAssaultWeaponMgr(ids:number[]) {
  return request({
    url: '/api/v1/sim/assaultWeaponMgr/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
