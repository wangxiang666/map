<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-10 20:08:00
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-11 12:00:04
 * @FilePath: \map\src\views\visualizing\pages\weapon\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="weapon-container">
    <div class="content-wrapper">
      <!-- 左侧菜单 -->
      <weapon-menu :categories="categories"
                   @select="handleCategorySelect" />

      <!-- 右侧武器展示区 -->
      <weapon-display :weapons="weapons" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WeaponMenu from './components/WeaponMenu.vue'
import WeaponDisplay from './components/WeaponDisplay.vue'

const categories = ref([
  {
    title: '硬毁伤',
    items: ['石墨烯炸弹', '电磁脉冲弹']
  },
  {
    title: '信息毁伤',
    items: ['指令注入', '数据篡改', '中间人攻击']
  }
])

const weapons = ref([
  {
    id: 1,
    name: '石墨烯型号1',
    image: '/weapons/weapon1.png'
  },
  {
    id: 2,
    name: '石墨烯型号2',
    image: '/weapons/weapon2.png'
  },
  {
    id: 3,
    name: '石墨烯型号3',
    image: '/weapons/weapon3.png'
  }
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