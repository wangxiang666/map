import request from '/@/utils/request';
// 查询预案管理列表
export function editGeoserver(data: any) {
	return request({
		headers: {
			'Content-Type': 'text/xml',
		},
		url: '/geoserver/wfs',
		method: 'post',
		data,
	});
}
