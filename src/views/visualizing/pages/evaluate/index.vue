<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-11 14:14:56
 * @LastEditors: 王翔
 * @LastEditTime: 2024-12-19 15:39:37
 * @FilePath: /es-big-screen/Users/wangxiang/ownSystem/map/src/views/visualizing/pages/evaluate/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="task-manage">
    <leftMap></leftMap>
    <!-- <div class="tree-container">
      <img src="../../images/tree.png"
           alt=""
           class="tree-img" />
    </div> -->
    <!-- <manageTable /> -->
  </div>
</template>
<script setup>
import leftMap from './components/leftMap.vue'
import manageTable from './components/manageTable.vue';
</script>
<style lang="scss" scoped>
.task-manage {
	width: 100%;
	height: calc(100% - 20px);
	display: flex;
}
.tree-container {
	width: calc(100% - 800px);
	height: 100%;
	background: url('../../images/tree-container.png') no-repeat;
	background-size: 100% 100%;
	padding: 0 20px 40px 20px;
	margin-left: 40px;
	.tree-img {
		width: 100%;
		height: 100%;
	}
}
</style>