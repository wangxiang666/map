<template>
  <div class="display-container"
       v-loading="loading">
    <div class="weapons-grid">
      <div v-for="weapon in weapons"
           :key="weapon.id"
           class="weapon-card">
        <!-- 武器图片占位 -->
        <!-- <img :src="weapon.image"
             class="weapon-image"> -->
        <div class="weapon-image-placeholder"></div>
        <div class="weapon-name">{{ weapon.name }}</div>
        <el-button link
                   class="delete-btn"
                   @click="deleteWeapon(weapon.id)">
          <el-icon>
            <ele-Delete />
          </el-icon>
        </el-button>
      </div>
      <div class="weapon-card add"
           @click="addWeapon">
        <div class="weapon-image-placeholder">
          <span>新增 +</span>
        </div>
      </div>
    </div>
    <addWeaponDialog ref="addWeaponRef"
                     :weaponType="currentWeaponType"
                     @AssaultWeaponMgrList="AssaultWeaponMgrList"></addWeaponDialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  listAssaultWeaponMgr,
  getAssaultWeaponMgr,
  delAssaultWeaponMgr,
  addAssaultWeaponMgr,
  updateAssaultWeaponMgr,
} from '/@/api/sim/AssaultWeaponMgr';
import addWeaponDialog from './addWeaponDialog.vue';

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
      delAssaultWeaponMgr({ ids: [id] }).then(res => {
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
	grid-template-columns: repeat(4, 1fr);
	gap: 20px;
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

.weapon-name {
	color: #1890ff;
	font-size: 24px;
}
</style>
