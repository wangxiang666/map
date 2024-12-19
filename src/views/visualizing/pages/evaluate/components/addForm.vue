<template>
  <div class="add-form">
    <h2 class="title">{{mode==='view'?'查看':!formData.id || formData.id==0?'新增':'编辑'}}评估任务</h2>
    <el-form ref="formRef"
             :model="formData"
             :rules="rules"
             label-width="auto"
             :disabled="mode === 'view'"
             label-position="right">
      <el-form-item label="名称"
                    prop="name">
        <el-input v-model="formData.name"
                  placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="推演任务"
                    prop="deduction">
        <el-input v-model="formData.deduction"
                  placeholder="请输入推演任务" />
      </el-form-item>
      <el-form-item label="评估指标"
                    prop="target">
        <el-select v-model="formData.target"
                   placeholder="请选择评估指标">
          <el-option v-for="item in targetOptions"
                     :key="item.key"
                     :label="item.value"
                     :value="item.key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="评估算法"
                    prop="algorithm">
        <el-select v-model="formData.algorithm"
                   placeholder="请选择评估算法">
          <el-option v-for="dict in sim_evaluation_algorithm"
                     :key="dict.value"
                     :label="dict.label"
                     :value="dict.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="评估结果"
                    prop="result">
        <el-input v-model="formData.result"
                  placeholder="请输入评估结果" />
      </el-form-item>
      <el-form-item label="状态"
                    prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio v-for="dict in sim_evaluation_status"
                    :key="dict.value"
                    :label="dict.value">{{dict.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="描述"
                    prop="note">
        <el-input v-model="formData.note"
                  type="textarea"
                  placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="操作员"
                    prop="operator">
        <el-input v-model="formData.operator"
                  placeholder="请输入操作员" />
      </el-form-item>

    </el-form>
    <div class="submit-bottom">
      <el-button type="primary"
                 class="submit-btn bg-form-btn"
                 v-if="mode === 'edit'"
                 @click="onSubmit">确认</el-button>
      <el-button type="primary"
                 class="submit-btn bg-form-btn"
                 @click="onCancel">返回</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ItemOptions } from '/@/api/items';
import { reactive, toRefs, defineComponent, ref, unref, getCurrentInstance, onMounted } from 'vue';
import { ElMessageBox, ElMessage, FormInstance, UploadProps } from 'element-plus';
import {
	listEvaluationMgr,
	getEvaluationMgr,
	delEvaluationMgr,
	addEvaluationMgr,
	updateEvaluationMgr,
	listDeductionMgr,
	listEvaluationTargetMgr,
	linkedDataSearch,
} from '/@/api/sim/EvaluationMgr';
import { EvaluationMgrTableColumns, EvaluationMgrInfoData, EvaluationMgrTableDataState, EvaluationMgrEditState } from './model';
export default defineComponent({
	name: 'apiV1SimEvaluationMgrEdit',
	components: {},
	setup(props, { emit }) {
		const mode = ref<string | undefined>('edit');
		const { proxy } = <any>getCurrentInstance();
		const formRef = ref<HTMLElement | null>(null);
		const menuRef = ref();
		const state = reactive<EvaluationMgrEditState>({
			loading: false,
			isShowDialog: false,
			formData: {
				id: undefined,
				name: undefined,
				deduction: undefined,
				target: undefined,
				algorithm: undefined,
				result: undefined,
				status: false,
				note: undefined,
				operator: undefined,
				createdAt: undefined,
				updatedAt: undefined,
				linkedEvaluationMgrDeductionMgr: {
					id: undefined, // 序号
					name: undefined, // 任务名称
				},
				linkedEvaluationMgrEvaluationTargetMgr: {
					id: undefined, // 序号
					name: undefined, // 指标名称
				},
			},
			// 表单校验
			rules: {
				name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
				updatedAt: [{ required: true, message: '更新时间不能为空', trigger: 'blur' }],
			},
		});
		// 打开弹窗
		const openDialog = (row?: EvaluationMgrInfoData, flag?: 'string' | undefined) => {
			mode.value = flag;
			resetForm();
			if (row) {
				getEvaluationMgr(row.id!).then((res: any) => {
					const data = res.data;
					data.target = parseInt(data.target);
					data.algorithm = '' + data.algorithm;
					data.status = '' + data.status;
					state.formData = data;
				});
			}
			state.isShowDialog = true;
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
						addEvaluationMgr(state.formData)
							.then(() => {
								ElMessage.success('添加成功');
								emit('operateDone');
							})
							.finally(() => {
								state.loading = false;
							});
					} else {
						//修改
						updateEvaluationMgr(state.formData)
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
				deduction: undefined,
				target: undefined,
				algorithm: undefined,
				result: undefined,
				status: false,
				note: undefined,
				operator: undefined,
				createdAt: undefined,
				updatedAt: undefined,
				linkedEvaluationMgrDeductionMgr: {
					id: undefined, // 序号
					name: undefined, // 任务名称
				},
				linkedEvaluationMgrEvaluationTargetMgr: {
					id: undefined, // 序号
					name: undefined, // 指标名称
				},
			};
		};
		onMounted(() => {
			linkedData();
		});
		// deductionOptions关联表数据
		const deductionOptions = ref<Array<ItemOptions>>([]);
		const targetOptions = ref<Array<ItemOptions>>([]);
		const linkedData = () => {
			linkedDataSearch().then((res: any) => {
				//关联sim_deduction_mgr表选项
				deductionOptions.value = proxy.setItems(res, 'id', 'name', 'linkedEvaluationMgrDeductionMgr');
				//关联sim_evaluation_target_mgr表选项
				targetOptions.value = proxy.setItems(res, 'id', 'name', 'linkedEvaluationMgrEvaluationTargetMgr');
			});
		};
		// 字典选项数据
		const { sim_evaluation_algorithm, sim_evaluation_status } = proxy.useDict('sim_evaluation_algorithm', 'sim_evaluation_status');
		return {
			mode,
			sim_evaluation_algorithm,
			sim_evaluation_status,
			deductionOptions,
			targetOptions,
			proxy,
			openDialog,
			onCancel,
			onSubmit,
			menuRef,
			formRef,
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
	margin-top: 40px;
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
