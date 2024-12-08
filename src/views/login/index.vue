<template>
  <div class="login-container">
    <div class="login-content-out">
      <div class="login-content">
        <div class="login-content-main">
          <!-- <div class="login-icon-group">
            <div class="login-icon-group-title">
              <img :src="logoMini" />
              <div class="login-icon-group-title-text font25">{{ getThemeConfig.globalViceTitle }}</div>
            </div>
          </div> -->
          <div v-if="!isScan">
            <Account />
          </div>
          <!--div class="login-content-main-sacn" @click="isScan = !isScan">
            <i class="iconfont" :class="isScan ? 'icon-diannao1' : 'icon-barcode-qr'"></i>
            <div class="login-content-main-sacn-delta"></div>
          </div-->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, computed, defineComponent, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import logoMini from '/@/assets/logo-mini.svg';
import loginIconTwo from '/@/assets/logo-mini.svg';
import { NextLoading } from '/@/utils/loading';
import Account from '/@/views/login/component/account.vue';
import Mobile from '/@/views/login/component/mobile.vue';
import Scan from '/@/views/login/component/scan.vue';

// 定义接口来定义对象的类型
interface LoginState {
	tabsActiveName: string;
	isScan: boolean;
}

export default defineComponent({
	name: 'loginIndex',
	components: { Account, Mobile, Scan },
	setup() {
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const state = reactive<LoginState>({
			tabsActiveName: 'account',
			isScan: false,
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => {
			return themeConfig.value;
		});
		// 页面加载时
		onMounted(() => {
			NextLoading.done();
		});
		return {
			logoMini,
			loginIconTwo,
			getThemeConfig,
			...toRefs(state),
		};
	},
});
</script>


<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url("/@/assets/bg.jpg");
  background-size: cover;
  .login-icon-group {
    width: 100%;
    height: 100%;
    position: relative;
    .login-icon-group-title {
      display: flex;
      align-items: center;
      img {
        width: 80px;
        height: 25px;
      }
      &-text {
        padding-left: 5px;
        color: var(--el-color-primary);
      }
    }
    &-icon {
      width: 60%;
      height: 70%;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
  .login-content-out {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .login-content {
    background: url("/@/assets/loginForm.png") no-repeat;
    background-size: 100% 100%;
    width: 1015px;
    height: 413px;
    padding: 100px 300px;
    margin: auto;
    z-index: 1;
    position: relative;
    .login-content-main {
      margin: 0 auto;
      width: 80%;
      .login-content-title {
        color: var(--el-text-color-primary);
        font-weight: 500;
        font-size: 22px;
        text-align: center;
        letter-spacing: 4px;
        margin: 15px 0 30px;
        white-space: nowrap;
        z-index: 5;
        position: relative;
        transition: all 0.3s ease;
      }
    }
    .login-content-main-sacn {
      position: absolute;
      top: 0;
      right: 0;
      width: 50px;
      height: 50px;
      overflow: hidden;
      cursor: pointer;
      transition: all ease 0.3s;
      color: var(--el-text-color-primary);
      &-delta {
        position: absolute;
        width: 35px;
        height: 70px;
        z-index: 2;
        top: 2px;
        right: 21px;
        background: var(--el-color-white);
        transform: rotate(-45deg);
      }
      &:hover {
        opacity: 1;
        transition: all ease 0.3s;
        color: var(--el-color-primary) !important;
      }
      i {
        width: 47px;
        height: 50px;
        display: inline-block;
        font-size: 48px;
        position: absolute;
        right: 2px;
        top: -1px;
      }
    }
  }
  .login-footer{
    position: absolute;
    bottom: 5px;
    width: 100%;
    &-content {
      width: 100%;
      display: flex;
      &-warp {
        margin: auto;
        color: #e0e3e9;
        text-align: center;
        animation: error-num 1s ease-in-out;
      }
    }
  }
}
</style>
