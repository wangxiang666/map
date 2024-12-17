<template>
  <div class="add-form">
    <h2 class="title">新增预案</h2>
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="auto"
    label-position="right">        
        <el-form-item label="预案名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入预案名称" />
        </el-form-item>          
        <el-form-item label="毁伤类型" prop="damageType">
          <el-select v-model="formData.damageType" placeholder="请选择毁伤类型" @change="typeChange">
            <el-option label="信息毁伤" :value="1" />
            <el-option label="硬毁伤" :value="2" />
          </el-select>
        </el-form-item>          
        <el-form-item label="攻击手段" prop="attackMethod">
          <el-select v-model="formData.attackMethod" placeholder="请选择攻击手段" >
            <el-option v-for="item in attackMethodOptions" :key="item.label" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>        
        <template v-if="formData.damageType===2">
          <el-form-item label="武器型号" prop="weaponModel">
          <el-input v-model="formData.weaponModel" placeholder="请输入武器型号" />
        </el-form-item>        
        <el-form-item label="数量" prop="weaponNum">
          <el-input v-model="formData.weaponNum" placeholder="请输入数量" />
        </el-form-item>  
        </template>      
        <el-form-item label="是否有防御模型" prop="defenseFlag">
          <el-switch v-model="formData.defenseFlag" :active-value="1" :inactive-value="0"/>
        </el-form-item>          
        <el-form-item label="防御武器" prop="defensiveWeapon" v-if="formData.defenseFlag===1">
          <el-select v-model="formData.defensiveWeapon" placeholder="请选择防御武器" >
            <el-option v-for="item in defensiveWeaponOptions" :key="item.label" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>        
        <template v-if="formData.defensiveWeapon==4&&formData.defenseFlag===1">
          <el-form-item label="风幕类型" prop="windType">
          <el-input v-model="formData.windType" placeholder="请输入风幕类型" />
        </el-form-item>        
        <el-form-item label="风幕数量" prop="windNum">
          <el-input v-model="formData.windNum" placeholder="请输入风幕数量" />
        </el-form-item>        
        <el-form-item label="风幕高度" prop="windH">
          <el-input v-model="formData.windH" placeholder="请输入风幕高度" />
        </el-form-item> 
        </template>      
        <div class="submit-bottom">
        <el-button type="primary"
                   class="submit-btn bg-form-btn" @click="onSubmit">确认</el-button>
        <el-button type="primary"
                   class="submit-btn bg-form-btn" @click="onCancel">返回</el-button>
      </div>
      </el-form>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent,ref,unref,getCurrentInstance, computed } from 'vue';
import {ElMessageBox, ElMessage, FormInstance,UploadProps} from 'element-plus';
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
  PlanMgrEditState
} from "./model"
import { attackMethodDic,defensiveWeaponDic } from '/@/views/visualizing/pages/dic';
export default defineComponent({
  name:"apiV1SimPlanMgrEdit",
  components:{    
  },
  props:{    
  },
  setup(props,{emit}) {    
    const {proxy} = <any>getCurrentInstance()
    const formRef = ref<HTMLElement | null>(null);
    const menuRef = ref();    
    const state = reactive<PlanMgrEditState>({
      loading:false,
      formData: {        
        id: undefined,        
        name: undefined,        
        damageType: undefined,        
        attackMethod: undefined,        
        weaponModel: undefined,        
        weaponNum: undefined,        
        defenseFlag: 0 ,        
        defensiveWeapon: undefined,        
        windType: undefined,        
        windNum: undefined,        
        windH: undefined,        
        operator: undefined,        
        createdAt: undefined,        
        updatedAt: undefined,        
      },
      // 表单校验
      rules: {        
        name : [
            { required: true, message: "预案名称不能为空", trigger: "blur" }
        ],        
        attackMethod : [
            { required: true, message: "攻击手段不能为空", trigger: "blur" }
        ],        
        weaponModel : [
            { required: true, message: "武器型号不能为空", trigger: "blur" }
        ],        
        defensiveWeapon : [
            { required: true, message: "防御武器不能为空", trigger: "blur" }
        ]      
      }
    });
    // 打开弹窗
    const openDialog = (row?: PlanMgrInfoData) => {
      resetForm();
      if(row) {
        getPlanMgr(row.id!).then((res:any)=>{
          const data = res.data;          
          data.damageType = parseInt(data.damageType)          
          data.attackMethod = ''+data.attackMethod          
          data.defenseFlag = parseInt(data.defenseFlag)          
          data.defensiveWeapon = ''+data.defensiveWeapon          
          state.formData = data;
      })
    }
    };
    // 取消
    const onCancel = () => {
      emit('cancel');
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
          addPlanMgr(state.formData).then(()=>{
              ElMessage.success('添加成功');
              emit('operateDone')
            }).finally(()=>{
              state.loading = false;
            })
          }else{
            //修改
          updatePlanMgr(state.formData).then(()=>{
              ElMessage.success('修改成功');
              emit('operateDone')
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
        damageType: undefined,        
        attackMethod: undefined,        
        weaponModel: undefined,        
        weaponNum: undefined,        
        defenseFlag: 0 ,        
        defensiveWeapon: undefined,        
        windType: undefined,        
        windNum: undefined,        
        windH: undefined,        
        operator: undefined,        
        createdAt: undefined,        
        updatedAt: undefined,        
      }
    };
    const attackMethodOptions = computed(() => {
      return attackMethodDic.filter((item:any)=>item.damageType===state.formData.damageType)
    });
    const defensiveWeaponOptions = computed(() => {
      return defensiveWeaponDic.filter((item:any)=>item.attackMethod.indexOf(state.formData.attackMethod)>-1)
    });
    const typeChange = ()=>{
      const {name,damageType} = state.formData
      resetForm()
      state.formData.name = name
      state.formData.damageType = damageType
    }
    return {
      defensiveWeaponOptions,
      typeChange,
      attackMethodOptions,
      proxy,
      openDialog,
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
.add-form {
	padding: 30px;
	border-radius: 8px;
	color: #fff;
}

.title {
	text-align: center;
	color: #fff;
	margin-bottom: 60px;
}
.submit-bottom {
	width: 100%;
	display: flex;
	justify-content: center;
}
.submit-btn {
	width: 248px;
	height: 60px;
	font-size: 28px;
	margin: 0 auto;
}

:deep(.el-switch__core) {
	border-color: #0a5999 !important;
	background: rgba(0, 60, 120, 0.3) !important;
}
:deep(.el-form-item) {
	margin-bottom: 24px;
}
</style>
