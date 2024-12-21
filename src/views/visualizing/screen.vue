<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-08 20:58:42
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-21 21:27:13
 * @FilePath: /es-big-screen/Users/wangxiang/ownSystem/map/src/views/visualizing/screen.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="bg-container"
       :style="{
    '--width': `${w}px`,
    '--height': `${h}px`,
    '--scaleX':scaleX,
    '--scaleY':scaleY
   }">
    <div class="armory-container"
         :class="{'main-bg': [0,1].indexOf(curentScreen.activeIndex)>-1 , 'main-bg-no-light': curentScreen.activeIndex === 5}">
      <div class="title">
        <div class="title-text-box">
          <p class="title-text">电能源系统毁伤与防御模拟仿真</p>
          <p class="title-text">及推演评估软件系统</p>

        </div>
        <div class="bg-menu bg-menu-left">
          <div class="bg-menu-item"
               v-for="item in screenMenuLeft"
               :key="item.index"
               @click="handleScreenMenu(item)">
            <span>{{item.title}}</span>
          </div>
        </div>
        <div class="bg-menu bg-menu-right">
          <div class="bg-menu-item"
               v-for="item in screenMenuRight"
               :key="item.index"
               @click="handleScreenMenu(item)">
            <span>{{item.title}}</span>
          </div>
        </div>
      </div>
      <div class="content-wrapper">
        <mainScreen v-if="curentScreen.activeIndex === 0"></mainScreen>
        <scene v-if="curentScreen.activeIndex === 1"></scene>
        <weapon v-if="curentScreen.activeIndex === 2"></weapon>
        <contingency v-if="curentScreen.activeIndex === 3"></contingency>
        <taskManage v-if="curentScreen.activeIndex === 4"></taskManage>
        <evaluate v-if="curentScreen.activeIndex === 5"></evaluate>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { NextLoading } from '/@/utils/loading';
import weapon from '/@/views/visualizing/pages/weapon/index.vue'
import mainScreen from '/@/views/visualizing/pages/main/index.vue'
import taskManage from '/@/views/visualizing/pages/taskManage/index.vue'
import contingency from '/@/views/visualizing/pages/contingency/index.vue'
import evaluate from '/@/views/visualizing/pages/evaluate/index.vue'
import scene from '/@/views/visualizing/pages/scene/index.vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const curentScreen = ref({
  title: '态势展示',
  activeIndex: 0
})
const screenMenuLeft = ref([
  {
    activeIndex: 0,
    title: '态势展示'
    // title: '电能源系统毁伤与防御模拟仿真及推演评估软件系统'
  },
  {
    activeIndex: 1,
    title: '场景展示'
  },
  {
    activeIndex: 2,
    title: '毁伤与防御模型'
  },
  {
    activeIndex: 3,
    title: '预案管理'
  },

])
const screenMenuRight = ref([
  {
    activeIndex: 4,
    title: '推演任务管理'
  },
  {
    activeIndex: 5,
    title: '评估管理'
  },
  {
    activeIndex: 6,
    title: '薄弱环节'
  },
  {
    activeIndex: 7,
    title: '后台管理'
  }
])
const handleScreenMenu = (item) => {
  if (item.activeIndex === 7) {
    router.push('/')
  } else {
    curentScreen.value = item
  }
}
const scaleX = ref(1)
const scaleY = ref(1)
const w = ref(1920)
const h = ref(1080)
//防抖函数
const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};
const setScale = () => {
  scaleX.value = window.innerWidth / w.value
  scaleY.value = window.innerHeight / h.value
}
onMounted(() => {
  NextLoading.done();
  const onresize = debounce(() => setScale(), 100)
  setScale()
  window.addEventListener('resize', onresize)
})
onUnmounted(() => {
  window.removeEventListener('resize', onresize)
})
</script>

<style lang="scss" scoped>
.bg-container {
	width: 100vw;
	height: 100vh;
	:deep(.el-input__wrapper) {
		background: url('./images/formInput.png') no-repeat;
		background-size: 100% 100%;
		box-shadow: none !important;
		border: 1px solid #0a5999;
		padding: 0 36px;
	}
	:deep(.el-textarea__inner) {
		background: url('./images/formInput.png') no-repeat;
		background-size: 100% 100%;
		box-shadow: none !important;
		border: 1px solid #0a5999;
		padding: 6px 36px;
	}
	:deep(.el-form-item__label) {
		color: #1890ff;
		font-size: 16px;
		line-height: 40px;
	}

	:deep(.el-input__inner) {
		color: #fff;
		font-size: 16px;
	}
	:deep(.el-textarea__inner) {
		color: #fff;
		font-size: 16px;
	}

	// :deep(.el-select) {
	// 	width: 100%;
	// }
}
.armory-container {
	width: var(--width);
	height: var(--height);
	transform: scale(var(--scaleX), var(--scaleY));
	transform-origin: 0 0;
	position: relative;
	background: url('./images/screen-bg.png') no-repeat;
	background-size: 100% 100%;

	&.main-bg {
		background: url('./images/screenBg2.png') no-repeat;
		background-size: 100% 100%;
	}
	&.main-bg-no-light {
		background: url('./images/bg-no-light.png') no-repeat;
		background-size: 100% 100%;
	}
}

.title {
	width: 100%;
	height: 264px;
	text-align: center;
	background: url('./images/title.png') no-repeat;
	background-size: 100% 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	.title-text-box {
		width: 500px;
		height: 86px;
		font-size: 28px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.title-text {
		font-weight: bold;
		text-align: center;
		background: linear-gradient(to bottom, #ffffff, #3498db);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		/* 添加发光效果 */
		text-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
		// line-height: 86px;
	}
}
.bg-menu {
	display: flex;
	justify-content: space-between;
	position: absolute;
	top: 68px;
	width: 500px;
	.bg-menu-item {
		width: 117px;
		height: 40px;
		background: url('./images/bgMenu.png') no-repeat;
		background-size: 100% 100%;
		cursor: pointer;
		text-align: center;
		line-height: 40px;
		color: #ffffff;
		font-size: 16px;
		transition: all 0.3s;
		&:hover {
			transform: scale(1.1);
		}
	}
}
.bg-menu-left {
	left: 38px;
}
.bg-menu-right {
	right: 35px;
}
.content-wrapper {
	width: 100%;
	height: calc(100% - 113px);
	position: absolute;
	top: 113px;
	left: 0;
	padding: 0 22px;
}
:deep(.bg-form-btn) {
	background: url('./images/bgFormBtn.png') no-repeat;
	background-size: 100% 100%;
	border: none;
}
:deep(.search-form-btn) {
	background: url('./images/search-btn.png') no-repeat;
	background-size: 100% 100%;
	padding: 12px 26px;
	border: none;
	transition: all 0.3s;
	&:hover {
		opacity: 0.8;
	}
}
:deep(.el-drawer) {
	background-color: rgba(21, 40, 91, 0.9);
	.el-drawer__header {
		color: #fff;
	}
}
:deep(.el-pagination__sizes) {
	.el-input {
		width: 180px;
	}
}
:deep(.el-pagination__editor.el-input) {
	width: 140px;
}
/* 表格样式覆盖 */
:deep(.el-table) {
	background-color: transparent;
	color: #fff;
	--el-table-border-color: #067fb8;
}

:deep(.el-table th),
:deep(.el-table tr),
:deep(.el-table td) {
	background-color: #020e29 !important;
	color: #fff;
}
</style>