<template>
  <div class="step-chart-img">
    <div ref="stepChart"
         class="step-chart"
         v-show="currentStep<=4">

    </div>
    <div class="circle-box"
         v-show="currentStep===5">
      <div class="circle"></div>
      <span class="maxX">{{maxScale}}</span>
      <span class="maxY">{{maxScale}}</span>
      <span class="maxX-label">散布长度（m）</span>
      <span class="maxY-label">散布宽度（m）</span>
    </div>
    <el-button type="primary"
               class="search-form-btn compute-btn"
               @click="compute">计算</el-button>
    <img :src="img[currentImg]"
         alt=""
         class="step-chart-img-item">
  </div>
</template>
<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts';
import Step1 from '/@/views/visualizing/images/step/Step1.png'
import Step2 from '/@/views/visualizing/images/step/Step2.png'
import Step3 from '/@/views/visualizing/images/step/Step3.png'
import Step4 from '/@/views/visualizing/images/step/Step4.png'
import Step5 from '/@/views/visualizing/images/step/Step5.png'


const img = {
  Step1,
  Step2,
  Step3,
  Step4,
  Step5
}
const props = defineProps({
  currentStep: {
    type: Number,
    default: 0
  },
  chartData: {
    type: Object
  }
})
const maxScale = ref(0)
const updateCircle = (R) => {
  maxScale.value = Math.ceil(R * 250 / 220)

}
const emit = defineEmits(['compute'])
const compute = () => {
  emit('compute')
}
const currentImg = ref('Step1')
watch(() => props.currentStep, () => {
  currentImg.value = 'Step' + props.currentStep
}, { deep: true, immediately: true })
const stepChart = ref();
const chartInstance = ref(null);
nextTick(() => {
  chartInstance.value = echarts.init(stepChart.value);
})

const initChart = ({ Xname, xData, Yname, yData }) => {
  const options = {
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: [{
      type: 'category',
      name: Xname,
      nameLocation: 'middle',
      nameGap: 25,
      nameTextStyle: {
        color: "#74d2d6", // Y轴名称颜色设置
        fontSize: 14,
      },
      axisLine: {
        lineStyle: {
          color: 'white' // x轴颜色
        }
      },
      axisLabel: {
        textStyle: {
          color: 'white' // x轴文字颜色
        }
      },
      data: xData
    }],
    yAxis: [{
      type: 'value',
      name: Yname,
      nameLocation: 'middle',
      nameTextStyle: {
        color: "#74d2d6", // Y轴名称颜色设置
        fontSize: 14,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'white' // x轴颜色
        }
      },
      axisLabel: {
        textStyle: {
          color: 'white' // x轴文字颜色
        }
      }
    }],
    series: [{
      type: 'line',
      data: yData,
      smooth: true,
      lineStyle: {
        color: '#00aaff',
        width: 2,
      },
      itemStyle: {
        color: '#00aaff',
      },
    }],
  };
  chartInstance.value.setOption(options);
};
const resetChart = () => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
}
watch(() => props.chartData, () => {
  if (props.chartData) {
    initChart(props.chartData)
  }
}, { deep: true })

defineExpose({
  updateCircle
})
</script>

<style scoped lang="scss">
.circle-box {
	width: 250px;
	height: 250px;
	border: 1px solid #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	margin-bottom: 40px;
	flex-shrink: 0;
	.circle {
		width: 220px;
		height: 220px;
		border-radius: 100%;
		border: 1px solid #fff;
		background: rgba(213, 2, 2, 0.2);
	}
	.maxX {
		position: absolute;
		bottom: -18px;
		right: -12px;
		color: #fff;
	}
	.maxX-label {
		position: absolute;
		bottom: -30px;
		right: 62px;
		color: #74d2d6;
	}
	.maxY {
		position: absolute;
		top: 5px;
		left: -26px;
		transform: rotateZ(-90deg);
		color: #fff;
	}
	.maxY-label {
		position: absolute;
		top: 105px;
		left: -95px;
		transform: rotateZ(-90deg);
		color: #74d2d6;
	}
}
.step-chart-img {
	width: 100%;
	height: 100%;
	margin-left: 26px;
	overflow: hidden;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	.step-chart-img-item {
		width: 468px;
		height: 210px;
	}
}
.step-chart {
	width: 100%;
	height: 290px;
	flex-shrink: 0;
}
.compute-btn {
	position: absolute;
	top: 240px;
	right: 0;
	z-index: 99;
}
</style>