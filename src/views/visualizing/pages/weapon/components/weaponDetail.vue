<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-21 23:11:03
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-21 23:28:44
 * @FilePath: \map\src\views\visualizing\pages\weapon\components\weaponDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-drawer class="vector-drawer"
             v-model="drawerVisible"
             title="武器详情"
             :size="600"
             :destroy-on-close="true">
    <div class="content-box">
      <div class="content"
           v-for="(item) in detailList"
           :key="item.label">
        <div class="label">{{item.label}}</div>
        <span class="unit">{{item.value}}</span>
        <span class="unit">{{item.unit}}</span>
      </div>
    </div>
    <div></div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const drawerVisible = ref(false);
const formData = ref([
	{
		needInput: [
			{
				label: '导电丝束长度：',
				key: 'threadLength',
				value: 0,
				unit: 'm',
			},
		],
		needCompute: [
			{
				label: '完全展开时间：',
				key: 'expandTime',
				value: '- -',
				unit: 's',
			},
		],
		hasComputed: false,
	},
	{
		needInput: [
			{
				label: '引爆时间：',
				key: 'detonationTime',
				value: 0,
				unit: 's',
				note: '观测曲线，在平滑部分，确定引信引爆时间，时间要大于完全展开时间，例如t=30s>t=15.5s',
			},
		],
		hasComputed: false,
	},
	{
		needCompute: [
			{
				label: '引爆高度：',
				key: 'detonationHeight',
				value: '- -',
				unit: 'm',
				note: '通过设置时间30s，计算引信引爆高度，hy=72m',
			},
		],
		hasComputed: false,
	},
	{
		needInput: [
			{
				label: '子弹长度：',
				key: 'lengthCylinder',
				value: 0,
				unit: 'm',
			},
			{
				label: '子弹直径：',
				key: 'diameterCylinder',
				value: 0,
				unit: 'm',
			},
			{
				label: '子弹重量：',
				key: 'massCylinder',
				value: 0,
				unit: 'kg',
			},
			{
				label: '伞直径：',
				key: 'diameterParachute',
				value: 0,
				unit: 'cm',
			},
			{
				label: '初始高度：',
				key: 'initialHeight',
				value: 0,
				unit: 'm',
			},
			{
				label: '散布水平速度：',
				key: 'initialHorizontalSpeed',
				value: 0,
				unit: 'm/s',
				note: '散步器战斧巡航导弹巡航速度0.752马赫 0.75 x 340 = 255m/s',
			},
		],
		needCompute: [
			// {
			//   label: '水平降速到0：',
			//   key: 'ExpandTime',
			//   value: '- -',
			//   unit: 's'
			// },
			{
				label: '子弹带伞水平移动：',
				key: 'currentHorizontalDistance',
				value: '- -',
				unit: 'm',
			},
			{
				label: '子弹带伞垂直移动：',
				key: 'verticalDistanceAtThreshold',
				value: '- -',
				unit: 'm',
			},
			{
				label: '子弹带伞飞行总时间：',
				key: 'totalTime',
				value: '- -',
				unit: 's',
			},
			// {
			//   label: '水平移动：',
			//   key: 'ExpandTime',
			//   value: '- -',
			//   unit: 's',
			//   note: '水平移动距离 = 带伞移动距离 + 丝束动距离'
			// },
		],
		hasComputed: false,
	},
	{
		needInput: [
			{
				label: '子弹数量：',
				key: 'bulletNumber',
				value: 0,
				unit: '个',
			},
			{
				label: '丝束数量：',
				key: 'fiberBundleNumber',
				value: 0,
				unit: '个',
			},
			{
				label: '丝束长度：',
				key: 'fiberLength',
				value: 0,
				unit: 'm',
			},
			{
				label: '小正方形边长：',
				key: 'squareSide',
				value: 0,
				unit: 'm',
			},
			// {
			//   label: '设定密度：',
			//   key: 'threadLength',
			//   value: 0,
			//   unit: 'm',
			//   note: '假设理想散布面是圆形，圆形有纤维丝交织成边长为a=1/12(m)的小正方形编织而成；a=1/12(m)是通过中国公开毁伤面积推算出来的，1/12(m)，即使分散不均匀，也足以实现毁伤。'
			// },
		],
		needCompute: [
			{
				label: '圆形散布半径：',
				key: 'dispersionRadius',
				value: '- -',
				unit: 'm',
			},
			{
				label: '圆形散布面积：',
				key: 'dispersionArea',
				value: '- -',
				unit: 'm²',
			},
		],
		hasComputed: false,
	},
]);

const detailList = ref<Array<{ label: string; value: any; unit: string }>>([]);
// 打开抽屉的方法
const open = (row: any) => {
	const data: Array<{ label: string; value: any; unit: string }> = [
		{
			label: '名称',
			value: row.name,
			unit: '',
		},
		{
			label: '备注',
			value: row.note,
			unit: '',
		},
	];

	formData.value.forEach((item: any) => {
		if (item.needInput) {
			item.needInput.forEach((item2: any) => {
				data.push({
					label: item2.label,
					value: row[item2.key],
					unit: item2.unit,
				});
			});
		}
		if (item.needCompute) {
			item.needCompute.forEach((item2: any) => {
				data.push({
					label: item2.label,
					value: row[item2.key],
					unit: item2.unit,
				});
			});
		}
	});
	detailList.value = data;
	drawerVisible.value = true;
};

// 暴露方法给父组件
defineExpose({
	open,
});
</script>

<style scoped lang="scss">
.el-drawer :deep(.el-drawer__body) {
	padding: 20px;
}

.el-form :deep(.el-form-item) {
	margin-bottom: 18px;
}

.el-divider {
	margin: 24px 0;
}
:deep(.vector-drawer) {
	z-index: 9999999 !important;
}
.drawer-footer {
	display: flex;
	justify-content: center;
	height: 80px;
}
.form-box {
	padding: 40px 40px 0 0;
}
.content-box {
	padding: 20px 10px;
}
.content {
	display: flex;
	align-items: center;
	width: 100%;
	padding: 0 12px;
	height: 32px;
	.label {
		font-size: 12px;
		white-space: nowrap;
		height: 12px;
		line-height: 12px;
	}
	.unit {
		margin-left: 4px;
		color: #e1aa1c;
		font-size: 14px;
		white-space: nowrap;
	}
	.el-input {
		height: 24px;
		width: 80px;
	}
}
</style>