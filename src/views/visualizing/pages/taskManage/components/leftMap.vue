<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-11 14:20:28
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-19 23:35:57
 * @FilePath: /es-big-screen/Users/wangxiang/ownSystem/map/src/views/visualizing/pages/taskManage/components/leftMap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="map-container">
    <div class="left-map"
         :class="{'is-full':deductStatus}">

      <div class="deduction-pannel"
           v-if="deductStatus">
        <div class="deduction-title"
             @click="backToList">
          任务管理器
        </div>
        <div class="deduction-control">
          <div class="gradient-label">场景控制</div>
          <div v-for="item in controls"
               class="control-item"
               :key="item.directive"
               @click="handleControl(item.directive)">
            <img :src="item.img"
                 alt="">
          </div>
        </div>
      </div>
      <div class="map-container">
        <mainScreen ref="mapViewRef"></mainScreen>
      </div>
    </div>
  </div>
</template>
<script setup>
import mainScreen from '/@/views/visualizing/pages/main/components/map.vue'
import play from '../../../images/deduction/play.png'
import stop from '../../../images/deduction/stop.png'
import pre from '../../../images/deduction/pre.png'
import next from '../../../images/deduction/next.png'
import over from '../../../images/deduction/over.png'
import { ref, watch } from 'vue'
const props = defineProps({
  deductStatus: {
    type: Boolean,
    default: false
  },
  destination: {
    type: String
  }
})
watch(() => props.deductStatus, () => {
  mapViewRef.value.updateSizeMap()
}, { deep: true, immediately: true })
const emit = defineEmits(['backToList'])
const backToList = () => {
  emit('backToList')
}
const controls = ref(
  [
    {
      directive: 'play',
      img: play
    },
    {
      directive: 'stop',
      img: stop
    },
    {
      directive: 'pre',
      img: pre
    },
    {
      directive: 'next',
      img: next
    },
    {
      directive: 'over',
      img: over
    }
  ]
)
const handleControl = (directive) => {
  switch (directive) {
    case 'play':
      handlePlay()
      break;
    case 'stop':
      break;
    case 'pre':
      break;
    case 'next':
      break;
    case 'over':
      break;
  }
}
const timer = ref(null)
const mapViewRef = ref(null)
const handlePlay = () => {
  mapViewRef.value.step1Play(props.destination)
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
		pointer-events: all;
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
.map-container {
	width: 643px;
	height: 100%;
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

