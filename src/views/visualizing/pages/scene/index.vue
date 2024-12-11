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
      <scene-menu :categories="categories"
                  @select="handleCategorySelect" />

      <scene-display />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import sceneMenu from './components/sceneMenu.vue'
import sceneDisplay from './components/sceneDisplay.vue'

const categories = ref([
  {
    title: '场景展示',
    items: ['火力发电厂', '风力发电厂', '变电站']
  },
])

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