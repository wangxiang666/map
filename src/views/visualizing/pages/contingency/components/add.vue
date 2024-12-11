<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-11 14:56:08
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-11 15:50:42
 * @FilePath: \map\src\views\visualizing\pages\contingency\components\add.vue
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
    <div class="bg-container">
      <div class="map-container">
        <mainScreen></mainScreen>
      </div>
    </div>
    <div class="bg-container">
      <addForm></addForm>
    </div>
  </div>
</template>
<script setup>
import mainScreen from '/@/views/visualizing/pages/main/components/map.vue'
import addForm from './addForm.vue'
</script>
<style lang="scss" scoped>
.contingency-add {
	width: 100%;
	height: calc(100% - 20px);
	display: flex;
	justify-content: space-between;
	padding: 20px 120px 20px 80px;
	.bg-container {
		width: calc(50% - 50px);
		height: 100%;
		background: url('../../../images/mapContainer.jpg') no-repeat;
		background-size: 100% 100%;
		padding: 20px 31px 20px 53px;
		.map-container {
			width: 100%;
			height: 100%;
			border-radius: 4px;
			overflow: hidden;
		}
	}
}
</style>
