<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-11 14:14:56
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-11 19:49:48
 * @FilePath: \map\src\views\visualizing\pages\taskManage\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="task-manage">
    <leftMap></leftMap>
    <div class="tree-container">
      <img src="../../images/tree.png"
           alt=""
           class="tree-img" />
    </div>
  </div>
</template>
<script setup>
import leftMap from './components/leftMap.vue'
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