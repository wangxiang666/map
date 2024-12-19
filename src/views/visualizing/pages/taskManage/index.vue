<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-11 14:14:56
 * @LastEditors: 王翔
 * @LastEditTime: 2024-12-19 15:52:53
 * @FilePath: /es-big-screen/Users/wangxiang/ownSystem/map/src/views/visualizing/pages/taskManage/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="task-manage">
    <leftMap></leftMap>
    <manageTable></manageTable>
  </div>
</template>
<script setup>
import leftMap from './components/leftMap.vue'
import manageTable from './components/manageTable.vue'
</script>
<style lang="scss" scoped>
.task-manage {
	width: 100%;
	height: calc(100% - 20px);
	display: flex;
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
