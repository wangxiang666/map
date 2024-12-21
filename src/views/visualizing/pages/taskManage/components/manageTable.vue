<template>
  <div class="data-list">
    <!-- 搜索区域 -->
    <el-form :model="tableData.param"
             ref="queryRef"
             :inline="true"
             label-width="100px">
      <el-row>
        <el-col :span="8"
                class="colBlock">
          <el-form-item label="任务名称"
                        prop="name">
            <el-input v-model="tableData.param.name"
                      placeholder="请输入名称"
                      clearable
                      @keyup.enter.native="DeductionMgrList" />
          </el-form-item>
        </el-col>

        <el-col :span="8"
                :class="!showAll ? 'colBlock' : 'colNone'">
          <el-form-item>
            <el-button type="primary"
                       class="search-form-btn"
                       @click="DeductionMgrList">查询</el-button>
            <el-button type="primary"
                       class="search-form-btn"
                       @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="tableData.data"
              :height="770"
              border
              style="width: 100%">
      <el-table-column type="index"
                       label="序号"
                       width="80" />
      <el-table-column prop="name"
                       label="名称" />
      <el-table-column prop="damageTargetName"
                       label="毁伤目标" />
      <el-table-column prop="damagePlanName"
                       label="毁伤预案" />

      <el-table-column label="控制方式"
                       align="center"
                       prop="controlMode"
                       min-width="100px">
        <template #default="scope">
          <span>{{ scope.row.controlMode === 1 ? '人不在回路' : '人在回路' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态"
                       align="center"
                       prop="status"
                       min-width="100px">
        <template #default="scope">
          <span :style="{ color: scope.row.status === 0 ? 'green' : 'red' }">{{ scope.row.status === 0 ? '未推演' : '已推演' }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="operator"
                       label="创建人" />
      <el-table-column label="操作"
                       width="280">
        <template #default="scope">
          <el-button link
                     @click="handleView(scope.row)"
                     type="primary">查看</el-button>

          <el-button type="primary"
                     link
                     @click="handleUpdate(scope.row)"
                     v-auth="'api/v1/sim/deductionMgr/edit'">编辑</el-button>

          <el-button type="primary"
                     link
                     @click="handleDelete(scope.row)"
                     v-auth="'api/v1/sim/deductionMgr/delete'">删除</el-button>
          <el-button link
                     type="primary"
                     v-if="scope.row.status === 0"
                     @click="deduct(scope.row)">推演</el-button>
          <el-button link
                     @click="rePlayDeduction(scope.row)"
                     type="primary">回放</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="tableData.total > 0"
                :total="tableData.total"
                v-model:page="tableData.param.pageNum"
                v-model:limit="tableData.param.pageSize"
                @pagination="DeductionMgrList" />
  </div>
</template>
  <script lang="ts">
import { toRefs, reactive, onMounted, ref, defineComponent, computed, getCurrentInstance, toRaw } from 'vue';
import { ElMessageBox, ElMessage, FormInstance } from 'element-plus';
// import { attackMethodDic,defensiveWeaponDic } from '/@/views/visualizing/pages/dic';
import { listDeductionMgr, getDeductionMgr, addDeductionMgr, updateDeductionMgr, delDeductionMgr } from '/@/api/sim/DeductionMgr';

import { DeductionMgrTableColumns, DeductionMgrInfoData, DeductionMgrTableDataState } from './model';

export default defineComponent({
	name: 'manageTable',
	components: {
		// apiV1SimDeductionMgrEdit,
		// apiV1SimDeductionMgrDetail
	},
	setup(props, { emit }) {
		const { proxy } = <any>getCurrentInstance();
		const loading = ref(false);
		const queryRef = ref();
		const editRef = ref();
		const detailRef = ref();
		// 是否显示所有搜索选项
		const showAll = ref(false);
		// 非单个禁用
		const single = ref(true);
		// 非多个禁用
		const multiple = ref(true);
		const word = computed(() => {
			if (showAll.value === false) {
				//对文字进行处理
				return '展开搜索';
			} else {
				return '收起搜索';
			}
		});
		// 字典选项数据
		const {} = proxy.useDict();
		const state = reactive<DeductionMgrTableDataState>({
			ids: [],
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					pageNum: 1,
					pageSize: 10,
					name: undefined,
					destroy_target: undefined, //毁伤目标
					destroy_plan: undefined, // 毁伤预案
					control_mode: undefined, // 控制方式
					status: undefined, // 状态
					damage_area: undefined, // 毁伤面积
					percentage_damage_degree: undefined, // 毁伤面积百分比
					weapon_valid_percent: undefined, // 武器有效百分比
					active_power_mw_after: undefined, // 毁伤后有功功率(MW)
					operator: undefined, // 操作员
					createdAt: [],
					dateRange: [],
					note: undefined,
				},
			},
		});
		// 页面加载时
		onMounted(() => {
			initTableData();
		});
		// 初始化表格数据
		const initTableData = () => {
			DeductionMgrList();
		};
		/** 重置按钮操作 */
		const resetQuery = (formEl: FormInstance | undefined) => {
			if (!formEl) return;
			formEl.resetFields();
			DeductionMgrList();
		};
		// 获取列表数据
		const DeductionMgrList = () => {
			loading.value = true;
			listDeductionMgr(state.tableData.param).then((res: any) => {
				let list = res.data.list ?? [];
				state.tableData.data = list;
				state.tableData.total = res.data.total;
				loading.value = false;
			});
		};
		const toggleSearch = () => {
			showAll.value = !showAll.value;
		};
		// 多选框选中数据
		const handleSelectionChange = (selection: Array<DeductionMgrInfoData>) => {
			state.ids = selection.map((item) => item.id);
			single.value = selection.length != 1;
			multiple.value = !selection.length;
		};
		const handleAdd = () => {
			emit('handleAdd');
		};
		const handleUpdate = (row: DeductionMgrTableColumns) => {
			if (!row) {
				row = state.tableData.data.find((item: DeductionMgrTableColumns) => {
					return item.id === state.ids[0];
				}) as DeductionMgrTableColumns;
			}
			emit('handleAdd', toRaw(row));
		};
		const handleDelete = (row: DeductionMgrTableColumns) => {
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
					delDeductionMgr(id).then(() => {
						ElMessage.success('删除成功');
						DeductionMgrList();
					});
				})
				.catch(() => {});
		};
		const handleView = (row: DeductionMgrTableColumns) => {
			emit('handleView', toRaw(row));
		};
		const deduct = (row: DeductionMgrTableColumns) => {
			emit('deduct', row);
		};
		const rePlayDeduction = (row: DeductionMgrTableColumns) => {
			emit('rePlayDeduction', row);
		};
		return {
			rePlayDeduction,
			deduct,
			proxy,
			editRef,
			detailRef,
			showAll,
			loading,
			single,
			multiple,
			word,
			queryRef,
			resetQuery,
			DeductionMgrList,
			toggleSearch,
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
	padding: 20px 0 20px 20px;
	color: #fff;
	width: calc(100% - 650px);
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
</style>
  