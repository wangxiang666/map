<template>
  <div class="data-list">
    <!-- 搜索区域 -->
    <!-- <div class="search-area">
      <div class="search-item">
        <span class="label">名称</span>
        <el-input v-model="searchForm.name"
                  class="custom-input" />
      </div>
      <div class="search-item">
        <span class="label">毁伤类型</span>
        <el-input v-model="searchForm.target"
                  class="custom-input" />
      </div>
      <el-button type="primary"
                 class="search-form-btn">查询</el-button>
      <el-button type="primary"
                 class="search-form-btn" @click="add">新增</el-button>
    </div> -->
    <el-form :model="tableData.param" ref="queryRef" :inline="true" label-width="100px">
            <el-row>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="预案名称" prop="name">
                    <el-input
                        v-model="tableData.param.name"
                        placeholder="请输入预案名称"
                        clearable                        
                        @keyup.enter.native="PlanMgrList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="毁伤类型" prop="damageType">
                    <el-select v-model="tableData.param.damageType" placeholder="请选择毁伤类型" clearable >
                        <el-option label="请选择字典生成" value="" />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="!showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"
                 class="search-form-btn" @click="PlanMgrList">查询</el-button>
                  <el-button type="primary"
                            class="search-form-btn" @click="handleAdd">新增</el-button>
                    <!-- <el-button type="primary"  @click="PlanMgrList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                      {{ word }}
                      <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                      <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button> -->
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="攻击手段" prop="attackMethod">
                    <el-select v-model="tableData.param.attackMethod" placeholder="请选择攻击手段" clearable >
                        <el-option label="请选择字典生成" value="" />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="武器型号" prop="weaponModel">
                    <el-input
                        v-model="tableData.param.weaponModel"
                        placeholder="请输入武器型号"
                        clearable                        
                        @keyup.enter.native="PlanMgrList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="数量" prop="weaponNum">
                    <el-input
                        v-model="tableData.param.weaponNum"
                        placeholder="请输入数量"
                        clearable                        
                        @keyup.enter.native="PlanMgrList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="是否有防御模型" prop="defenseFlag">
                    <el-select v-model="tableData.param.defenseFlag" placeholder="请选择是否有防御模型" clearable >
                        <el-option label="请选择字典生成" value="" />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="防御武器" prop="defensiveWeapon">
                    <el-select v-model="tableData.param.defensiveWeapon" placeholder="请选择防御武器" clearable >
                        <el-option label="请选择字典生成" value="" />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="风幕类型" prop="windType">
                    <el-input
                        v-model="tableData.param.windType"
                        placeholder="请输入风幕类型"
                        clearable                        
                        @keyup.enter.native="PlanMgrList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="风幕数量" prop="windNum">
                    <el-input
                        v-model="tableData.param.windNum"
                        placeholder="请输入风幕数量"
                        clearable                        
                        @keyup.enter.native="PlanMgrList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="风幕高度" prop="windH">
                    <el-input
                        v-model="tableData.param.windH"
                        placeholder="请输入风幕高度"
                        clearable                        
                        @keyup.enter.native="PlanMgrList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="操作员" prop="operator">
                    <el-input
                        v-model="tableData.param.operator"
                        placeholder="请输入操作员"
                        clearable                        
                        @keyup.enter.native="PlanMgrList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="创建时间" prop="createdAt">
                    <el-date-picker
                        clearable  style="width: 200px"
                        v-model="tableData.param.createdAt"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"                    
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>            
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="PlanMgrList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                        {{ word }}
                        <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                        <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button>
                  </el-form-item>
                </el-col>            
              </el-row>
            </el-form>



    <!-- 表格区域 -->
    <!-- <el-table :data="tableData"
              border
              style="width: 100%">
      <el-table-column prop="id"
                       label="id"
                       width="80" />
      <el-table-column prop="name"
                       label="名称" />
      <el-table-column prop="target"
                       label="毁伤类型" />
      <el-table-column prop="prediction"
                       label="攻击手段" />
      <el-table-column prop="method"
                       label="武器型号" />
      <el-table-column prop="status"
                       label="数量" />
      <el-table-column prop="creator"
                       label="是否有防御" />
      <el-table-column label="操作"
                       width="280">
        
      </el-table-column>
    </el-table> -->
    <el-table border v-loading="loading" :data="tableData.data" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />   
          <el-table-column prop="id"
                       label="id"
                       width="80" />       
          <el-table-column label="名称" align="center" prop="name"
            min-width="100px"            
             />          
          <el-table-column label="毁伤类型" align="center" prop="damageType"
            min-width="100px"            
             />          
          <el-table-column label="攻击手段" align="center" prop="attackMethod"
            min-width="100px"            
             />          
          <el-table-column label="武器型号" align="center" prop="weaponModel"
            min-width="100px"            
             />          
          <el-table-column label="数量" align="center" prop="weaponNum"
            min-width="100px"            
             />          
          <el-table-column label="是否有防御模型" align="center" prop="defenseFlag"
            min-width="100px"            
             />          
          <!-- <el-table-column label="防御武器" align="center" prop="defensiveWeapon"
            min-width="100px"            
             />          
          <el-table-column label="风幕类型" align="center" prop="windType"
            min-width="100px"            
             />          
          <el-table-column label="风幕数量" align="center" prop="windNum"
            min-width="100px"            
             />          
          <el-table-column label="风幕高度" align="center" prop="windH"
            min-width="100px"            
             />          
          <el-table-column label="创建时间" align="center" prop="createdAt"
            min-width="100px"            
            >
            <template #default="scope">
                <span>{{ proxy.parseTime(scope.row.createdAt, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            </template>
          </el-table-column>         -->
          <el-table-column label="操作" align="center" class-name="small-padding" min-width="200px" fixed="right">
            <!-- <template #default>
          <el-button link
                     type="primary">查看</el-button>
          <el-button link
                     type="primary">编辑</el-button>
          <el-button link
                     type="primary">删除</el-button>
          <el-button link
                     type="primary">推演</el-button>
          <el-button link
                     type="primary">回放</el-button>
        </template> -->
            <template #default="scope">            
              <el-button
                type="primary"
                link
                @click="handleView(scope.row)"
                v-auth="'api/v1/sim/planMgr/get'"
              ><el-icon><ele-View /></el-icon>查看</el-button>              
              <el-button
                type="primary"
                link
                @click="handleUpdate(scope.row)"
                v-auth="'api/v1/sim/planMgr/edit'"
              ><el-icon><ele-EditPen /></el-icon>编辑</el-button>
              <el-button
                type="primary"
                link
                @click="handleDelete(scope.row)"
                v-auth="'api/v1/sim/planMgr/delete'"
              ><el-icon><ele-DeleteFilled /></el-icon>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
            v-show="tableData.total>0"
            :total="tableData.total"
            v-model:page="tableData.param.pageNum"
            v-model:limit="tableData.param.pageSize"
            @pagination="PlanMgrList"
        />
  </div>
</template>

<script lang="ts">
import {toRefs, reactive, onMounted, ref, defineComponent, computed,getCurrentInstance,toRaw} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
import {
    listPlanMgr,
    getPlanMgr,
    delPlanMgr,
    addPlanMgr,
    updatePlanMgr,    
} from "/@/api/sim/PlanMgr";
import {
    PlanMgrTableColumns,
    PlanMgrInfoData,
    PlanMgrTableDataState,    
} from "./model"
export default defineComponent({
    name: "apiV1SimPlanMgrList",
    components:{
        // apiV1SimPlanMgrEdit,
        // apiV1SimPlanMgrDetail
    },
    setup(props,{emit}) {
        const {proxy} = <any>getCurrentInstance()
        const loading = ref(false)
        const queryRef = ref()
        const editRef = ref();
        const detailRef = ref();
        // 是否显示所有搜索选项
        const showAll =  ref(false)
        // 非单个禁用
        const single = ref(true)
        // 非多个禁用
        const multiple =ref(true)
        const word = computed(()=>{
            if(showAll.value === false) {
                //对文字进行处理
                return "展开搜索";
            } else {
                return "收起搜索";
            }
        })
        // 字典选项数据        
        const {            
        } = proxy.useDict(            
        )        
        const state = reactive<PlanMgrTableDataState>({
            ids:[],
            tableData: {
                data: [],
                total: 0,
                loading: false,
                param: {
                    pageNum: 1,
                    pageSize: 10,                    
                    name: undefined,                    
                    damageType: undefined,                    
                    attackMethod: undefined,                    
                    weaponModel: undefined,                    
                    weaponNum: undefined,                    
                    defenseFlag: undefined,                    
                    defensiveWeapon: undefined,                    
                    windType: undefined,                    
                    windNum: undefined,                    
                    windH: undefined,                    
                    operator: undefined,                    
                    createdAt: [],                    
                    dateRange: []
                },
            },
        });
        // 页面加载时
        onMounted(() => {
            initTableData();
        });
        // 初始化表格数据
        const initTableData = () => {            
            PlanMgrList()
        };        
        /** 重置按钮操作 */
        const resetQuery = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.resetFields()
            PlanMgrList()
        };
        // 获取列表数据
        const PlanMgrList = ()=>{
          loading.value = true
          listPlanMgr(state.tableData.param).then((res:any)=>{
            let list = res.data.list??[];            
            state.tableData.data = list;
            state.tableData.total = res.data.total;
            loading.value = false
          })
        };
        const toggleSearch = () => {
            showAll.value = !showAll.value;
        }        
        // 多选框选中数据
        const handleSelectionChange = (selection:Array<PlanMgrInfoData>) => {
            state.ids = selection.map(item => item.id)
            single.value = selection.length!=1
            multiple.value = !selection.length
        }
        const handleAdd =  ()=>{
            emit('handleAdd')
        }
        const handleUpdate = (row: PlanMgrTableColumns) => {
            if(!row){
                row = state.tableData.data.find((item:PlanMgrTableColumns)=>{
                    return item.id ===state.ids[0]
                }) as PlanMgrTableColumns
            }
            emit('handleAdd',toRaw(row));
        };
        const handleDelete = (row: PlanMgrTableColumns) => {
            let msg = '你确定要删除所选数据？';
            let id:number[] = [] ;
            if(row){
            msg = `此操作将永久删除数据，是否继续?`
            id = [row.id]
            }else{
            id = state.ids
            }
            if(id.length===0){
                ElMessage.error('请选择要删除的数据。');
                return
            }
            ElMessageBox.confirm(msg, '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    delPlanMgr(id).then(()=>{
                        ElMessage.success('删除成功');
                        PlanMgrList();
                    })
                })
                .catch(() => {});
        }
        const handleView = (row:PlanMgrTableColumns)=>{
            detailRef.value.openDialog(toRaw(row));
        }
        return {
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
            PlanMgrList,
            toggleSearch,            
            handleSelectionChange,
            handleAdd,
            handleUpdate,
            handleDelete,            
            handleView,            
            ...toRefs(state),
        }
    }
})
</script>

<style scoped>
.data-list {
	padding: 20px;
	color: #fff;
	flex: calc(100% - 700px);
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


/* 表格样式覆盖 */
:deep(.el-table) {
	background-color: transparent;
	color: #fff;
  --el-table-border-color:#7cc4e3;
}

:deep(.el-table th),
:deep(.el-table tr),
:deep(.el-table td)  {
	background-color: transparent !important;
	color: #fff;
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

.colBlock {
        display: block;
    }
    .colNone {
        display: none;
    }
    .ml-2{margin: 3px;}
</style>
