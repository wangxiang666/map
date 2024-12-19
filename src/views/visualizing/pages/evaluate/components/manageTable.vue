<template>
  <div class="data-list">
    <!-- 搜索区域 -->
    <div class="search-area">
      <div class="search-item">
        <span class="label">名称</span>
        <el-input v-model="tableData.param.name"
                  class="custom-input" />
      </div>
      <div class="search-item">
        <span class="label">毁伤目标</span>
        <el-input v-model="tableData.param.deduction"
                  class="custom-input" />
      </div>
      <el-button type="primary"
                 @click="EvaluationMgrList"
                 class="bg-form-btn">查询</el-button>
      <el-button type="primary"
                 @click="handleAdd"
                 v-auth="'api/v1/sim/evaluationMgr/add'"
                 class="bg-form-btn">新增</el-button>
      <el-button type="primary"
                 @click="showTree"
                 class="bg-form-btn">评估指标</el-button>
      <el-button type="primary"
                 class="bg-form-btn">评估算法</el-button>
    </div>

    <el-table v-loading="loading"
              :data="tableData.data"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55"
                       align="center" />
      <el-table-column label="序号"
                       align="center"
                       prop="id"
                       min-width="100px" />
      <el-table-column label="名称"
                       align="center"
                       prop="name"
                       min-width="100px" />
      <el-table-column label="推演任务"
                       align="center"
                       prop="linkedDeduction.name"
                       min-width="100px" />
      <el-table-column label="评估指标"
                       align="center"
                       prop="linkedTarget.name"
                       min-width="100px" />
      <el-table-column label="评估算法"
                       align="center"
                       prop="algorithm"
                       :formatter="algorithmFormat"
                       min-width="100px" />
      <el-table-column label="评估结果"
                       align="center"
                       prop="result"
                       min-width="100px" />
      <el-table-column label="状态"
                       align="center"
                       prop="status"
                       :formatter="statusFormat"
                       min-width="100px" />
      <el-table-column label="描述"
                       align="center"
                       prop="note"
                       min-width="100px" />
      <el-table-column label="操作员"
                       align="center"
                       prop="operator"
                       min-width="100px" />
      <el-table-column label="创建时间"
                       align="center"
                       prop="createdAt"
                       min-width="100px">
        <template #default="scope">
          <span>{{ proxy.parseTime(scope.row.createdAt, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center"
                       class-name="small-padding"
                       min-width="200px"
                       fixed="right">
        <template #default="scope">
          <el-button type="primary"
                     link
                     @click="handleView(scope.row)"
                     v-auth="'api/v1/sim/evaluationMgr/get'">查看</el-button>
          <el-button type="primary"
                     link
                     @click="handleUpdate(scope.row)"
                     v-auth="'api/v1/sim/evaluationMgr/edit'">编辑</el-button>
          <el-button type="primary"
                     link
                     @click="handleDelete(scope.row)"
                     v-auth="'api/v1/sim/evaluationMgr/delete'">删除</el-button>
          <el-button type="primary"
                     link>评估</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="tableData.total>0"
                :total="tableData.total"
                v-model:page="tableData.param.pageNum"
                v-model:limit="tableData.param.pageSize"
                @pagination="EvaluationMgrList" />
  </div>
</template>

<script lang="ts">
import { ItemOptions } from '/@/api/items';
import { toRefs, reactive, onMounted, ref, defineComponent, computed, getCurrentInstance, toRaw } from 'vue';
import { ElMessageBox, ElMessage, FormInstance } from 'element-plus';
import {
	listEvaluationMgr,
	getEvaluationMgr,
	delEvaluationMgr,
	addEvaluationMgr,
	updateEvaluationMgr,
	linkedDataSearch,
} from '/@/api/sim/EvaluationMgr';
import { EvaluationMgrTableColumns, EvaluationMgrInfoData, EvaluationMgrTableDataState } from './model';
export default defineComponent({
	name: 'apiV1SimEvaluationMgrList',
	setup(props, { emit }) {
		const { proxy } = <any>getCurrentInstance();
		const loading = ref(false);
		const queryRef = ref();
		// 是否显示所有搜索选项
		const showAll = ref(false);
		// 非单个禁用
		const single = ref(true);
		// 非多个禁用
		const multiple = ref(true);
		// 字典选项数据
		const { sim_evaluation_algorithm, sim_evaluation_status } = proxy.useDict('sim_evaluation_algorithm', 'sim_evaluation_status');
		// deductionOptions关联表数据
		const deductionOptions = ref<Array<ItemOptions>>([]);
		// targetOptions关联表数据
		const targetOptions = ref<Array<ItemOptions>>([]);
		const state = reactive<EvaluationMgrTableDataState>({
			ids: [],
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					pageNum: 1,
					pageSize: 10,
					id: undefined,
					name: undefined,
					deduction: undefined,
					target: undefined,
					algorithm: undefined,
					result: undefined,
					status: undefined,
					note: undefined,
					operator: undefined,
					createdAt: undefined,
					dateRange: [],
				},
			},
		});
		// 页面加载时
		onMounted(() => {
			initTableData();
		});
		// 初始化表格数据
		const initTableData = () => {
			linkedData();
			EvaluationMgrList();
		};
		const linkedData = () => {
			linkedDataSearch().then((res: any) => {
				//关联sim_deduction_mgr表选项
				deductionOptions.value = proxy.setItems(res, 'id', 'name', 'linkedEvaluationMgrDeductionMgr');
				//关联sim_evaluation_target_mgr表选项
				targetOptions.value = proxy.setItems(res, 'id', 'name', 'linkedEvaluationMgrEvaluationTargetMgr');
			});
		};
		/** 重置按钮操作 */
		const resetQuery = (formEl: FormInstance | undefined) => {
			if (!formEl) return;
			formEl.resetFields();
			EvaluationMgrList();
		};
		// 获取列表数据
		const EvaluationMgrList = () => {
			loading.value = true;
			listEvaluationMgr(state.tableData.param).then((res: any) => {
				let list = res.data.list ?? [];
				state.tableData.data = list;
				state.tableData.total = res.data.total;
				loading.value = false;
			});
		};
		const toggleSearch = () => {
			showAll.value = !showAll.value;
		};
		// 评估算法字典翻译
		const algorithmFormat = (row: EvaluationMgrTableColumns) => {
			return proxy.selectDictLabel(sim_evaluation_algorithm.value, row.algorithm);
		};
		// 状态字典翻译
		const statusFormat = (row: EvaluationMgrTableColumns) => {
			return proxy.selectDictLabel(sim_evaluation_status.value, row.status);
		};
		// 多选框选中数据
		const handleSelectionChange = (selection: Array<EvaluationMgrInfoData>) => {
			state.ids = selection.map((item) => item.id);
			single.value = selection.length != 1;
			multiple.value = !selection.length;
		};
		const handleAdd = () => {
			emit('handleAdd');
		};
		const handleUpdate = (row: EvaluationMgrTableColumns) => {
			if (!row) {
				row = state.tableData.data.find((item: EvaluationMgrTableColumns) => {
					return item.id === state.ids[0];
				}) as EvaluationMgrTableColumns;
			}
			emit('handleAdd', toRaw(row));
		};
		const handleDelete = (row: EvaluationMgrTableColumns) => {
			let msg = '你确定要删除所选数据？';
			let id: number[] = [];
			if (row) {
				msg = `此操作将永久删除数据，是否继续?`;
				id = [row.id];
			} else {
				id = state.ids;
			}
			if (id.length === 0) {
				ElMessage.error('请选择要删除的数据。');
				return;
			}
			ElMessageBox.confirm(msg, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					delEvaluationMgr(id).then(() => {
						ElMessage.success('删除成功');
						EvaluationMgrList();
					});
				})
				.catch(() => {});
		};
		const handleView = (row: EvaluationMgrTableColumns) => {
			emit('handleView', toRaw(row));
		};
		const showTree = () => {
			emit('showTree');
		};
		return {
			showTree,
			proxy,
			showAll,
			loading,
			single,
			multiple,
			queryRef,
			resetQuery,
			EvaluationMgrList,
			toggleSearch,
			//关联表数据选项
			deductionOptions,
			//关联表数据选项
			targetOptions,
			algorithmFormat,
			sim_evaluation_algorithm,
			statusFormat,
			sim_evaluation_status,
			handleSelectionChange,
			handleAdd,
			handleUpdate,
			handleDelete,
			handleView,
			...toRefs(state),
		};
	},
});
</script>


