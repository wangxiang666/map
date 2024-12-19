<template>
  <div class="add-form">
    <h2 class="title">新增推演任务</h2>
    <el-form ref="formRef"
             :model="formData"
             :rules="rules"
             label-width="auto"
             label-position="right">
      <el-form-item label="任务名称"
                    prop="name">
        <el-input v-model="formData.name"
                  placeholder="请输入预案名称" />
      </el-form-item>

      <el-form-item label="描述"
                    prop="note">
        <el-input type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  v-model="formData.note">
        </el-input>
      </el-form-item>

      <el-form-item label="攻击目标"
                    prop="destroy_target">
        <el-select v-model="formData.destroy_target"
                   placeholder="请选择攻击目标">
          <el-option v-for="item in destroyTargetList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="毁伤预案"
                    prop="destroy_plan">
        <el-select v-model="formData.destroy_plan"
                   placeholder="请选择毁伤预案">
          <el-option v-for="item in destroyPlanList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="控制方式"
                    prop="control_mode">
        <el-radio-group v-model="formData.control_mode">
          <el-radio label="1"
                    size="large">人不在回路</el-radio>
          <el-radio label="2"
                    size="large">人在回路</el-radio>
        </el-radio-group>
      </el-form-item>

      <div class="submit-bottom">
        <el-button type="primary"
                   class="submit-btn bg-form-btn"
                   @click="onSubmit">确认</el-button>
        <el-button type="primary"
                   class="submit-btn bg-form-btn"
                   @click="onCancel">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, ref, unref, getCurrentInstance, computed, onMounted } from 'vue';
import { ElMessageBox, ElMessage, FormInstance, UploadProps } from 'element-plus';
import { listDeductionMgr, getDeductionMgr, addDeductionMgr, updateDeductionMgr, delDeductionMgr } from '/@/api/sim/DeductionMgr';
import { listPlanMgr } from '/@/api/sim/PlanMgr';

import { listPowerFlowNodeMgr } from '/@/api/sim/PowerFlowNode';

import { DeductionMgrTableColumns, DeductionMgrInfoData, DeductionMgrTableDataState, DeductionMgrEditState } from './model';
export default defineComponent({
	name: 'apiV1SimDeductionMgrEdit',
	components: {},
	props: {},

	setup(props, { emit }) {
		const { proxy } = <any>getCurrentInstance();
		const formRef = ref<HTMLElement | null>(null);
		const menuRef = ref();
		const state = reactive<DeductionMgrEditState>({
			loading: false,
			formData: {
				id: undefined,
				name: undefined,
				destroy_target: undefined, //毁伤目标
				destroy_plan: undefined, // 毁伤预案
				control_mode: undefined, // 控制方式
				status: undefined, // 状态
				damage_area: undefined, // 毁伤面积
				percentage_damage_degree: undefined, // 毁伤面积百分比
				weapon_valid_percent: undefined, // 武器有效百分比
				active_power_mw_after: undefined, // 毁伤后有功功率(MW)
				operator: undefined,
				createdAt: undefined,
				updatedAt: undefined,
				note: undefined,
			},
			// 表单校验
			rules: {
				name: [{ required: true, message: '预案名称不能为空', trigger: 'blur' }],
				destroy_target: [{ required: true, message: '毁伤目标', trigger: 'blur' }],
				destroy_plan: [{ required: true, message: '毁伤预案', trigger: 'blur' }],
				control_mode: [{ required: true, message: '控制方式', trigger: 'blur' }],
			},
			destroyTargetList: [],
			destroyPlanList: [],
		});

		// 获取毁伤目标列表
		const fetchDestroyTargetList = () => {
			listPowerFlowNodeMgr({ attack_flag: 1 }).then((res: any) => {
				let list = res.data.list ?? [];
				state.destroyTargetList = list;
			});
		};

		// 获取毁伤目标列表
		const fetchDestroyPlanList = () => {
			listPlanMgr().then((res: any) => {
				let list = res.data.list ?? [];
				state.destroyPlanList = list;
			});
		};

		onMounted(() => {
			fetchDestroyTargetList();
			fetchDestroyPlanList();
		});

		// 打开弹窗
		const openDialog = (row?: DeductionMgrInfoData) => {
			resetForm();
			if (row) {
				getDeductionMgr(row.id!).then((res: any) => {
					const data = res.data;
					data.damageType = parseInt(data.damageType);
					data.attackMethod = '' + data.attackMethod;
					data.defenseFlag = parseInt(data.defenseFlag);
					data.defensiveWeapon = '' + data.defensiveWeapon;
					state.formData = data;
				});
			}
		};
		// 取消
		const onCancel = () => {
			emit('cancel');
		};
		// 提交
		const onSubmit = () => {
			const formWrap = unref(formRef) as any;
			if (!formWrap) return;
			formWrap.validate((valid: boolean) => {
				if (valid) {
					state.loading = true;
					if (!state.formData.id || state.formData.id === 0) {
						//添加
						addDeductionMgr(state.formData)
							.then(() => {
								ElMessage.success('添加成功');
								emit('operateDone');
							})
							.finally(() => {
								state.loading = false;
							});
					} else {
						//修改
						updateDeductionMgr(state.formData)
							.then(() => {
								ElMessage.success('修改成功');
								emit('operateDone');
							})
							.finally(() => {
								state.loading = false;
							});
					}
				}
			});
		};
		const resetForm = () => {
			state.formData = {
				id: undefined,
				name: undefined,
				damageType: undefined,
				attackMethod: undefined,
				weaponModel: undefined,
				weaponNum: undefined,
				defenseFlag: 0,
				defensiveWeapon: undefined,
				windType: undefined,
				windNum: undefined,
				windH: undefined,
				operator: undefined,
				createdAt: undefined,
				updatedAt: undefined,
			};
		};

		return {
			// defensiveWeaponOptions,
			// attackMethodOptions,
			proxy,
			openDialog,
			onCancel,
			onSubmit,
			menuRef,
			formRef,
			// fetchDataForGrapheneBomb,
			...toRefs(state),
		};
	},
});
</script>


<style scoped>
.add-form {
	padding: 30px;
	border-radius: 8px;
	color: #fff;
}

.title {
	text-align: center;
	color: #fff;
	margin-bottom: 60px;
}
.submit-bottom {
	width: 100%;
	display: flex;
	justify-content: center;
}
.submit-btn {
	width: 248px;
	height: 60px;
	font-size: 28px;
	margin: 0 auto;
}

:deep(.el-switch__core) {
	border-color: #0a5999 !important;
	background: rgba(0, 60, 120, 0.3) !important;
}
:deep(.el-form-item) {
	margin-bottom: 24px;
}
</style>
