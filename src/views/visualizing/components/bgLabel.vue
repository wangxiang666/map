<template>
  <div class="bg-label"
       :style="{'--width': width + 'px', '--height': height + 'px'}">
    {{label}}
  </div>
</template>
<script setup>
defineProps({
  label: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
    default: 306
  },
  height: {
    type: Number,
    default: 54
  }
})
</script>
<style lang="scss" scoped>
.bg-label {
	background: url('../images/bg-label.png') no-repeat;
	background-size: 100% 100%;
	width: var(--width);
	height: var(--height);
	line-height: var(--height);
	text-align: center;
	font-size: 24px;
	color: #ffffff;
	font-style: italic;
}
</style>