<style scoped>
.data-list {
	padding: 20px;
	color: #fff;
	width: calc(100% - 800px);
}

.search-area {
	display: flex;
	align-items: center;
	margin-bottom: 20px;
}

.search-item {
	display: flex;
	align-items: center;
	margin-right: 20px;
}

.label {
	margin-right: 10px;
	color: #fff;
}

/* 输入框样式 */
.custom-input {
	width: 200px;
	/* 需要添加深色背景图片 */
	/* background-image: url('@/assets/input-bg.png'); */
	background-color: rgba(255, 255, 255, 0.1);
}

/* 按钮样式 */
.search-btn,
.add-btn {
	margin-left: 10px;
	/* 需要添加蓝色渐变背景图片 */
	/* background-image: url('@/assets/button-bg.png'); */
	background: linear-gradient(to right, #0066ff, #0099ff);
	border: none;
}

/* 表格样式覆盖 */
:deep(.el-table) {
	background-color: transparent;
	color: #fff;
}

:deep(.el-table th),
:deep(.el-table tr) {
	background-color: rgba(255, 255, 255, 0.1);
	color: #fff;
}

:deep(.el-table td) {
	border-color: rgba(255, 255, 255, 0.1);
}

/* 分页样式 */
.pagination {
	margin-top: 20px;
	display: flex;
	align-items: center;
	color: #fff;
}

.page-num {
	margin: 0 10px;
	padding: 0 10px;
	background-color: rgba(255, 255, 255, 0.1);
}

.total {
	margin-left: 20px;
}
</style>
