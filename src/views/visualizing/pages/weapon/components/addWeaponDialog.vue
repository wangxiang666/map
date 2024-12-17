<template>
  <div class="sim-AssaultWeaponMgr-edit">
    <el-dialog v-model="isShowDialog"
               width="769px"
               :close-on-click-modal="false"
               :destroy-on-close="true">
      <el-form ref="formRef"
               :model="formData"
               label-width="90px">
        <el-form-item label="名称"
                      prop="name">
          <el-input v-model="formData.name"
                    placeholder="请输入名称" />
        </el-form-item>
        <!-- <el-form-item label="毁伤类型"
                      prop="damageType">
          <el-select v-model="formData.damageType"
                     placeholder="请选择毁伤类型">
            <el-option label="硬毁伤"
                       value="硬毁伤" />
            <el-option label="信息毁伤"
                       value="信息毁伤" />
          </el-select>
        </el-form-item> -->
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
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary"
                     @click="nextStep">下一步</el-button>
          <el-button @click="">上一步</el-button>
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
import { ref, getCurrentInstance } from 'vue';
import { getAssaultWeaponMgr, addAssaultWeaponMgr, updateAssaultWeaponMgr } from '/@/api/sim/AssaultWeaponMgr';
import { ElMessage } from 'element-plus';
const props = defineProps({
  weaponType: Number
});
const fileList = ref([])

const handleRemove = (uploadFile, uploadFiles) => {
  // console.log(uploadFile, uploadFiles)
}

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
.sim-AssaultWeaponMgr-edit :deep(.avatar-uploader .avatar) {
	width: 178px;
	height: 178px;
	display: block;
}
.sim-AssaultWeaponMgr-edit :deep(.avatar-uploader .el-upload) {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}
.sim-AssaultWeaponMgr-edit :deep(.avatar-uploader .el-upload:hover) {
	border-color: var(--el-color-primary);
}
.sim-AssaultWeaponMgr-edit :deep(.el-icon.avatar-uploader-icon) {
	font-size: 28px;
	color: #1c71e8;
	width: 178px;
	height: 178px;
	text-align: center;
}
:deep(.el-dialog) {
	background: url('../../../images/weapon-step.png') no-repeat;
	background-size: 100% 100%;
}
:deep(.preview-dialog) {
	.el-dialog__body {
		overflow-x: auto;
	}
}
</style>
