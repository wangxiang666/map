<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-11 14:20:28
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-11 14:34:07
 * @FilePath: \map\src\views\visualizing\pages\taskManage\components\leftMap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="left-map">
    <div class="map-container">
      <mainScreen></mainScreen>
    </div>
  </div>
</template>
<script setup>
import mainScreen from '/@/views/visualizing/pages/main/components/map.vue'
</script>
<style lang="scss" scoped>
.left-map {
	width: 743px;
	height: 100%;
	background: url('../../../images/mapContainer.png') no-repeat;
	background-size: 100% 100%;
	padding: 20px 28px 20px 48px;
	.map-container {
		width: 100%;
		height: 100%;
		border-radius: 4px;
		overflow: hidden;
	}
}
</style>

