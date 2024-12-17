<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-10 20:08:00
 * @LastEditors: 王翔
 * @LastEditTime: 2024-12-17 17:09:07
 * @FilePath: /es-big-screen/Users/wangxiang/ownSystem/map/src/views/visualizing/pages/weapon/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="weapon-container">
    <div class="content-wrapper">
      <!-- 左侧菜单 -->
      <weapon-menu :categories="categories"
                   @select="handleCategorySelect" />

      <!-- 右侧武器展示区 -->
      <weapon-display ref="weaponDisplayRef" />
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import WeaponMenu from './components/WeaponMenu.vue'
import WeaponDisplay from './components/WeaponDisplay.vue'

const categories = ref([
  {
    title: '硬毁伤',
    items: [
      {
        title: '石墨烯炸弹',
        type: 1
      },
      {
        title: '风幕',
        type: 3
      },
      {
        title: '电磁脉冲弹',
        type: 2
      },
      {
        title: '屏蔽柜',
        type: 4
      }
    ]
  },
  {
    title: '信息毁伤',
    items: [
      {
        title: '指令注入',
        type: 5
      },
      {
        title: '数据篡改',
        type: 6
      },
      {
        title: '中间人攻击',
        type: 7
      },
      {
        title: '防火墙',
        type: 8
      }]
  }
])
const weaponDisplayRef = ref()
const handleCategorySelect = (damageType, weaponType) => {
  nextTick(() => {
    weaponDisplayRef.value.getWeaponData(damageType, weaponType)
  })
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