<template>  
  <div class="system-UserVerificationPolicy-edit">
    <!-- 添加或修改用户验证策略对话框 -->
    <el-dialog v-model="isShowDialog" width="769px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.system-UserVerificationPolicy-edit .el-dialog', '.system-UserVerificationPolicy-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'用户验证策略'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="90px">          
        <el-form-item label="策略类型" prop="policyType">
          <el-select v-model="formData.policyType" placeholder="请选择策略类型" >
            <el-option label="请选择字典生成" value="" />
          </el-select>
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
  listUserVerificationPolicy,
  getUserVerificationPolicy,
  delUserVerificationPolicy,
  addUserVerificationPolicy,
  updateUserVerificationPolicy,  
} from "/@/api/system/UserVerificationPolicy";
import {
  UserVerificationPolicyTableColumns,
  UserVerificationPolicyInfoData,
  UserVerificationPolicyTableDataState,
  UserVerificationPolicyEditState
} from "/@/views/system/UserVerificationPolicy/list/component/model"
export default defineComponent({
  name:"apiV1SystemUserVerificationPolicyEdit",
  components:{    
  },
  props:{    
  },
  setup(props,{emit}) {    
    const {proxy} = <any>getCurrentInstance()
    const formRef = ref<HTMLElement | null>(null);
    const menuRef = ref();    
    const state = reactive<UserVerificationPolicyEditState>({
      loading:false,
      isShowDialog: false,
      formData: {        
        id: undefined,        
        policyType: undefined,        
        createdAt: undefined,        
        updatedAt: undefined,        
      },
      // 表单校验
      rules: {        
        policyType : [
            { required: true, message: "策略类型不能为空", trigger: "blur" }
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
    const openDialog = (row?: UserVerificationPolicyInfoData) => {
      resetForm();
      if(row) {
        getUserVerificationPolicy(row.id!).then((res:any)=>{
          const data = res.data;          
          data.policyType = parseInt(data.policyType)          
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
          addUserVerificationPolicy(state.formData).then(()=>{
              ElMessage.success('添加成功');
              closeDialog(); // 关闭弹窗
              emit('UserVerificationPolicyList')
            }).finally(()=>{
              state.loading = false;
            })
          }else{
            //修改
          updateUserVerificationPolicy(state.formData).then(()=>{
              ElMessage.success('修改成功');
              closeDialog(); // 关闭弹窗
              emit('UserVerificationPolicyList')
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
        policyType: undefined,        
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