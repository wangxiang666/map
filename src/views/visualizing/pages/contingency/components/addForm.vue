<template>
  <div class="add-form">
    <h2 class="title">新增预案</h2>

    <el-form :model="formData"
             label-width="auto"
             label-position="right">
      <el-form-item label="名 称">
        <el-input v-model="formData.name" />
      </el-form-item>

      <el-form-item label="毁伤类型">
        <el-select v-model="formData.damageType"
                   class="damage-select">
          <el-option label="硬毁伤"
                     value="hard" />
          <el-option label="软毁伤"
                     value="soft" />
        </el-select>
      </el-form-item>

      <el-form-item label="攻击手段">
        <el-input v-model="formData.attackMethod" />
      </el-form-item>

      <el-form-item label="武器型号">
        <el-input v-model="formData.weaponModel" />
      </el-form-item>

      <el-form-item label="是否有防御模型">
        <el-switch v-model="formData.hasDefenseModel" />
      </el-form-item>

      <div class="submit-bottom">
        <el-button type="primary"
                   class="submit-btn bg-form-btn">确认</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  damageType: '硬毁伤',
  attackMethod: '',
  weaponModel: '',
  hasDefenseModel: false
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
	margin-top: 100px;
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
	margin-bottom: 60px;
}
</style>
