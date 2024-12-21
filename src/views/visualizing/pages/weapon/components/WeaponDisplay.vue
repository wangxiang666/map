<template>
  <div class="display-container"
       v-loading="loading">
    <el-scrollbar>
      <div class="weapons-grid">
        <div class="weapon-card add"
             @click="addWeapon">
          <div class="weapon-image-placeholder">
            <span>新增 +</span>
          </div>
        </div>
        <div v-for="weapon in weapons"
             :key="weapon.id"
             class="weapon-card">
          <div class="weapon-image-placeholder">
            <el-image :src="proxy.getUpFileUrl('images/'+weapon.image)"
                      scroll-container=".weapons-grid"
                      lazy
                      class="weapon-image"
                      @click="showWeapon(weapon.id)">

              <template #error>
                <div class="image-slot">
                  暂无图片
                </div>
              </template>
            </el-image>
          </div>
          <div class="weapon-name">{{ weapon.name }}</div>
          <el-button link
                     class="delete-btn"
                     @click="deleteWeapon(weapon.id)">
            <el-icon>
              <ele-Delete />
            </el-icon>
          </el-button>
        </div>

      </div>
    </el-scrollbar>
    <addWeaponDialog ref="addWeaponRef"
                     :weaponType="currentWeaponType"
                     @AssaultWeaponMgrList="AssaultWeaponMgrList"></addWeaponDialog>
    <weaponDetail ref="weaponDetailRef" />
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  listAssaultWeaponMgr,
  getAssaultWeaponMgr,
  delAssaultWeaponMgr,
  addAssaultWeaponMgr,
  updateAssaultWeaponMgr,
} from '/@/api/sim/AssaultWeaponMgr';
import addWeaponDialog from './addWeaponDialog.vue';
import weaponDetail from './weaponDetail.vue'
const { proxy } = getCurrentInstance();
const deleteWeapon = (id) => {
  ElMessageBox({
    closeOnClickModal: false,
    closeOnPressEscape: false,
    title: '提示',
    message: '你确定要删除该模型吗？',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    buttonSize: 'default',
  })
    .then(async () => {
      delAssaultWeaponMgr([id]).then(res => {
        if (res.code === 0) {
          ElMessage.success('删除成功');
          AssaultWeaponMgrList()
        }
      })
    })
    .catch(() => { });

}

const loading = ref(false);

const weapons = ref([]);

const currentWeaponType = ref(1);
const currentSearch = ref({})
const AssaultWeaponMgrList = () => {
  getWeaponData(currentSearch.value.damageType, currentSearch.value.weaponType)
}
const getWeaponData = (damageType, weaponType) => {
  currentSearch.value = {
    damageType,
    weaponType
  }
  currentWeaponType.value = weaponType;
  loading.value = true;
  listAssaultWeaponMgr({ weaponType }).then((res) => {
    let list = res.data.list ?? [];
    weapons.value = list;
    loading.value = false;
  });
};

const addWeaponRef = ref();
const addWeapon = () => {
  addWeaponRef.value.openDialog();
};
const weaponDetailRef = ref()
const showWeapon = (id) => {
  getAssaultWeaponMgr(id).then(res => {
    weaponDetailRef.value.open(res.data)
  })
}
defineExpose({
  getWeaponData,
});
</script>

<style scoped lang="scss">
.display-container {
	flex: 1;
	border: 1px solid #1890ff;
	border-radius: 4px;
	padding: 20px;
}

.weapons-grid {
	display: grid;
	height: 100%;
	grid-template-columns: repeat(4, 1fr);
	gap: 20px;
	overflow-y: auto;
}

.weapon-card {
	text-align: center;
	position: relative;
	.delete-btn {
		position: absolute;
		top: 0;
		right: 0;
		color: #fff;
	}
}

.weapon-image-placeholder {
	width: 100%;
	height: 207px;
	background: url('../../../images/weapon-box.png') no-repeat;
	background-size: 100% 100%;
	margin-bottom: 10px;
	color: #1890ff;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 36px;
	cursor: pointer;
}
.weapon-image {
	width: calc(100% - 20px);
	height: 170px;
	margin-top: 20px;
	.image-slot {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}
}
.weapon-name {
	color: #1890ff;
	font-size: 24px;
}
:deep(.el-image__error) {
	background: none;
}
</style>
