<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-11 14:56:08
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-21 22:26:52
 * @FilePath: /es-big-screen/Users/wangxiang/ownSystem/map/src/views/visualizing/pages/contingency/components/add.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-11 14:55:10
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-11 15:10:05
 * @FilePath: \map\src\views\visualizing\pages\contingency\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="contingency-add">
    <div class="bg-container"
         :class="{'bg-container-show-table':!showFrom}">
      <div class="map-container">
        <mainScreen></mainScreen>
      </div>
    </div>
    <manageTable ref="tableRef"
                 v-show="!showFrom"
                 @handleAdd="handleAdd"
                 @handleView="handleView" />
    <div class="bg-container"
         v-show="showFrom">
      <addForm ref="addFormRef"
               @operateDone="operateDone"
               @cancel="showFrom=false"></addForm>
    </div>
  </div>
</template>
<script setup>
import mainScreen from '/@/views/visualizing/pages/main/components/map.vue'
import manageTable from './manageTable.vue';
import addForm from './addForm.vue'
import { ref } from 'vue';
const showFrom = ref(false);
const tableRef = ref()
const addFormRef = ref()
const operateDone = () => {
  tableRef.value.PlanMgrList()
  showFrom.value = false;
};
const handleAdd = (row) => {
  addFormRef.value.openDialog(row, 'edit')
  showFrom.value = true;
};
const handleView = (row) => {
  addFormRef.value.openDialog(row, 'view')
  showFrom.value = true;
};
</script>
<style lang="scss" scoped>
.contingency-add {
	width: 100%;
	height: calc(100% - 20px);
	display: flex;
	justify-content: space-between;
	padding: 20px 20px 20px 80px;
	.bg-container {
		width: calc(50% - 50px);
		height: 100%;
		background: url('../../../images/mapContainer.png') no-repeat;
		background-size: 100% 100%;
		padding: 20px 31px 20px 53px;
		transition: all 0.3s;
		.map-container {
			width: 100%;
			height: 100%;
			border-radius: 4px;
			overflow: hidden;
		}
	}
	.bg-container-show-table {
		width: 642px;
	}
}
</style>
