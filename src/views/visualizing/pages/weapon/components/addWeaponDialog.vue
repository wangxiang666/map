<template>
  <div class="sim-AssaultWeaponMgr-edit">
    <el-dialog v-model="isShowDialog"
               width="769px"
               :close-on-click-modal="false"
               :destroy-on-close="true">
      <template #header>
        <div class="step-title">{{stepTitle[step]}}</div>
      </template>
      <div class="form-content">
        <el-form ref="formRef"
                 v-show="step===0"
                 :model="formData"
                 label-width="90px">
          <el-form-item label="名称"
                        prop="name">
            <el-input v-model="formData.name"
                      placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="图片"
                        prop="image">
            <el-upload v-model:file-list="fileList"
                       class="upload-demo"
                       :on-preview="handlePreview"
                       :on-remove="handleRemove"
                       :on-change="(file) => {fileList = file.rawFileList }"
                       :limit="1"
                       :auto-upload="false"
                       list-type="picture-card">
              <el-icon class="avatar-uploader-icon"><ele-Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="描述"
                        prop="note">
            <el-input v-model="formData.note"
                      type="textarea"
                      :rows="4"
                      placeholder="请输入描述" />
          </el-form-item>
        </el-form>

        <div class="right-small-box"></div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button class="search-form-btn"
                     type="primary"
                     @click="preStep"
                     v-if="step>0">上一步</el-button>
          <el-button type="primary"
                     class="search-form-btn"
                     v-if="step<6"
                     @click="nextStep">下一步</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogVisible"
               class="preview-dialog">
      <img w-full
           :src="dialogImageUrl"
           alt="Preview Image" />
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { getAssaultWeaponMgr, addAssaultWeaponMgr, updateAssaultWeaponMgr } from '/@/api/sim/AssaultWeaponMgr';
import { ElMessage } from 'element-plus';
const props = defineProps({
  weaponType: Number
});
const fileList = ref([])

const handleRemove = (uploadFile, uploadFiles) => {
  // console.log(uploadFile, uploadFiles)
}
const stepTitle = ref([
  '攻击武器管理',
  '导电丝束长度与完全展开时间关系',
  '导电丝束长度与完全展开时间关系',
  '引信引爆高度与引爆时间关系',
  '导电丝束水平移动距离与时间关系',
  '子弹带伞水平移动距离',
  '散布面积俯视图',
])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handlePreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const isShowDialog = ref(false);

const formData = ref({
  name: undefined,
  image: undefined,
  note: undefined,
  file: undefined,
});
// 打开弹窗
const openDialog = (row) => {
  resetForm();
  if (row) {
    getAssaultWeaponMgr(row.id).then((res) => {
      const data = res.data;
      formData.value = data;
    });
  }
  isShowDialog.value = true;
};
const formRef = ref()
const loading = ref(false);
const emit = defineEmits(['AssaultWeaponMgrList']);

const step = ref(0)

const nextStep = () => {
  if (step.value === 0) {
    onSubmit();
  } else {

  }
  step.value++
};
const preStep = () => {
  step.value--
};
// 提交
const onSubmit = () => {
  const formWrap = formRef.value;
  if (!formWrap) return;
  formWrap.validate((valid) => {
    if (valid) {
      loading.value = true;
      const form = new FormData();
      for (let i in formData.value) {
        if (i !== 'file') {
          form.append(i, formData.value[i])
        } else {
          form.append(i, fileList.value[0].raw)
        }
      }
      form.append('weaponType', props.weaponType)
      if (!formData.value.id || formData.value.id === 0) {
        //添加
        addAssaultWeaponMgr(form).then(() => {
          ElMessage.success('添加成功');
          closeDialog(); // 关闭弹窗
          emit('AssaultWeaponMgrList')
        }).finally(() => {
          loading.value = false;
        })
      } else {
        //修改
        updateAssaultWeaponMgr(form).then(() => {
          ElMessage.success('修改成功');
          closeDialog(); // 关闭弹窗
          emit('AssaultWeaponMgrList')
        }).finally(() => {
          loading.value = false;
        })
      }
    }
  });
};
const resetForm = () => {
  formData.value = {
    file: undefined,
    name: undefined,
    image: undefined,
    note: undefined,
  };
};

// 关闭弹窗
const closeDialog = () => {
  isShowDialog.value = false;
};
defineExpose({
  openDialog,
});
</script>
<style scoped lang="scss">
:deep(.el-dialog) {
	background: url('../../../images/weapon-step.png') no-repeat;
	background-size: 100% 100%;
}
:deep(.preview-dialog) {
	.el-dialog__body {
		overflow-x: auto;
	}
}
.dialog-footer {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 50px;
}
:deep(.el-dialog) {
	--el-dialog-padding-primary: 4px 10px;
}
:deep(.el-dialog__headerbtn) {
	right: 50px;
	.el-dialog__close {
		color: #fff;
	}
}
.step-title {
	text-align: center;
	height: 40px;
	line-height: 58px;
}
.form-content {
	height: 496px;
	padding: 0 70px 0 20px;
	overflow: visible;
	position: relative;
	.right-small-box {
		width: 302px;
		height: 252px;
		background: url('../../../images/weapon-step-small.png') no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 100px;
		right: -100px;
	}
}
</style>
