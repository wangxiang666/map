<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-10 20:13:20
 * @LastEditors: 王翔
 * @LastEditTime: 2024-12-13 09:21:19
 * @FilePath: /es-big-screen/Users/wangxiang/ownSystem/map/src/views/visualizing/pages/main/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="main-screen">
    <div class="main-left">
      <div class="bg-module bg-border">
        <bgLabel label="态势信息"></bgLabel>
      </div>
      <div class="bg-module bg-border">
        <bgLabel label="毁伤模型"></bgLabel>
        <destroy-model></destroy-model>
      </div>
    </div>
    <div class="main-center">
      <div class="map-container-box">
        <mainScreen></mainScreen>
      </div>
    </div>
    <div class="main-right">
      <div class="bg-module">
        <bgLabel label="推演任务"></bgLabel>
      </div>
      <div class="bg-module">
        <bgLabel label="评估详情"></bgLabel>
      </div>
    </div>
  </div>
</template>
<script setup>
import mainScreen from './components/map.vue'
import bgLabel from '/@/views/visualizing/components/bgLabel.vue'
import destroyModel from './components/destroyModel.vue'
</script>
<style lang="scss" scoped>
.main-screen {
	width: 100%;
	height: 100%;
	display: flex;
	.main-left {
		width: 440px;
		height: 100%;
	}
	.main-right {
		width: 440px;
		height: 928px;
		background: url('../../images/border-right.png') no-repeat;
		background-size: 100% 100%;
	}
	.bg-border {
		background: url('../../images/border-left.png') no-repeat;
		background-size: 100% 100%;

		// justify-content: center;
	}
	.bg-module {
		width: 100%;
		height: 465px;
		margin-bottom: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30px;
	}
	.main-center {
		flex: 1;
		height: 890px;
		background: url('../../images/border-center.png') no-repeat;
		background-size: 100% 100%;
		.map-container-box {
			width: calc(100% - 20px);
			height: 645px;
			margin-top: 96px;
			margin-left: 10px;
		}
	}
}
</style>

