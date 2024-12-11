<template>
  <div class="display-container">
    <div class="weapons-grid">
      <div v-for="weapon in weapons"
           :key="weapon.id"
           class="weapon-card">
        <!-- 武器图片占位 -->
        <!-- <img :src="weapon.image"
             class="weapon-image"> -->
        <div class="weapon-image-placeholder"></div>
        <div class="weapon-name">{{ weapon.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  weapons: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.display-container {
	flex: 1;
	border: 1px solid #1890ff;
	border-radius: 4px;
	padding: 20px;
}

.weapons-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20px;
}

.weapon-card {
	text-align: center;
}

.weapon-image-placeholder {
	width: 100%;
	height: 363px;
	background: url('../../../images/weaponBorder.jpg') no-repeat;
	background-size: 100% 100%;
	margin-bottom: 10px;
}

.weapon-name {
	color: #1890ff;
	font-size: 24px;
}
</style>