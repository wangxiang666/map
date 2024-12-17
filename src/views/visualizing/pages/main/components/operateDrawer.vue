<template>
  <el-drawer class="vector-drawer"
             v-model="drawerVisible"
             :title="mode === 'edit' ? '编辑' : '详情'"
             :size="600"
             :destroy-on-close="true">
    <el-form ref="formRef"
             :model="formData"
             :rules="rules"
             label-width="140px"
             :disabled="mode === 'view'">
      <!-- 基础信息 -->

      <el-divider>基础信息</el-divider>
      <el-form-item label="城市"
                    prop="addr_city">
        <el-input v-model="formData.addr_city" />
      </el-form-item>

      <el-form-item label="地址"
                    prop="addr_distr">
        <el-input v-model="formData.addr_distr" />
      </el-form-item>

      <el-form-item label="省份"
                    prop="addr_provi">
        <el-input v-model="formData.addr_provi" />
      </el-form-item>

      <el-form-item label="名称"
                    prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="中文名"
                    prop="name_zh">
        <el-input v-model="formData.name_zh" />
      </el-form-item>
      <!-- 电力参数 -->
      <template v-if="mode==='view'">
        <el-form-item label="容量"
                      prop="rating">
          <el-input v-model="formData.rating" />
        </el-form-item>

        <el-form-item label="电压等级"
                      prop="voltage">
          <el-input v-model="formData.voltage" />
        </el-form-item>
        <el-form-item label="中心点坐标X"
                      prop="centroid_x">
          <el-input v-model="formData.centroid_x" />
        </el-form-item>

        <el-form-item label="中心点坐标Y"
                      prop="centroid_y">
          <el-input v-model="formData.centroid_y" />
        </el-form-item>
        <!-- 电站参数 -->
        <el-divider>节点信息</el-divider>
        <el-form-item label="节点类型"
                      prop="type">
          <el-input v-model="formData.type" />
        </el-form-item>
        <el-form-item label="有功负荷(MW)"
                      prop="Pd">
          <el-input v-model="formData.Pd" />
        </el-form-item>

        <el-form-item label="无功负荷(MVar)"
                      prop="Qd">
          <el-input v-model="formData.Qd" />
        </el-form-item>
        <el-form-item label="Gs"
                      prop="Gs">
          <el-input v-model="formData.Gs" />
        </el-form-item>
        <el-form-item label="Bs"
                      prop="Bs">
          <el-input v-model="formData.Bs" />
        </el-form-item>
        <el-form-item label="区域"
                      prop="area">
          <el-input v-model="formData.area" />
        </el-form-item>
        <!-- 更多电力参数 -->
        <el-form-item label="电压幅值"
                      prop="Vm">
          <el-input v-model="formData.Vm" />
        </el-form-item>
        <el-form-item label="电压角度"
                      prop="Va">
          <el-input v-model="formData.Va" />
        </el-form-item>
        <el-form-item label="基准电压(kV)"
                      prop="baseKv">
          <el-input v-model="formData.baseKv" />
        </el-form-item>
        <el-form-item label="区域"
                      prop="zone">
          <el-input v-model="formData.zone" />
        </el-form-item>
        <el-form-item label="最大电压"
                      prop="Vmax">
          <el-input v-model="formData.Vmax" />
        </el-form-item>
        <el-form-item label="最小电压"
                      prop="Vmin">
          <el-input v-model="formData.Vmin" />
        </el-form-item>
        <el-divider>发电厂信息</el-divider>
        <!-- 1 变电站 2 发电站 -->
        <el-form-item label="类型"
                      prop="flag">
          <el-input v-model="formData.flag" />
        </el-form-item>
        <el-form-item label="单台容量"
                      prop="single_unit_capacity">
          <el-input v-model="formData.single_unit_capacity" />
        </el-form-item>
        <!-- 容量参数 -->

        <el-form-item label="装机容量"
                      prop="plant_outp">
          <el-input v-model="formData.plant_outp" />
        </el-form-item>

        <el-form-item label="发电厂类型"
                      prop="plant_sour">
          <el-input v-model="formData.plant_sour" />
        </el-form-item>
        <el-form-item label="有功功率(MW)"
                      prop="active_power_mw">
          <el-input v-model="formData.active_power_mw" />
        </el-form-item>

        <el-form-item label="无功功率(MVar)"
                      prop="reactive_power_mvar">
          <el-input v-model="formData.reactive_power_mvar" />
        </el-form-item>

        <el-form-item label="最大无功功率"
                      prop="max_reactive_power">
          <el-input v-model="formData.max_reactive_power" />
        </el-form-item>

        <el-form-item label="最小无功功率"
                      prop="min_reactive_power">
          <el-input v-model="formData.min_reactive_power" />
        </el-form-item>

        <el-form-item label="电压幅值"
                      prop="voltage_magnitude">
          <el-input v-model="formData.voltage_magnitude" />
        </el-form-item>

        <el-form-item label="基准容量(MVA)"
                      prop="base_capacity_mva">
          <el-input v-model="formData.base_capacity_mva" />
        </el-form-item>

        <el-form-item label="状态"
                      prop="pv_status">
          <el-input v-model="formData.pv_status" />
        </el-form-item>

        <el-form-item label="最大有功功率"
                      prop="max_active_power">
          <el-input v-model="formData.max_active_power" />
        </el-form-item>

        <el-form-item label="最小有功功率"
                      prop="min_active_power">
          <el-input v-model="formData.min_active_power" />
        </el-form-item>
        <el-form-item label="总面积"
                      prop="node_area">
          <el-input v-model="formData.node_area" />
        </el-form-item>

      </template>
    </el-form>

    <template #footer>
      <div class="drawer-footer">
        <el-button type="primary"
                   @click="submitForm">
          {{mode==='view'?'修改':'确定'}}
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance } from 'element-plus';
import WFS from 'ol/format/WFS';
import GML from 'ol/format/GML';
import { editGeoserver } from '/@/api/sim/geoserver.ts';
const drawerVisible = ref(false);
const formRef = ref<FormInstance>();
const mode = ref('view');

