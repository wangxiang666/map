<template>
  <div class="menu-container">
    <div v-for="category in categories"
         :key="category.title"
         class="category">
      <div class="category-title">{{ category.title }}</div>
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
	width: 414px;
	background: url('../../../images/leftMenu.jpg') no-repeat;
	background-size: 100% 100%;
	padding: 15px;
	font-size: 42px;
	display: flex;
	flex-direction: column;
	justify-content: center;
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

.menu-item {
	height: 118px;
	font-size: 24px;
	text-align: center;
	line-height: 84px;
	font-style: italic;
	padding: 8px;
	background: url('../../../images/menuBtn.jpg') no-repeat;
	background-size: 100% 100%;
	cursor: pointer;
	transition: all 0.3s;
	&:hover {
		transform: scale(1.1);
	}
}

.item-icon {
	width: 20px;
	height: 20px;
}
</style>