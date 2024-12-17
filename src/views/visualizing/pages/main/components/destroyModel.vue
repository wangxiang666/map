<template>
  <div class="model-detail">
    <div class="detail-item" :class="{'detail-item-big':!item.name}" v-for="item in list" :key="item.name">{{ item.name }}{{ item.value }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const list = ref([
  {
    name: '毁伤武器：',
    value: '石墨炸弹'
  },
  {
    name: '攻击目标：',
    value: 'XX电厂'
  },
  {
    name: '武器描述：',
    value: '描述信息'
  },
  {
    name: '目标参数',
    value: ''
  },
  {
    name: '',
    value: ''
  },
])
</script>
<style lang="scss" scoped>
.model-detail{
  width: 100%;;
  height: 100%;
  display: flex;
  align-items: center;
  color: #fff;
  flex-direction: column;
  padding: 10px 0 0 10px;
  .detail-item{
    width: 100%;
    height: 42px;
    background: url('../../../images/menu2.png') no-repeat;
    background-size: 100% 100%;
    line-height: 42px;
    text-align: center;
  }
  .detail-item-big{
    flex: 1;
  }
}
</style>