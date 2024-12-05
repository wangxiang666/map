<template>
  <!-- 用户验证策略详情抽屉 -->  
  <div class="system-UserVerificationPolicy-detail">
    <el-dialog v-model="isShowDialog" width="800">
      <template #header>
        <h4>用户验证策略详情</h4>
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
                表id
              </div>
            </template>
            <el-tooltip :content=" formData.id ">
              <span>{{ formData.id }}</span>
            </el-tooltip>
          </el-descriptions-item>          
          <el-descriptions-item label-class-name="template-cell-label">
            <template #label>
              <div class="cell-item">
                策略类型
              </div>
            </template>
            <el-tooltip :content=" formData.policyType ">
              <span>{{ formData.policyType }}</span>
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
    name:"apiV1SystemUserVerificationPolicyDetail",
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
          menuRef,
          formRef,          
          ...toRefs(state),
        };
      }
  })
</script>
<style scoped>  
  .system-UserVerificationPolicy-detail :deep(.el-form-item--large .el-form-item__label){
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