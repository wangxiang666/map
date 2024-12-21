<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-18 21:19:54
 * @LastEditors: 王翔
 * @LastEditTime: 2024-12-21 16:36:04
 * @FilePath: /es-big-screen/Users/wangxiang/ownSystem/map/src/views/visualizing/pages/weapon/components/addWeaponDialog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: wangxiang666 534167821@qq.com
 * @Date: 2024-12-17 20:30:40
 * @LastEditors: wangxiang666 534167821@qq.com
 * @LastEditTime: 2024-12-18 22:52:24
 * @FilePath: /es-big-screen/Users/wangxiang/ownSystem/map/src/views/visualizing/pages/weapon/components/addWeaponDialog.vue
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
            <div class="content"
                 v-for="(item2) in oldParams"
                 :key="item2.key">
              <div class="label">{{item2.label}}</div>
              <span class="unit">{{item2.value}}</span>
              <span class="unit">{{item2.unit}}</span>
            </div>
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
                <span class="unit">{{item2.value}}</span>
                <span class="unit">{{item2.unit}}</span>
              </div>
            </template>
          </div>
        </div>
      </template>
      <div class="form-content">
        <el-form ref="formRef"
                 v-if="step===0"
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
        <stepChartImg v-if="step>0"
                      ref="stepChartImgRef"
                      :chartData="currentChartData"
                      :currentStep="step"
                      @compute="configWeaponParams" />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button class="search-form-btn"
                     type="primary"
                     @click="preStep"
                     v-if="step>0">上一步</el-button>
          <el-button type="primary"
                     class="search-form-btn"
                     @click="nextStep">{{ step===5?'完成':'下一步' }}</el-button>
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
import { computed, nextTick, ref } from 'vue';
import { getAssaultWeaponMgr, addAssaultWeaponMgr, updateAssaultWeaponMgr, configAssaultWeaponParam, uploadImage } from '/@/api/sim/AssaultWeaponMgr';
import { addAssaultWeaponParam } from '/@/api/sim/AssaultWeaponParam'
import { ElMessage } from 'element-plus';
import stepChartImg from './stepChartImg.vue';
const props = defineProps({
  weaponType: Number
});
const fileList = ref([])

const stepTitle = ref([
  '攻击武器管理',
  '导电丝束长度与完全展开时间关系',
  '导电丝束长度与完全展开时间关系',
  '引信引爆高度与引爆时间关系',
  // '导电丝束水平移动距离与时间关系',
  '子弹带伞水平移动距离',
  '散布面积俯视图',
])

const stepForm = ref([])

// 获取本步之前的所有参数
const oldParams = computed(() => {
  const paramsArr = stepForm.value.slice(0, step.value - 1)
  return paramsArr.reduce((pre, cur) => {
    if (cur.needInput) {
      pre.push(...cur.needInput)
    }
    if (cur.needCompute) {
      pre.push(...cur.needCompute)
    }
    return pre
  }, [])
})



const step = ref(0)


const preStep = () => {
  stepForm.value[step.value - 1].hasComputed = false
  step.value--
};
const nextStep = () => {
  if (step.value === 0) {
    onSubmit();
    step.value++
  } else {
    if (!stepForm.value[step.value - 1].hasComputed) {
      ElMessage.warning('请先计算本步参数')
      return
    }
    step.value++
    if (step.value === 6) {
      addWeapon()
    }
  }
};
const addWeapon = () => {
  const allParams = oldParams.value
  const params = {
    weaponType: props.weaponType,
    weaponId: weaponId.value
  }
  allParams.forEach(item => {
    params[item.key] = item.value
  })

  addAssaultWeaponParam(params).then(res => {
    if (res.code === 0) {
      ElMessage.success('添加成功')
      emit('AssaultWeaponMgrList')
      closeDialog()
    }
  })

}
const chartCache = ref({})
const stepKey = ref('Step1')

