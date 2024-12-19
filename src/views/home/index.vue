<template>
	<div class="welcome-container">
	  <div class="welcome-card">
		<div class="welcome-content">
		  <!-- 欢迎信息 -->
		  <div class="welcome-header">
			<h1 class="welcome-title">
			  <i class="el-icon-sun" style="margin-right: 10px;"></i> 欢迎登陆
			</h1>
			<p class="welcome-subtitle">
			  <i class="el-icon-office-building" style="margin-right: 10px;"></i> 后台管理系统
			</p>
		  </div>
  
		  <!-- 当前时间 -->
		  <div class="time-info">
			<span class="current-time">
			  <i class="el-icon-clock" style="margin-right: 10px;"></i> {{ currentTime }}
			</span>
			<span class="current-date">{{ currentDate }}</span>
		  </div>
  
		  <!-- 装饰性图标 -->
		  <div class="decorative-icons">
			<i class="el-icon-star-off" style="font-size: 30px; color: #fff; margin: 0 10px;"></i>
			<i class="el-icon-heart" style="font-size: 30px; color: #fff; margin: 0 10px;"></i>
			<i class="el-icon-bell" style="font-size: 30px; color: #fff; margin: 0 10px;"></i>
		  </div>
  
		  <!-- 用户图标 -->
		  <div class="welcome-icon">
			<i class="el-icon-user" style="font-size: 50px; color: #409EFF;"></i>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  
  export default defineComponent({
	name: 'WelcomePage',
	setup() {
	  // 当前日期和时间
	  const currentDate = ref('');
	  const currentTime = ref('');
  
	  // 获取当前日期和时间
	  const updateDateTime = () => {
		const now = new Date();
		currentDate.value = now.toLocaleDateString();
		currentTime.value = now.toLocaleTimeString();
	  };
  
	  // 每秒更新时间
	  onMounted(() => {
		updateDateTime();
		setInterval(updateDateTime, 1000);
	  });
  
	  return {
		currentDate,
		currentTime
	  };
	}
  });
  </script>
  
  <style scoped>
  /* 整体容器 */
  .welcome-container {
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: linear-gradient(135deg, #6a82fb, #fc5c7d);
	color: white;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  /* 卡片样式 */
  .welcome-card {
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 15px;
	padding: 40px;
	text-align: center;
	max-width: 450px;
	width: 100%;
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  
  /* 欢迎信息 */
  .welcome-header {
	margin-bottom: 20px;
  }
  
  .welcome-title {
	font-size: 40px;
	font-weight: bold;
	margin-bottom: 10px;
  }
  
  .welcome-subtitle {
	font-size: 20px;
	color: #eaeaea;
  }
  
  .time-info {
	font-size: 20px;
	margin-bottom: 20px;
	color: #eaeaea;
  }
  
  .current-time {
	font-size: 24px;
	font-weight: bold;
  }
  
  .current-date {
	display: block;
	font-size: 16px;
	margin-top: 5px;
  }
  
  /* 装饰性图标 */
  .decorative-icons {
	margin-top: 20px;
	margin-bottom: 20px;
  }
  
  .decorative-icons i {
	margin: 0 10px;
  }
  
  /* 用户图标 */
  .welcome-icon {
	margin-top: 30px;
  }
  
  .welcome-icon i {
	font-size: 50px;
	color: #409EFF;
  }
  
  /* 响应式设计 */
  @media (max-width: 600px) {
	.welcome-card {
	  padding: 30px;
	  max-width: 350px;
	}
  
	.welcome-title {
	  font-size: 30px;
	}
  
	.welcome-subtitle {
	  font-size: 18px;
	}
  
	.time-info {
	  font-size: 18px;
	}
  
	.current-time {
	  font-size: 22px;
	}
  
	.current-date {
	  font-size: 14px;
	}
  }
  </style>
  