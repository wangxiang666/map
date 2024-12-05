<template>
  <!-- 例外文件策略详情抽屉 -->  
  <div class="engine-ExceptionFilePolicy-detail">
    <el-dialog v-model="isShowDialog" width="800">
      <template #header>
        <h4>例外文件策略详情</h4>
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
                文件名称
              </div>
            </template>
            <el-tooltip :content=" formData.fileName ">
              <span>{{ formData.fileName }}</span>
            </el-tooltip>
          </el-descriptions-item>          
          <el-descriptions-item label-class-name="template-cell-label">
            <template #label>
              <div class="cell-item">
                文件特征
              </div>
            </template>
            <el-tooltip :content=" formData.fileMd5 ">
              <span>{{ formData.fileMd5 }}</span>
            </el-tooltip>
          </el-descriptions-item>          
          <el-descriptions-item label-class-name="template-cell-label">
            <template #label>
              <div class="cell-item">
                状态
              </div>
            </template>
            <el-tooltip :content=" formData.action ">
              <span>{{ formData.action }}</span>
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
    name:"apiV1EngineExceptionFilePolicyDetail",
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
          menuRef,
          formRef,          
          ...toRefs(state),
        };
      }
  })
</script>
<style scoped>  
  .engine-ExceptionFilePolicy-detail :deep(.el-form-item--large .el-form-item__label){
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