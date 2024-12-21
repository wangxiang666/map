<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-10 20:08:00
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-11 20:18:06
 * @FilePath: \map\src\views\visualizing\pages\weapon\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="weapon-container">
		<div class="content-wrapper">
			<!-- 左侧菜单 -->
			<scene-menu :categories="categories" @select="handleCategorySelect" />

			<scene-display :src="currentSrc" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import sceneMenu from './components/sceneMenu.vue';
import sceneDisplay from './components/sceneDisplay.vue';

const categories = ref([
	{
		title: '场景展示',
		items: ['火力发电厂', '变电站', '风力发电厂'],
	},
]);

// 当前选中的 WebGL 页面地址
const currentSrc = ref('');

// 处理菜单项选择事件
function handleCategorySelect(item) {
  // 根据不同的选择加载不同的 WebGL 页面
  if (item === '火力发电厂') {
    currentSrc.value = 'http://127.0.0.1:8080/webgl-huodian/'; // 替换为实际的 WebGL 页面路径
  } else if (item === '风力发电厂') {
    currentSrc.value = 'http://127.0.0.1:8080/webgl-fengdian/'; // 替换为实际的 WebGL 页面路径
  } else if (item === '变电站') {
    currentSrc.value = 'http://127.0.0.1:8080/webgl-biandian/'; // 替换为实际的 WebGL 页面路径
  }
}
</script>

<style lang="scss" scoped>
.weapon-container {
	width: 100%;
	height: 100%;
	color: #fff;
	padding: 20px;
	.content-wrapper {
		display: flex;
		gap: 20px;
		width: 100%;
		height: 100%;
	}
}
</style>