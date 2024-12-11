<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-11 20:02:02
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-11 20:14:56
 * @FilePath: \map\src\views\visualizing\pages\scene\components\sceneMenu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="menu-container">
    <div v-for="category in categories"
         :key="category.title"
         class="category">
      <div class="menu-title">{{ category.title }}</div>
      <div v-for="item in category.items"
           :key="item"
           class="menu-item"
           @click="$emit('select', item)">
        <!-- 菜单项图标占位 -->
        <!-- <img :src="`/icons/${item}.png`" class="item-icon"> -->
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true
  }
})

defineEmits(['select'])
</script>

<style lang="scss" scoped>
.menu-container {
	width: 440px;
	background: url('../../../images/border-left.jpg') no-repeat;
	background-size: 100% 100%;
	padding: 15px;
	font-size: 42px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.category {
	padding: 0 46px;
	margin-bottom: 20px;
}

.category-title {
	color: #1890ff;
	text-align: center;
	margin-bottom: 10px;
}

.menu-title {
	height: 118px;
	font-size: 24px;
	text-align: center;
	line-height: 84px;
	font-style: italic;
	padding: 8px;
	background: url('../../../images/menuBtn.jpg') no-repeat;
	background-size: 100% 100%;
}
.menu-item {
	width: 340px;
	height: 56px;
	font-size: 24px;
	text-align: center;
	line-height: 56px;
	color: #1890ff;
	background: url('../../../images/menu2.png') no-repeat;
	background-size: 100% 100%;
	cursor: pointer;
	transition: all 0.3s;
	margin-bottom: 40px;
	&:hover {
		transform: scale(1.1);
	}
}
.item-icon {
	width: 20px;
	height: 20px;
}
</style>