const currentChartData = computed(() => {
  return chartCache.value[stepKey.value]
})
const stepChartImgRef = ref()
const configWeaponParams = () => {
  let params = {}
  let Xname = ''
  let Yname = ''
  switch (step.value) {
    case 1:
      params = {
        step: 1,
        threadLength: stepForm.value[0].needInput[0].value
      }
      if (params.threadLength < 5 || params.threadLength > 50) {
        ElMessage.warning('导电丝束长度请输入5-50m')
        return
      }
      Xname = '导电丝束长度（M）'
      Yname = '完全展开时间(S)'
      stepKey.value = 'Step1'
      break
    case 2:
      params = {
        step: 2,
        threadLength: stepForm.value[0].needInput[0].value,
        expandDuration: stepForm.value[0].needCompute[0].value,
        detonationTime: stepForm.value[1].needInput[0].value
      }
      Xname = '1/S'
      Yname = '1/M'
      stepKey.value = 'Step2'
      break
    case 3:
      params = {
        step: 3,
        detonationTime: stepForm.value[1].needInput[0].value
      }
      Xname = '引爆时间(t)'
      Yname = '引爆高度(m)'
      stepKey.value = 'Step3'
      break
    case 4:
      params = {
        step: 4,
        threadLength: stepForm.value[0].needInput[0].value,
        lengthCylinder: stepForm.value[3].needInput[0].value,
        diameterCylinder: stepForm.value[3].needInput[1].value,
        massCylinder: stepForm.value[3].needInput[2].value,
        diameterParachute: stepForm.value[3].needInput[3].value,
        initialHeight: stepForm.value[3].needInput[4].value,
        initialHorizontalSpeed: stepForm.value[3].needInput[5].value
      }
      Xname = '带伞飞行时间'
      Yname = '水平移动距离（m）'
      stepKey.value = 'Step4'
      break
    case 5:
      params = {
        step: 5,
        bulletNumber: stepForm.value[4].needInput[0].value,
        fiberBundleNumber: stepForm.value[4].needInput[1].value,
        fiberLength: stepForm.value[4].needInput[2].value,
        squareSide: stepForm.value[4].needInput[3].value,
      }
      Xname = '散布长度（m）'
      Yname = '散布宽度（m）'
      stepKey.value = 'Step5'
      break
  }

  configAssaultWeaponParam(params).then(res => {
    stepForm.value[step.value - 1].hasComputed = true
    const resdata = res.data[stepKey.value]

    switch (step.value) {
      case 1:
        stepForm.value[0].needCompute[0].value = resdata.ExpandTime
        break
      case 2:
        break
      case 3:
        stepForm.value[2].needCompute[0].value = resdata.DetonationHeight
        break
      case 4:
        stepForm.value[3].needCompute[0].value = resdata.CurrentHorizontalDistance
        stepForm.value[3].needCompute[1].value = resdata.VerticalDistanceAtThreshold
        stepForm.value[3].needCompute[2].value = resdata.TotalTime
        break
      case 5:
        stepForm.value[4].needCompute[0].value = resdata.Radius
        stepForm.value[4].needCompute[1].value = resdata.Area
        break
    }
    if (step.value !== 5) {
      const xData = resdata.X;
      const yData = resdata.Y;
      chartCache.value[stepKey.value] = { xData, yData, Xname, Yname }
    } else {
      stepChartImgRef.value.updateCircle(resdata.Radius)
    }
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

const weaponId = ref(0)
// 提交
const onSubmit = () => {
  const formWrap = formRef.value;
  if (!formWrap) return;
  formWrap.validate((valid) => {
    if (valid) {
      loading.value = true;
      const form = new FormData();
      // for (let i in formData.value) {
      //   if (i !== 'file') {
      //     form.append(i, formData.value[i])
      //   } else {
      //     // form.append(i, fileList.value[0].raw)
      //   }
      // }
      form.append('file', fileList.value[0].raw)
      uploadImage(form).then((res) => {
        formData.value.image = res.data.name
        formData.value.weaponType = props.weaponType
        if (!formData.value.id || formData.value.id === 0) {
          //添加
          addAssaultWeaponMgr(formData.value).then((res) => {
            weaponId.value = res.data.WeaponId
            // emit('AssaultWeaponMgrList')
          }).finally(() => {
            loading.value = false;
          })
        } else {
          //修改
          updateAssaultWeaponMgr(formData.value).then(() => {
            emit('AssaultWeaponMgrList')
          }).finally(() => {
            loading.value = false;
          })
        }
      })
      // form.append('weaponType', props.weaponType)

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
  step.value = 0
  stepForm.value = [
    {
      needInput: [
        {
          label: '导电丝束长度：',
          key: 'threadLength',
          value: 0,
          unit: 'm'
        }
      ],
      needCompute: [
        {
          label: '完全展开时间：',
          key: 'expandTime',
          value: '- -',
          unit: 's'
        }
      ],
      hasComputed: false
    },
    {
      needInput: [
        {
          label: '引爆时间：',
          key: 'detonationTime',
          value: 0,
          unit: 's',
          note: '观测曲线，在平滑部分，确定引信引爆时间，时间要大于完全展开时间，例如t=30s>t=15.5s'
        }
      ],
      hasComputed: false
    },
    {
      needCompute: [
        {
          label: '引爆高度：',
          key: 'detonationHeight',
          value: '- -',
          unit: 'm',
          note: '通过设置时间30s，计算引信引爆高度，hy=72m'
        }
      ],
      hasComputed: false
    },
    {
      needInput: [
        {
          label: '子弹长度：',
          key: 'lengthCylinder',
          value: 0,
          unit: 'm'
        },
        {
          label: '子弹直径：',
          key: 'diameterCylinder',
          value: 0,
          unit: 'm'
        },
        {
          label: '子弹重量：',
          key: 'massCylinder',
          value: 0,
          unit: 'kg'
        },
        {
          label: '伞直径：',
          key: 'diameterParachute',
          value: 0,
          unit: 'cm'
        },
        {
          label: '初始高度：',
          key: 'initialHeight',
          value: 0,
          unit: 'm'
        },
        {
          label: '散布水平速度：',
          key: 'initialHorizontalSpeed',
          value: 0,
          unit: 'm/s',
          note: '散步器战斧巡航导弹巡航速度0.752马赫 0.75 x 340 = 255m/s'
        },
      ],
      needCompute: [
        // {
        //   label: '水平降速到0：',
        //   key: 'ExpandTime',
        //   value: '- -',
        //   unit: 's'
        // },
        {
          label: '子弹带伞水平移动：',
          key: 'currentHorizontalDistance',
          value: '- -',
          unit: 'm'
        },
        {
          label: '子弹带伞垂直移动：',
          key: 'verticalDistanceAtThreshold',
          value: '- -',
          unit: 'm'
        },
        {
          label: '子弹带伞飞行总时间：',
          key: 'totalTime',
          value: '- -',
          unit: 's'
        },
        // {
        //   label: '水平移动：',
        //   key: 'ExpandTime',
        //   value: '- -',
        //   unit: 's',
        //   note: '水平移动距离 = 带伞移动距离 + 丝束动距离'
        // },
      ],
      hasComputed: false
    },
    {
      needInput: [
        {
          label: '子弹数量：',
          key: 'bulletNumber',
          value: 0,
          unit: '个'
        },
        {
          label: '丝束数量：',
          key: 'fiberBundleNumber',
          value: 0,
          unit: '个'
        },
        {
          label: '丝束长度：',
          key: 'fiberLength',
          value: 0,
          unit: 'm'
        },
        {
          label: '小正方形边长：',
          key: 'squareSide',
          value: 0,
          unit: 'm'
        },
        // {
        //   label: '设定密度：',
        //   key: 'threadLength',
        //   value: 0,
        //   unit: 'm',
        //   note: '假设理想散布面是圆形，圆形有纤维丝交织成边长为a=1/12(m)的小正方形编织而成；a=1/12(m)是通过中国公开毁伤面积推算出来的，1/12(m)，即使分散不均匀，也足以实现毁伤。'
        // },
      ],
      needCompute: [
        {
          label: '圆形散布半径：',
          key: 'dispersionRadius',
          value: '- -',
          unit: 'm'
        },
        {
          label: '圆形散布面积：',
          key: 'dispersionArea',
          value: '- -',
          unit: 'm²'
        },
      ],
      hasComputed: false
    },
    {}

  ]
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
		width: 220px;
		min-height: 220px;
		background: url('../../../images/weapon-step-small.png') no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 58px;
		right: -280px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 8px 10px;
		box-sizing: content-box;
		&::before {
			content: '';
			position: absolute;
			width: 205px;
			height: 40px;
			top: -32px;
			left: -75px;
			background: url('../../../images/step-line.png') no-repeat;
			background-size: 100% 100%;
		}

		.title {
			color: #fff;
			font-size: 14px;
			line-height: 16px;
			margin-top: 10px;
			font-weight: bolder;
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
				white-space: nowrap;
			}
			.el-input {
				height: 24px;
				width: 80px;
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
