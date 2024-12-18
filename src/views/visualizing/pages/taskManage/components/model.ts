export interface DeductionMgrTableColumns {
	id: number;
	name: string; // 任务名称
	note: string; // 任务描述
	destroy_target: number; // 毁伤目标
	destroy_plan: number; // 毁伤预案
	control_mode: number; // 控制方式
	status: number; // 状态
	createdAt: string; // 创建时间
}

export interface DeductionMgrInfoData {
	id: number | undefined; // 序号
	name: string | undefined; // 预案名称
	note: string | undefined; // 任务描述
	destroy_target: number | undefined; //毁伤目标
	destroy_plan: number | undefined; // 毁伤预案
	control_mode: number | undefined; // 控制方式
	status: number | undefined; // 状态
	damage_area: Float32Array | undefined; // 毁伤面积
	percentage_damage_degree: Float32Array | undefined; // 毁伤面积百分比
	weapon_valid_percent: Float32Array | undefined; // 武器有效百分比
	active_power_mw_after: Float32Array | undefined; // 毁伤后有功功率(MW)
	operator: string | undefined; // 操作员
	createdAt: string | undefined; // 创建时间
	updatedAt: string | undefined; // 更新时间
}

export interface DeductionMgrTableDataState {
	ids: any[];
	tableData: {
		data: Array<DeductionMgrTableColumns>;
		total: number;
		loading: boolean;
		param: {
			pageNum: number;
			pageSize: number;
			name: string | undefined;
			// damageType: number | undefined;
			// attackMethod: string | undefined;
			// weaponModel: string | undefined;
			// weaponNum: number | undefined;
			// defenseFlag: number | undefined;
			// defensiveWeapon: string | undefined;
			// windType: number | undefined;
			// windNum: number | undefined;
			// windH: number | undefined;
			// operator: string | undefined;
			note: string | undefined; // 任务描述
			destroy_target: number | undefined; //毁伤目标
			destroy_plan: number | undefined; // 毁伤预案
			control_mode: number | undefined; // 控制方式
			status: number | undefined; // 状态
			damage_area: Float32Array | undefined; // 毁伤面积
			percentage_damage_degree: Float32Array | undefined; // 毁伤面积百分比
			weapon_valid_percent: Float32Array | undefined; // 武器有效百分比
			active_power_mw_after: Float32Array | undefined; // 毁伤后有功功率(MW)
			operator: string | undefined; // 操作员
			createdAt: string[];
			dateRange: string[];
		};
	};
}

export interface DeductionMgrEditState {
	loading: boolean;
	formData: DeductionMgrInfoData;
	rules: object;
}
