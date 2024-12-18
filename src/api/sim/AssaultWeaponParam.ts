import request from '/@/utils/request';
// 查询攻击武器参数列表
export function listAssaultWeaponParam(query: object) {
	return request({
		url: '/api/v1/sim/assaultWeaponParam/list',
		method: 'get',
		params: query,
	});
}
// 查询攻击武器参数详细
export function getAssaultWeaponParam(id: number) {
	return request({
		url: '/api/v1/sim/assaultWeaponParam/get',
		method: 'get',
		params: {
			id: id.toString(),
		},
	});
}
// 新增攻击武器参数
export function addAssaultWeaponParam(data: object) {
	return request({
		url: '/api/v1/sim/assaultWeaponParam/add',
		method: 'post',
		data: data,
	});
}
// 修改攻击武器参数
export function updateAssaultWeaponParam(data: object) {
	return request({
		url: '/api/v1/sim/assaultWeaponParam/edit',
		method: 'put',
		data: data,
	});
}
// 删除攻击武器参数
export function delAssaultWeaponParam(ids: number[]) {
	return request({
		url: '/api/v1/sim/assaultWeaponParam/delete',
		method: 'delete',
		data: {
			ids: ids,
		},
	});
}
