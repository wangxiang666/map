<template>  
  <div class="engine-ExceptionFilePolicy-edit">
    <!-- 添加或修改例外文件策略对话框 -->
    <el-dialog v-model="isShowDialog" width="769px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.engine-ExceptionFilePolicy-edit .el-dialog', '.engine-ExceptionFilePolicy-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'例外文件策略'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="90px">        
        <el-form-item label="文件名称" prop="fileName">
          <el-input v-model="formData.fileName" placeholder="请输入文件名称" />
        </el-form-item>        
        <el-form-item label="文件特征" prop="fileMd5">
          <el-input v-model="formData.fileMd5" placeholder="请输入文件特征" />
        </el-form-item>        
        <el-form-item label="状态" prop="action">
          <el-input v-model="formData.action" placeholder="请输入状态" />
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
  ExceptionFilePolicyEditState
} from "/@/views/engine/ExceptionFilePolicy/list/component/model"
export default defineComponent({
  name:"apiV1EngineExceptionFilePolicyEdit",
  components:{    
  },
  props:{    
  },
  setup(props,{emit}) {    
    const {proxy} = <any>getCurrentInstance()
    const formRef = ref<HTMLElement | null>(null);
    const menuRef = ref();    
    const state = reactive<ExceptionFilePolicyEditState>({
      loading:false,
      isShowDialog: false,
      formData: {        
        id: undefined,        
        fileName: undefined,        
        fileMd5: undefined,        
        action: undefined,        
        operator: undefined,        
        createdAt: undefined,        
        updatedAt: undefined,        
      },
      // 表单校验
      rules: {        
        fileName : [
            { required: true, message: "文件名称不能为空", trigger: "blur" }
        ],        
        fileMd5 : [
            { required: true, message: "文件特征不能为空", trigger: "blur" }
        ],        
        action : [
            { required: true, message: "状态不能为空", trigger: "blur" }
        ],        
        operator : [
            { required: true, message: "操作员不能为空", trigger: "blur" }
        ],        
        createdAt : [
            { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],        
        updatedAt : [
            { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],        
      }
    });
    // 打开弹窗
    const openDialog = (row?: ExceptionFilePolicyInfoData) => {
      resetForm();
      if(row) {
        getExceptionFilePolicy(row.id!).then((res:any)=>{
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
    // 提交
    const onSubmit = () => {
      const formWrap = unref(formRef) as any;
      if (!formWrap) return;
      formWrap.validate((valid: boolean) => {
        if (valid) {
          state.loading = true;
          if(!state.formData.id || state.formData.id===0){
            //添加
          addExceptionFilePolicy(state.formData).then(()=>{
              ElMessage.success('添加成功');
              closeDialog(); // 关闭弹窗
              emit('ExceptionFilePolicyList')
            }).finally(()=>{
              state.loading = false;
            })
          }else{
            //修改
          updateExceptionFilePolicy(state.formData).then(()=>{
              ElMessage.success('修改成功');
              closeDialog(); // 关闭弹窗
              emit('ExceptionFilePolicyList')
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
        fileName: undefined,        
        fileMd5: undefined,        
        action: undefined,        
        operator: undefined,        
        createdAt: undefined,        
        updatedAt: undefined,        
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