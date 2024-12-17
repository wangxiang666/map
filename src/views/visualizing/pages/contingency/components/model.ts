export interface PlanMgrTableColumns {
	id: number;
	name: string; // 预案名称
	damageType: number; // 毁伤类型
	attackMethod: string; // 攻击手段
	weaponModel: string; // 武器型号
	weaponNum: number; // 数量
	defenseFlag: number; // 是否有防御模型
	defensiveWeapon: string; // 防御武器
	windType: number; // 风幕类型
	windNum: number; // 风幕数量
	windH: number; // 风幕高度
	createdAt: string; // 创建时间
}

export interface PlanMgrInfoData {
	id: number | undefined; // 序号
	name: string | undefined; // 预案名称
	damageType: number | undefined; // 毁伤类型
	attackMethod: string | undefined; // 攻击手段
	weaponModel: string | undefined; // 武器型号
	weaponNum: number | undefined; // 数量
	defenseFlag: number | undefined; // 是否有防御模型
	defensiveWeapon: string | undefined; // 防御武器
	windType: number | undefined; // 风幕类型
	windNum: number | undefined; // 风幕数量
	windH: number | undefined; // 风幕高度
	operator: string | undefined; // 操作员
	createdAt: string | undefined; // 创建时间
	updatedAt: string | undefined; // 更新时间
}

export interface PlanMgrTableDataState {
	ids: any[];
	tableData: {
		data: Array<PlanMgrTableColumns>;
		total: number;
		loading: boolean;
		param: {
			pageNum: number;
			pageSize: number;
			name: string | undefined;
			damageType: number | undefined;
			attackMethod: string | undefined;
			weaponModel: string | undefined;
			weaponNum: number | undefined;
			defenseFlag: number | undefined;
			defensiveWeapon: string | undefined;
			windType: number | undefined;
			windNum: number | undefined;
			windH: number | undefined;
			operator: string | undefined;
			createdAt: string[];
			dateRange: string[];
		};
	};
}

export interface PlanMgrEditState {
	loading: boolean;
	formData: PlanMgrInfoData;
	rules: object;
}
