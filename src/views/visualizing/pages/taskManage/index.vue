<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-11 14:14:56
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-22 00:39:49
 * @FilePath: /es-big-screen/Users/wangxiang/ownSystem/map/src/views/visualizing/pages/taskManage/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="task-manage">
    <leftMap :class="{smallMap:showFrom}"
             :deductStatus="deductStatus"
             @backToList="deductStatus = false"
             :destination="destination"
             ref="leftMapRef">
    </leftMap>
    <manageTable v-show="!showFrom"
                 ref="tableRef"
                 @handleAdd="handleAdd"
                 @deduct="handleDeduct"
                 @rePlayDeduction="rePlayDeduction"
                 @handleView="handleView"></manageTable>
    <div class="bg-container"
         v-show="showFrom">
      <addForm ref="addFormRef"
               @operateDone="operateDone"
               @cancel="showFrom=false"></addForm>
    </div>
  </div>
</template>
<script setup>
import leftMap from './components/leftMap.vue'
import manageTable from './components/manageTable.vue'
import addForm from './components/addForm.vue'
import { ref } from 'vue';
const showFrom = ref(false);
const tableRef = ref()
const addFormRef = ref()
const operateDone = () => {
  tableRef.value.DeductionMgrList()
  showFrom.value = false;
};
const handleAdd = (row) => {
  addFormRef.value.openDialog(row, 'edit')
  showFrom.value = true;
};
const deductStatus = ref(false)
const destination = ref({})
const leftMapRef = ref()
const handleDeduct = (row) => {
  destination.value = row
  deductStatus.value = true
  leftMapRef.value.showControl = true
}
const rePlayDeduction = (row) => {
  destination.value = row
  deductStatus.value = true
  leftMapRef.value.autoPlay()

}
const handleView = (row) => {
  addFormRef.value.openDialog(row, 'view')
  showFrom.value = true;
};
</script>
<style lang="scss" scoped>
.smallMap {
	width: calc(50% - 50px);
}
.task-manage {
	width: 100%;
	height: calc(100% - 20px);
	display: flex;
	justify-content: space-between;
	padding: 20px 20px 20px 80px;
	position: relative;
	.bg-container {
		width: calc(50% - 50px);
		height: 100%;
		background: url('../../images/mapContainer.png') no-repeat;
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

<!-- 

<template>
  <div class="contingency">
    <add></add>
  </div>
</template>
<script setup>
import add from './components/add.vue'
</script>
<style lang="scss" scoped>
.contingency {
	width: 100%;
	height: calc(100% - 20px);
}
</style> -->
