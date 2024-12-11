<template>
  <div class="data-list">
    <!-- 搜索区域 -->
    <div class="search-area">
      <div class="search-item">
        <span class="label">名称</span>
        <el-input v-model="searchForm.name"
                  class="custom-input" />
      </div>
      <div class="search-item">
        <span class="label">毁伤目标</span>
        <el-input v-model="searchForm.target"
                  class="custom-input" />
      </div>
      <el-button type="primary"
                 class="search-btn">查询</el-button>
      <el-button type="primary"
                 class="add-btn">新增</el-button>
    </div>

    <!-- 表格区域 -->
    <el-table :data="tableData"
              border
              style="width: 100%">
      <el-table-column prop="id"
                       label="id"
                       width="80" />
      <el-table-column prop="name"
                       label="名称" />
      <el-table-column prop="target"
                       label="毁伤目标" />
      <el-table-column prop="prediction"
                       label="毁伤预测" />
      <el-table-column prop="method"
                       label="控制方式" />
      <el-table-column prop="status"
                       label="状态" />
      <el-table-column prop="creator"
                       label="创建人" />
      <el-table-column label="操作"
                       width="280">
        <template #default>
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
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <span>上一页</span>
      <span class="page-num">1</span>
      <span>下一页</span>
      <span class="total">共10页</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchForm = ref({
  name: '',
  target: ''
})

const tableData = ref([])
</script>

<style scoped>
.data-list {
	padding: 20px;
	color: #fff;
	width: calc(100% - 800px);
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

/* 按钮样式 */
.search-btn,
.add-btn {
	margin-left: 10px;
	/* 需要添加蓝色渐变背景图片 */
	/* background-image: url('@/assets/button-bg.png'); */
	background: linear-gradient(to right, #0066ff, #0099ff);
	border: none;
}

/* 表格样式覆盖 */
:deep(.el-table) {
	background-color: transparent;
	color: #fff;
}

:deep(.el-table th),
:deep(.el-table tr) {
	background-color: rgba(255, 255, 255, 0.1);
	color: #fff;
}

:deep(.el-table td) {
	border-color: rgba(255, 255, 255, 0.1);
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
</style>
