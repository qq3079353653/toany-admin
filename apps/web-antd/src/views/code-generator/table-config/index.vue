<script setup lang="ts">
import { onMounted } from 'vue';

import { useFs } from '@fast-crud/fast-crud';

import createCrudOptions from './crud';

const { crudRef, crudBinding, crudExpose } = useFs({ createCrudOptions });

// 页面打开后获取列表数据
onMounted(() => {
  crudExpose.doRefresh();
});
</script>

<template>
  <FsCrud ref="crudRef" v-bind="crudBinding" />
</template>

<style lang="less" scoped>
/deep/ .ant-card-body {
  padding: 8px;
}
</style>
