<template>
  <v-divider />
  <v-toolbar density="compact" color="transparent">
    <v-tabs density="compact" v-model="tab">
      <v-tab class="text-caption" :value="1">数据</v-tab>
      <v-tab class="text-caption" :value="3">订单配置</v-tab>
    </v-tabs>
  </v-toolbar>
  <v-divider />
  <VTabsWindow v-model="tab">
    <VTabsWindowItem :value="1">
      <OrderDataTable />
    </VTabsWindowItem>
    <VTabsWindowItem :value="2">
      <OrderDataTable />
    </VTabsWindowItem>
  </VTabsWindow>
</template>

<script setup>
const tab = ref(null);
</script>

<route lang="yaml">
name: "orders"
meta:
  title: "订单中心"
  breadcrumb: "订单"
</route>