// 表单数据
const formData = ref({
	addr_city: '',
	addr_distr: '',
	addr_provi: '',
	name: '',
	name_zh: '',
	rating: '',
	voltage: '',
	centroid_x: 0,
	centroid_y: 0,
	type: 0,
	area: 0,
	Pd: 0,
	Qd: 0,
	Vm: 0,
	Va: 0,
	baseKv: 0,
	zone: 0,
	plant_outp: '',
	plant_sour: '',
	Gs: 0,
	Bs: 0,
	single_unit_capacity: 0,
	node_area: 0,
	flag: 0,
	Vmax: 0,
	Vmin: 0,
	active_power_mw: 0,
	reactive_power_mvar: 0,
	max_reactive_power: 0,
	min_reactive_power: 0,
	voltage_magnitude: 0,
	base_capacity_mva: 0,
	pv_status: 0,
	max_active_power: 0,
	min_active_power: 0,
});

// 表单验证规则
const rules = reactive({
	name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
	addr_city: [{ required: true, message: '请输入城市', trigger: 'blur' }],
	// 可以根据需要添加更多验证规则
});

// 打开抽屉的方法
const open = (feature?: any) => {
	drawerVisible.value = true;
	if (feature) {
		const {
			addr_city,
			addr_distr,
			addr_provi,
			name,
			name_zh,
			rating,
			voltage,
			centroid_x,
			centroid_y,
			type,
			area,
			Pd,
			Qd,
			Vm,
			Va,
			baseKv,
			zone,
			plant_outp,
			plant_sour,
			Gs,
			Bs,
			single_unit_capacity,
			node_area,
			flag,
			Vmax,
			Vmin,
			active_power_mw,
			reactive_power_mvar,
			max_reactive_power,
			min_reactive_power,
			voltage_magnitude,
			base_capacity_mva,
			pv_status,
			max_active_power,
			min_active_power,
		} = feature.getProperties();
		formData.value = {
			addr_city,
			addr_distr,
			addr_provi,
			name,
			name_zh,
			rating,
			voltage,
			centroid_x,
			centroid_y,
			type,
			area,
			Pd,
			Qd,
			Vm,
			Va,
			baseKv,
			zone,
			plant_outp,
			plant_sour,
			Gs,
			Bs,
			single_unit_capacity,
			node_area,
			flag,
			Vmax,
			Vmin,
			active_power_mw,
			reactive_power_mvar,
			max_reactive_power,
			min_reactive_power,
			voltage_magnitude,
			base_capacity_mva,
			pv_status,
			max_active_power,
			min_active_power,
		};
	}
};

// 关闭抽屉
const closeDrawer = () => {
	drawerVisible.value = false;
};
const transact = (feat, layerName) => {
	if (layerName == '') {
		return;
	}
	var formatWFS = new WFS();
	var formatGML = new GML({
		featureNS: 'http://localhost/postgis',
		featureType: layerName,
		srsName: 'EPSG:4326',
	});
	const node = formatWFS.writeTransaction(null, [feat], null, formatGML);
	const s = new XMLSerializer();
	const str = s.serializeToString(node);
	editGeoserver(str).then((res: any) => {
		console.log(res);
	});
};
// 提交表单
const submitForm = async () => {
	if (!formRef.value) return;

	await formRef.value.validate((valid) => {
		if (valid) {
			closeDrawer();
		}
	});
};

// 暴露方法给父组件
defineExpose({
	open,
});
</script>

<style scoped>
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
}
</style>