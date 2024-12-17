<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-17 20:30:40
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-18 00:12:26
 * @FilePath: \map\src\views\visualizing\pages\weapon\components\addWeaponDialog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-17 20:30:40
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-17 23:19:31
 * @FilePath: \map\src\views\visualizing\pages\weapon\components\addWeaponDialog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="sim-AssaultWeaponMgr-edit">
    <el-dialog v-model="isShowDialog"
               width="769px"
               :close-on-click-modal="false"
               :destroy-on-close="true">
      <template #header>
        <div class="step-title">
          <span>{{stepTitle[step]}}</span>
          <div class="right-small-box"
               v-if="step>0">
            <div class="title">武器参数</div>
            <template v-if="stepForm[step-1].needInput">
              <div class="title2">待输入参数</div>
              <div class="content"
                   v-for="(item2) in stepForm[step-1].needInput"
                   :key="item2.key">
                <div class="label">{{item2.label}}</div>
                <el-input v-model="item2.value"></el-input>
                <span class="unit">{{item2.unit}}</span>
              </div>
            </template>
            <template v-if="stepForm[step-1].needCompute">
              <div class="title2">待计算参数</div>
              <div class="content"
                   v-for="(item2) in stepForm[step-1].needCompute"
                   :key="item2.key">
                <div class="label">{{item2.label}}</div>
                <span class="unit">{{item2.value||'- - '}}</span>
                <span class="unit">{{item2.unit}}</span>
              </div>
            </template>
          </div>
        </div>
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
        <div ref="stepChart"
             style="width: 100%; height: 290px;"></div>
        <el-button @click="configWeaponParams">计算</el-button>
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
import { nextTick, ref } from 'vue';
import { getAssaultWeaponMgr, addAssaultWeaponMgr, updateAssaultWeaponMgr, configAssaultWeaponParam } from '/@/api/sim/AssaultWeaponMgr';
import { ElMessage } from 'element-plus';
import { useECharts } from '/@/views/visualizing/hook/useEcharts.js';
const props = defineProps({
  weaponType: Number
});
const fileList = ref([])

const stepTitle = ref([
  '攻击武器管理',
  '导电丝束长度与完全展开时间关系',
  '导电丝束长度与完全展开时间关系',
  '引信引爆高度与引爆时间关系',
  '导电丝束水平移动距离与时间关系',
  '子弹带伞水平移动距离',
  '散布面积俯视图',
])

const currentParams = ref({})
const stepForm = ref([
  {
    needInput: [
      {
        label: '导电丝束长度：',
        key: 'threadLength',
        value: 0,
        unit: 'M'
      }
    ],
    needCompute: [
      {
        label: '完全展开时间：',
        key: 'fullExpansionTime',
        value: 0,
        unit: 'S'
      }
    ]
  },

])




const step = ref(0)

const nextStep = () => {
  if (step.value === 0) {
    onSubmit();
  } else {
  }
  step.value++
};
const stepChart = ref();
const configWeaponParams = () => {
  let params = {}
  let Xname = ''
  let Yname = ''
  let stepKey = 'Step1'
  switch (step.value) {
    case 1:
      params = {
        step: 1,
        threadLength: stepForm.value[0].needInput[0].value
      }
      Xname = '导电丝束长度（M）'
      Yname = '完全展开时间(S)'
      stepKey = 'Step1'
      break
  }
  configAssaultWeaponParam(params).then(res => {
    const xData = res.data[stepKey].X;
    const yData = res.data[stepKey].Y;
    const { initChart } = useECharts(stepChart, xData, yData, Xname, Yname);
    nextTick(() => {
      initChart()
    })
  })
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
          // form.append(i, fileList.value[0].raw)
        }
      }
      form.append('weaponType', props.weaponType)
      if (!formData.value.id || formData.value.id === 0) {
        //添加
        addAssaultWeaponMgr(form).then(() => {
          emit('AssaultWeaponMgrList')
        }).finally(() => {
          loading.value = false;
        })
      } else {
        //修改
        updateAssaultWeaponMgr(form).then(() => {
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
	overflow: visible;
	position: relative;
	.right-small-box {
		width: 206px;
		min-height: 220px;
		background: url('../../../images/weapon-step-small.png') no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 58px;
		right: -280px;
		display: flex;
		flex-direction: column;
		align-items: center;
		&::before {
			content: '';
			position: absolute;
			width: 212px;
			height: 40px;
			top: -32px;
			left: -102px;
			background: url('../../../images/step-line.png') no-repeat;
			background-size: 100% 100%;
		}

		.title {
			color: #fff;
			font-size: 14px;
			line-height: 16px;
			margin-top: 10px;
		}
		.title2 {
			color: #fff;
			font-size: 12px;
			line-height: 16px;
			margin-top: 10px;
		}
		.content {
			display: flex;
			align-items: center;
			width: 100%;
			padding: 0 12px;
			height: 32px;
			.label {
				font-size: 12px;
				white-space: nowrap;
				height: 12px;
				line-height: 12px;
			}
			.unit {
				margin-left: 4px;
				color: #e1aa1c;
				font-size: 14px;
			}
			.el-input {
				height: 24px;
			}
			:deep(.el-input__wrapper) {
				padding: 0 8px;
				flex: 1;
				height: 24px;
			}
			:deep(.el-input__inner) {
				color: #e1aa1c;
				font-size: 14px;
			}
		}
	}
}
.form-content {
	height: 496px;
	padding: 0 70px 0 20px;
}
</style>
