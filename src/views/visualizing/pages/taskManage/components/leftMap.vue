<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-11 14:20:28
 * @LastEditors: 王翔
 * @LastEditTime: 2024-12-19 18:41:54
 * @FilePath: /es-big-screen/Users/wangxiang/ownSystem/map/src/views/visualizing/pages/taskManage/components/leftMap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="left-map"
       :class="{'is-full':deductStatus}">

    <div class="deduction-pannel"
         v-if="deductStatus">
      <div class="deduction-title">
        任务管理器
      </div>
      <div class="deduction-control">
        <div class="gradient-label">场景控制</div>
        <div v-for="item in controls"
             class="control-item"
             :key="item"
             @click="handleControl(item)">
          <img :src="`/@/views/visualizing/images/deduction/${item}.png`"
               alt="">
        </div>
      </div>
    </div>
    <div class="map-container">
      <mainScreen></mainScreen>
    </div>
  </div>
</template>
<script setup>
import mainScreen from '/@/views/visualizing/pages/main/components/map.vue'
const props = defineProps({
  deductStatus: {
    type: Boolean,
    default: false
  }
})
const controls = ['play', 'stop', 'pre', 'next', 'over']
const handleControl = (directive) => {
  console.log(directive)
}
</script>
<style lang="scss" scoped>
.deduction-pannel {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 9999;
	width: 400px;
	height: 100%;
	color: #d6e3f1;
	pointer-events: none;
	&::after {
		content: '';
		width: 577px;
		height: 1003px;
		position: absolute;
		top: 40px;
		right: -480px;
		background: url('../../../images/deduction/pannel.png') no-repeat;
		background-size: 100% 100%;
		z-index: 999;
		pointer-events: none;
	}
	.deduction-title {
		width: 245px;
		height: 100px;
		background: url('../../../images/menuBtn.png') no-repeat;
		background-size: 100% 100%;
		font-size: 24px;
		text-align: center;
		line-height: 85px;
		margin: 0 auto;
	}
	.deduction-control {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 120px;
		.control-item {
			pointer-events: all;
			width: 51px;
			height: 51px;
			border-radius: 100%;
			margin-top: 46px;
			display: flex;
			align-items: center;
			justify-content: center;
			background: url('../../../images/deduction/btn-bg.png') no-repeat;
			background-size: 100% 100%;
			transition: all 0.3s;
			cursor: pointer;
			&:hover {
				transform: scale(1.1);
			}
			img {
				width: 28px;
				height: 28px;
			}
		}
		.gradient-label {
			background: linear-gradient(90deg, rgba(30, 144, 255, 0.5), rgb(0, 191, 255, 0.5));
			width: 100%;
			height: 52px;
			text-align: center;
			border-top-right-radius: 52px;
			border-bottom-right-radius: 52px;
			font-size: 18px;
			line-height: 52px;
		}
	}
}

.is-full {
	position: fixed;
	top: 0;
	left: 0;
	width: 100% !important;
	height: 100% !important;
	background: none;
	padding: 0 !important;
	z-index: 9;
}
.left-map {
	width: 643px;
	height: 100%;
	background: url('../../../images/mapContainer.png') no-repeat;
	background-size: 100% 100%;
	padding: 20px 28px 20px 48px;
	transition: all 0.3s;
	.map-container {
		width: 100%;
		height: 100%;
		border-radius: 4px;
		overflow: hidden;
	}
}
</style>

