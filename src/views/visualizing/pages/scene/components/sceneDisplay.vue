<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-11 20:02:02
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-11 20:23:07
 * @FilePath: \map\src\views\visualizing\pages\scene\components\sceneDisplay.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="display-container">
		<!-- <span class="display-title">火力发电厂</span> -->
		<!-- <iframe src="http://127.0.0.1:8080/webgl-1/" style="margin-top: 6%;margin-left: 5%;" width="91%" height="85%" frameborder="0" scrolling="no"></iframe> -->

		<iframe v-if="src" :src="src" style="margin-top: 6%;margin-left: 5%;" width="91%" height="85%" frameborder="0" scrolling="no"></iframe>
    	<span v-else>请选择一个场景展示</span>
	</div>
</template>

<script setup>
defineProps({
	weapons: {
		type: Array,
		required: true,
	},
	src: {
    type: String,
    required: false,
  },
});
</script>

<style lang="scss" scoped>
.display-container {
	flex: 1;
	height: 900px;
	background: url('../../../images/scene-border.png') no-repeat;
	background-size: 100% 100%;
	position: relative;
	.display-title {
		font-size: 32px;
		color: #1890ff;
		position: absolute;
		top: 16px;
		left: 150px;
	}
}
</style>