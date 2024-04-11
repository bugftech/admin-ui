<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-btn variant="tonal" size="small" class="me-2"> 导出 </v-btn>
          <DiscountNewMenu />
        </AppBreadcrumb>
        <!--工具栏-->
        <v-card>
          <v-data-table :headers="headers" :items="[]" class="text-caption">
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const headers = [
  {
    title: "标题",
    key: "title",
  },
  {
    title: "状态",
    key: "status",
  },
  {
    title: "方法",
    key: "way",
  },
  {
    title: "已使用",
    key: "count",
  },
  {
    title: "客户策略",
    key: "customers",
  },
];

const items = [{}];
</script>

<route lang="yaml">
meta:
  title: 折扣中心"
  breadcrumb: "折扣"
</route>
