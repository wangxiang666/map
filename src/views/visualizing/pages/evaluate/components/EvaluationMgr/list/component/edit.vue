<template>  
  <div class="sim-EvaluationMgr-edit">
    <!-- 添加或修改评估管理对话框 -->
    <el-dialog v-model="isShowDialog" width="769px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.sim-EvaluationMgr-edit .el-dialog', '.sim-EvaluationMgr-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'评估管理'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="90px">        
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入名称" />
        </el-form-item>        
        <el-form-item label="推演任务" prop="deduction">
          <el-input v-model="formData.deduction" placeholder="请输入推演任务" />
        </el-form-item>          
        <el-form-item label="评估指标" prop="target">
          <el-select v-model="formData.target" placeholder="请选择评估指标"   >
              <el-option              
                  v-for="item in targetOptions"              
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
              ></el-option>
          </el-select>
        </el-form-item>          
        <el-form-item label="评估算法" prop="algorithm">
          <el-select v-model="formData.algorithm" placeholder="请选择评估算法" >
            <el-option
              v-for="dict in algorithmOptions"
              :key="dict.value"
              :label="dict.label"              
                  :value="dict.value"              
            ></el-option>
          </el-select>
        </el-form-item>        
        <el-form-item label="评估结果" prop="result">
          <el-input v-model="formData.result" placeholder="请输入评估结果" />
        </el-form-item>        
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>        
        <el-form-item label="描述" prop="note">
          <el-input v-model="formData.note" type="textarea" placeholder="请输入描述" />
        </el-form-item>        
        <el-form-item label="操作员" prop="operator">
          <el-input v-model="formData.operator" placeholder="请输入操作员" />
        </el-form-item>       
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="onSubmit">确 定</el-button>
          <el-button @click="onCancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, defineComponent,ref,unref,getCurrentInstance } from 'vue';
import {ElMessageBox, ElMessage, FormInstance,UploadProps} from 'element-plus';
import {
  listEvaluationMgr,
  getEvaluationMgr,
  delEvaluationMgr,
  addEvaluationMgr,
  updateEvaluationMgr,  
  listDeductionMgr,  
  listEvaluationTargetMgr,  
} from "/@/api/sim/EvaluationMgr";
import {
  EvaluationMgrTableColumns,
  EvaluationMgrInfoData,
  EvaluationMgrTableDataState,
  EvaluationMgrEditState
} from "/@/views/sim/EvaluationMgr/list/component/model"
export default defineComponent({
  name:"apiV1SimEvaluationMgrEdit",
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
        target: undefined,        
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
          data.target = parseInt(data.target)          
          data.algorithm = ''+data.algorithm          
          data.status = ''+data.status          
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
    // 提交
    const onSubmit = () => {
      const formWrap = unref(formRef) as any;
      if (!formWrap) return;
      formWrap.validate((valid: boolean) => {
        if (valid) {
          state.loading = true;
          if(!state.formData.id || state.formData.id===0){
            //添加
          addEvaluationMgr(state.formData).then(()=>{
              ElMessage.success('添加成功');
              closeDialog(); // 关闭弹窗
              emit('EvaluationMgrList')
            }).finally(()=>{
              state.loading = false;
            })
          }else{
            //修改
          updateEvaluationMgr(state.formData).then(()=>{
              ElMessage.success('修改成功');
              closeDialog(); // 关闭弹窗
              emit('EvaluationMgrList')
            }).finally(()=>{
              state.loading = false;
            })
          }
        }
      });
    };
    const resetForm = ()=>{
      state.formData = {        
        id: undefined,        
        name: undefined,        
        deduction: undefined,        
        target: undefined,        
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
    return {
      proxy,
      openDialog,
      closeDialog,
      onCancel,
      onSubmit,
      menuRef,
      formRef,      
      ...toRefs(state),
    };
  }
})
</script>
<style scoped>  
</style>