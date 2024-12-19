<template>
  <!-- 评估管理详情抽屉 -->  
  <div class="sim-EvaluationMgr-detail">
    <el-dialog v-model="isShowDialog" width="800">
      <template #header>
        <h4>评估管理详情</h4>
      </template>
    <el-descriptions
       ref="formRef"
        :column="1"
        size="small"
        border
      >          
          <el-descriptions-item label-class-name="template-cell-label">
            <template #label>
              <div class="cell-item">
                序号
              </div>
            </template>
            <el-tooltip :content=" formData.id ">
              <span>{{ formData.id }}</span>
            </el-tooltip>
          </el-descriptions-item>          
          <el-descriptions-item label-class-name="template-cell-label">
            <template #label>
              <div class="cell-item">
                名称
              </div>
            </template>
            <el-tooltip :content=" formData.name ">
              <span>{{ formData.name }}</span>
            </el-tooltip>
          </el-descriptions-item>            
            <el-descriptions-item label-class-name="template-cell-label">
              <template #label>
                <div class="cell-item">
                  推演任务
                </div>
              </template>
              <el-tooltip :content=" formData.linkedDeduction?formData.linkedDeduction.name:'' ">
                <span>{{ formData.linkedDeduction?formData.linkedDeduction.name:'' }}</span>
              </el-tooltip>
            </el-descriptions-item>            
            <el-descriptions-item label-class-name="template-cell-label">
              <template #label>
                <div class="cell-item">
                  评估指标
                </div>
              </template>
              <el-tooltip :content=" formData.linkedTarget?formData.linkedTarget.name:'' ">
                <span>{{ formData.linkedTarget?formData.linkedTarget.name:'' }}</span>
              </el-tooltip>
            </el-descriptions-item>          
          <el-descriptions-item label-class-name="template-cell-label">
            <template #label>
              <div class="cell-item">
                评估算法
              </div>
            </template>
            <el-tooltip :content=" proxy.getOptionValue(formData.algorithm, algorithmOptions,'value','label') ">
              <span>{{ proxy.getOptionValue(formData.algorithm, algorithmOptions,'value','label') }}</span>
            </el-tooltip>
          </el-descriptions-item>          
          <el-descriptions-item label-class-name="template-cell-label">
            <template #label>
              <div class="cell-item">
                评估结果
              </div>
            </template>
            <el-tooltip :content=" formData.result ">
              <span>{{ formData.result }}</span>
            </el-tooltip>
          </el-descriptions-item>          
          <el-descriptions-item label-class-name="template-cell-label">
            <template #label>
              <div class="cell-item">
                状态
              </div>
            </template>
            <el-tooltip :content=" proxy.getOptionValue(formData.status, statusOptions,'value','label') ">
              <span>{{ proxy.getOptionValue(formData.status, statusOptions,'value','label') }}</span>
            </el-tooltip>
          </el-descriptions-item>          
          <el-descriptions-item label-class-name="template-cell-label">
            <template #label>
              <div class="cell-item">
                描述
              </div>
            </template>
            <el-tooltip :content=" formData.note ">
              <span>{{ formData.note }}</span>
            </el-tooltip>
          </el-descriptions-item>          
          <el-descriptions-item label-class-name="template-cell-label">
            <template #label>
              <div class="cell-item">
                操作员
              </div>
            </template>
            <el-tooltip :content=" formData.operator ">
              <span>{{ formData.operator }}</span>
            </el-tooltip>
          </el-descriptions-item>        
        <el-descriptions-item label-class-name="template-cell-label">
            <template #label>
              <div class="cell-item">
                创建时间
              </div>
            </template>
            <el-tooltip :content=" proxy.parseTime(formData.createdAt, '{y}-{m}-{d} {h}:{i}:{s}') ">
              <span>{{ proxy.parseTime(formData.createdAt, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
            </el-tooltip>
          </el-descriptions-item>      
    </el-descriptions>
    </el-dialog>
  </div>
</template>
<script lang="ts">
  import { reactive, toRefs, defineComponent,ref,unref,getCurrentInstance,computed } from 'vue';
  import {ElMessageBox, ElMessage, FormInstance,UploadProps} from 'element-plus';  
  import {
    listEvaluationMgr,
    getEvaluationMgr,
    delEvaluationMgr,
    addEvaluationMgr,
    updateEvaluationMgr,    
  } from "/@/api/sim/EvaluationMgr";  
  import {
    EvaluationMgrTableColumns,
    EvaluationMgrInfoData,
    EvaluationMgrTableDataState,
    EvaluationMgrEditState
  } from "/@/views/sim/EvaluationMgr/list/component/model"
  export default defineComponent({
    name:"apiV1SimEvaluationMgrDetail",
    components:{      
    },
    props:{      
      deductionOptions:{
        type:Array,
        default:()=>[]
      },      
      targetOptions:{
        type:Array,
        default:()=>[]
      },      
      algorithmOptions:{
        type:Array,
        default:()=>[]
      },      
      statusOptions:{
        type:Array,
        default:()=>[]
      },      
    },
    setup(props,{emit}) {      
      const {proxy} = <any>getCurrentInstance()
      const formRef = ref<HTMLElement | null>(null);
      const menuRef = ref();      
      const state = reactive<EvaluationMgrEditState>({
        loading:false,
        isShowDialog: false,
        formData: {          
          id: undefined,          
          name: undefined,          
          deduction: undefined,          
          linkedDeduction:{id:undefined,name:undefined },          
          target: undefined,          
          linkedTarget:{id:undefined,name:undefined },          
          algorithm: undefined,          
          result: undefined,          
          status: false ,          
          note: undefined,          
          operator: undefined,          
          createdAt: undefined,          
          updatedAt: undefined,          
          linkedEvaluationMgrDeductionMgr: {            
            id:undefined,    // 序号            
            name:undefined,    // 任务名称            
          },          
          linkedEvaluationMgrEvaluationTargetMgr: {            
            id:undefined,    // 序号            
            name:undefined,    // 指标名称            
          },          
        },
        // 表单校验
        rules: {          
          name : [
              { required: true, message: "名称不能为空", trigger: "blur" }
          ],          
          updatedAt : [
              { required: true, message: "更新时间不能为空", trigger: "blur" }
          ],          
        }
      });
        // 打开弹窗
        const openDialog = (row?: EvaluationMgrInfoData) => {
          resetForm();
          if(row) {
            getEvaluationMgr(row.id!).then((res:any)=>{
              const data = res.data;              
              state.formData = data;
            })
          }
          state.isShowDialog = true;
        };
        // 关闭弹窗
        const closeDialog = () => {
          state.isShowDialog = false;
        };
        // 取消
        const onCancel = () => {
          closeDialog();
        };
        const resetForm = ()=>{
          state.formData = {            
            id: undefined,            
            name: undefined,            
            deduction: undefined,            
            linkedDeduction:{id:undefined,name:undefined },            
            target: undefined,            
            linkedTarget:{id:undefined,name:undefined },            
            algorithm: undefined,            
            result: undefined,            
            status: false ,            
            note: undefined,            
            operator: undefined,            
            createdAt: undefined,            
            updatedAt: undefined,            
            linkedEvaluationMgrDeductionMgr: {              
              id:undefined,    // 序号              
              name:undefined,    // 任务名称              
            },            
            linkedEvaluationMgrEvaluationTargetMgr: {              
              id:undefined,    // 序号              
              name:undefined,    // 指标名称              
            },            
          }
        };        
        //关联sim_deduction_mgr表选项
        const getDeductionMgrItemsDeduction = () => {
          emit("getDeductionMgrItemsDeduction")
        }
        const getDeductionOp = computed(()=>{
          getDeductionMgrItemsDeduction()
          return props.deductionOptions
        })        
        //关联sim_evaluation_target_mgr表选项
        const getEvaluationTargetMgrItemsTarget = () => {
          emit("getEvaluationTargetMgrItemsTarget")
        }
        const getTargetOp = computed(()=>{
          getEvaluationTargetMgrItemsTarget()
          return props.targetOptions
        })        
        return {
          proxy,
          openDialog,
          closeDialog,
          onCancel,
          menuRef,
          formRef,          
          getDeductionMgrItemsDeduction,
          getDeductionOp,          
          getEvaluationTargetMgrItemsTarget,
          getTargetOp,          
          ...toRefs(state),
        };
      }
  })
</script>
<style scoped>  
  .sim-EvaluationMgr-detail :deep(.el-form-item--large .el-form-item__label){
    font-weight: bolder;
  }
  .pic-block{
    margin-right: 8px;
  }
  .file-block{
    width: 100%;
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    margin-bottom: 5px;
    padding: 3px 6px;
  }
  .ml-2{margin-right: 5px;}
  ::v-deep(.cell-label){
    width:120px;
  }
</style>