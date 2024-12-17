<template>
  <el-drawer class="vector-drawer"
             v-model="drawerVisible"
             title="查询"
             :size="600"
             :destroy-on-close="true">
    <el-form ref="formRef"
             :model="formData"
             label-width="140px"
             class="form-box">
      <el-form-item label="查询类型"
                  prop="searchType">
      <el-select v-model="formData.searchType" >
        <el-option label="节点查询" value="node"></el-option>
        <el-option label="线路查询" value="line"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="名称"
                    prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="电压等级"
                    prop="voltage">
        <el-input v-model="formData.voltage" />
      </el-form-item>

      <template v-if="formData.searchType==='node'">
        <el-form-item label="省份"
                    prop="addr_provi">
        <el-input v-model="formData.addr_provi" />
      </el-form-item>
      <el-form-item label="中文名"
                    prop="name_zh">
        <el-input v-model="formData.name_zh" />
      </el-form-item>
      <el-form-item label="容量"
                    prop="rating">
        <el-input v-model="formData.rating" />
      </el-form-item>
      <!-- 1 变电站 2 发电站 -->
      <el-form-item label="类型"
                    prop="flag">
        <el-select v-model="formData.flag" >
          <el-option label="变电站" :value="1"></el-option>
          <el-option label="发电站" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="装机容量"
                    prop="plant_outp">
        <el-input v-model="formData.plant_outp" />
      </el-form-item>

      <el-form-item label="发电厂类型"
                    prop="plant_sour">
        <el-input v-model="formData.plant_sour" />
      </el-form-item>
      </template>

      
    </el-form>

    <template #footer>
      <div class="drawer-footer">
        <el-button type="primary"
                   @click="submitForm">
          确定
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { FormInstance } from 'element-plus';
const drawerVisible = ref(false);
const formRef = ref<FormInstance>();

// 表单数据
const formData = ref({
  searchType: 'node',
	addr_provi: '',
	name: '',
	name_zh: '',
	rating: '',
	voltage: '',
	flag: 1,
	plant_outp: '',
	plant_sour: ''
});



// 打开抽屉的方法
const open = () => {
	drawerVisible.value = true;
};

// 关闭抽屉
const closeDrawer = () => {
	drawerVisible.value = false;
};
const emit = defineEmits(['search-change']);
// 提交表单
const submitForm = async () => {
	if (!formRef.value) return;

	await formRef.value.validate((valid) => {
		if (valid) {
      emit('search-change', formData.value)
			closeDrawer();
		}
	});
};

// 暴露方法给父组件
defineExpose({
	open
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
.form-box{
  padding: 40px 40px 0 0;
}
</style>