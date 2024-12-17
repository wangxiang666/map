export const attackMethodDic = [
	{
		label: '指令篡改',
		value: 1,
		damageType: 1,
	},
	{
		label: '指令注入',
		value: 2,
		damageType: 1,
	},
	{
		label: '中间人欺骗',
		value: 3,
		damageType: 1,
	},
	{
		label: '石墨烯炸弹',
		value: 4,
		damageType: 2,
	},
	{
		label: '电磁脉冲弹',
		value: 5,
		damageType: 2,
	},
];

export const defensiveWeaponDic = [
	{
		label: '风幕',
		value: 1,
		attackMethod: [4],
	},
	{
		label: '屏蔽柜',
		value: 2,
		attackMethod: [5],
	},
	{
		label: '防火墙',
		value: 3,
		attackMethod: [1, 2, 3],
	},
];
