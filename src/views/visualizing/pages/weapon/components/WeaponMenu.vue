<template>
  <div class="menu-container">
    <div v-for="category in categories"
         :key="category.title"
         class="category">
      <div class="category-title">{{ category.title }}</div>
      <div v-for="item in category.items"
           :key="item"
           class="menu-item"
           :class="{ active: item.title === activeItem }"
           @click="menuChange(category.title,item)">
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const emit = defineEmits(['select'])
const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
})
const activeItem = ref('')
onMounted(() => {
  activeItem.value = props.categories[0].items[0].title
  emit('select', props.categories[0].title, props.categories[0].items[0].type)
})
const menuChange = (damageType, weapon) => {
  activeItem.value = weapon.title
  emit('select', damageType, weapon.type)
}
</script>

<style lang="scss" scoped>
.menu-container {
	width: 414px;
	background: url('../../../images/leftMenu.png') no-repeat;
	background-size: 100% 100%;
	padding: 15px;
	font-size: 36px;
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
	height: 84px;
	font-size: 18px;
	text-align: center;
	line-height: 56px;
	font-style: italic;
	padding: 8px;
	background: url('../../../images/menuBtn.png') no-repeat;
	background-size: 100% 100%;
	cursor: pointer;
	transition: all 0.3s;
	&:hover {
		transform: scale(1.1);
	}
}
.active {
	color: #1890ff;
	font-weight: bold;
}
.item-icon {
	width: 20px;
	height: 20px;
}
</style>