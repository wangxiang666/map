<template>
  <div class="step-chart-img">
    <!-- <div ref="stepChart"
         class="step-chart">

    </div> -->
    <div class="circle-box">
      <div class="circle"></div>
    </div>
    <el-button type="primary"
               class="search-form-btn compute-btn"
               @click="compute">计算</el-button>
    <img :src="currentImg"
         alt=""
         class="step-chart-img-item">
  </div>
</template>
<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts';
const props = defineProps({
  currentStep: {
    type: Number,
    default: 0
  },
  chartData: {
    type: Object
  }
})
const circleSize = ref(0)
const updateCircle = (R) => {

}
const emit = defineEmits(['compute'])
const compute = () => {
  emit('compute')
}
const currentImg = ref('/@/views/visualizing/images/step/Step1.png')
watch(() => props.currentStep, () => {
  currentImg.value = `/@/views/visualizing/images/step/Step${props.currentStep}.png`
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
        color: "#fff", // Y轴名称颜色设置
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
        color: "#fff", // Y轴名称颜色设置
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

const drawCircle = (data) => {
  const { radius } = data

}
defineExpose({
  drawCircle
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
	.circle {
		width: 220px;
		height: 220px;
		border-radius: 100%;
		border: 1px solid #fff;
		background: rgba(213, 2, 2, 0.2);
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