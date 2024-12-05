<template>
  <div class="engine-ExceptionFilePolicy-container">
    <el-card shadow="hover">
        <div class="engine-ExceptionFilePolicy-search mb15">
            <el-form :model="tableData.param" ref="queryRef" :inline="true" label-width="100px">
            <el-row>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="表id" prop="id">
                    <el-input
                        v-model="tableData.param.id"
                        placeholder="请输入表id"
                        clearable                        
                        @keyup.enter.native="ExceptionFilePolicyList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="文件名称" prop="fileName">
                    <el-input
                        v-model="tableData.param.fileName"
                        placeholder="请输入文件名称"
                        clearable                        
                        @keyup.enter.native="ExceptionFilePolicyList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="!showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="ExceptionFilePolicyList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                      {{ word }}
                      <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                      <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="文件特征" prop="fileMd5">
                    <el-input
                        v-model="tableData.param.fileMd5"
                        placeholder="请输入文件特征"
                        clearable                        
                        @keyup.enter.native="ExceptionFilePolicyList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="状态" prop="action">
                    <el-input
                        v-model="tableData.param.action"
                        placeholder="请输入状态"
                        clearable                        
                        @keyup.enter.native="ExceptionFilePolicyList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="操作员" prop="operator">
                    <el-input
                        v-model="tableData.param.operator"
                        placeholder="请输入操作员"
                        clearable                        
                        @keyup.enter.native="ExceptionFilePolicyList"
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
                        type="datetime"
                        placeholder="选择创建时间"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>            
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="ExceptionFilePolicyList"><el-icon><ele-Search /></el-icon>搜索</el-button>
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
            <el-row :gutter="10" class="mb8">
              <el-col :span="1.5">
                <el-button
                  type="primary"
                  @click="handleAdd"
                  v-auth="'api/v1/engine/ExceptionFilePolicy/add'"
                ><el-icon><ele-Plus /></el-icon>新增</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="success"
                  :disabled="single"
                  @click="handleUpdate(null)"
                  v-auth="'api/v1/engine/ExceptionFilePolicy/edit'"
                ><el-icon><ele-Edit /></el-icon>修改</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  :disabled="multiple"
                  @click="handleDelete(null)"
                  v-auth="'api/v1/engine/ExceptionFilePolicy/delete'"
                ><el-icon><ele-Delete /></el-icon>删除</el-button>
              </el-col>
            </el-row>
        </div>
        <el-table v-loading="loading" :data="tableData.data" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />          
          <el-table-column label="表id" align="center" prop="id"
            min-width="100px"            
             />          
          <el-table-column label="文件名称" align="center" prop="fileName"
            min-width="100px"            
             />          
          <el-table-column label="文件特征" align="center" prop="fileMd5"
            min-width="100px"            
             />          
          <el-table-column label="状态" align="center" prop="action"
            min-width="100px"            
             />          
          <el-table-column label="操作员" align="center" prop="operator"
            min-width="100px"            
             />          
          <el-table-column label="创建时间" align="center" prop="createdAt"
            min-width="100px"            
            >
            <template #default="scope">
                <span>{{ proxy.parseTime(scope.row.createdAt, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            </template>
          </el-table-column>        
          <el-table-column label="操作" align="center" class-name="small-padding" min-width="160px" fixed="right">
            <template #default="scope">            
              <el-button
                type="primary"
                link
                @click="handleUpdate(scope.row)"
                v-auth="'api/v1/engine/ExceptionFilePolicy/edit'"
              ><el-icon><ele-EditPen /></el-icon>修改</el-button>
              <el-button
                type="primary"
                link
                @click="handleDelete(scope.row)"
                v-auth="'api/v1/engine/ExceptionFilePolicy/delete'"
              ><el-icon><ele-DeleteFilled /></el-icon>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
            v-show="tableData.total>0"
            :total="tableData.total"
            v-model:page="tableData.param.pageNum"
            v-model:limit="tableData.param.pageSize"
            @pagination="ExceptionFilePolicyList"
        />
    </el-card>
    <apiV1EngineExceptionFilePolicyEdit
       ref="editRef"       
       @ExceptionFilePolicyList="ExceptionFilePolicyList"
    ></apiV1EngineExceptionFilePolicyEdit>
    <apiV1EngineExceptionFilePolicyDetail
      ref="detailRef"      
      @ExceptionFilePolicyList="ExceptionFilePolicyList"
    ></apiV1EngineExceptionFilePolicyDetail>
  </div>
</template>
<script lang="ts">
import {ItemOptions} from "/@/api/items";
import {toRefs, reactive, onMounted, ref, defineComponent, computed,getCurrentInstance,toRaw} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
import {
    listExceptionFilePolicy,
    getExceptionFilePolicy,
    delExceptionFilePolicy,
    addExceptionFilePolicy,
    updateExceptionFilePolicy,    
} from "/@/api/engine/ExceptionFilePolicy";
import {
    ExceptionFilePolicyTableColumns,
    ExceptionFilePolicyInfoData,
    ExceptionFilePolicyTableDataState,    
} from "/@/views/engine/ExceptionFilePolicy/list/component/model"
import apiV1EngineExceptionFilePolicyEdit from "/@/views/engine/ExceptionFilePolicy/list/component/edit.vue"
import apiV1EngineExceptionFilePolicyDetail from "/@/views/engine/ExceptionFilePolicy/list/component/detail.vue"
export default defineComponent({
    name: "apiV1EngineExceptionFilePolicyList",
    components:{
        apiV1EngineExceptionFilePolicyEdit,
        apiV1EngineExceptionFilePolicyDetail
    },
    setup() {
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
        const state = reactive<ExceptionFilePolicyTableDataState>({
            ids:[],
            tableData: {
                data: [],
                total: 0,
                loading: false,
                param: {
                    pageNum: 1,
                    pageSize: 10,                    
                    id: undefined,                    
                    fileName: undefined,                    
                    fileMd5: undefined,                    
                    action: undefined,                    
                    operator: undefined,                    
                    createdAt: undefined,                    
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
            ExceptionFilePolicyList()
        };        
        /** 重置按钮操作 */
        const resetQuery = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.resetFields()
            ExceptionFilePolicyList()
        };
        // 获取列表数据
        const ExceptionFilePolicyList = ()=>{
          loading.value = true
          listExceptionFilePolicy(state.tableData.param).then((res:any)=>{
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
        const handleSelectionChange = (selection:Array<ExceptionFilePolicyInfoData>) => {
            state.ids = selection.map(item => item.id)
            single.value = selection.length!=1
            multiple.value = !selection.length
        }
        const handleAdd =  ()=>{
            editRef.value.openDialog()
        }
        const handleUpdate = (row: ExceptionFilePolicyTableColumns) => {
            if(!row){
                row = state.tableData.data.find((item:ExceptionFilePolicyTableColumns)=>{
                    return item.id ===state.ids[0]
                }) as ExceptionFilePolicyTableColumns
            }
            editRef.value.openDialog(toRaw(row));
        };
        const handleDelete = (row: ExceptionFilePolicyTableColumns) => {
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
                    delExceptionFilePolicy(id).then(()=>{
                        ElMessage.success('删除成功');
                        ExceptionFilePolicyList();
                    })
                })
                .catch(() => {});
        }
        const handleView = (row:ExceptionFilePolicyTableColumns)=>{
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
            ExceptionFilePolicyList,
            toggleSearch,            
            handleSelectionChange,
            handleAdd,
            handleUpdate,
            handleDelete,            
            ...toRefs(state),
        }
    }
})
</script>
<style lang="scss" scoped>
    .colBlock {
        display: block;
    }
    .colNone {
        display: none;
    }
    .ml-2{margin: 3px;}
</style>