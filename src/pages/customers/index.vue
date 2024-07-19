<template>
  <v-toolbar color="transparent" density="compact" class="border">
    <v-tabs density="compact" v-model="tab">
      <v-tab class="text-caption" :value="1">客户</v-tab>
    </v-tabs>
  </v-toolbar>
  <VTabsWindow v-model="tab">
    <VTabsWindowItem :value="1">
      <CustomerDataTable />
    </VTabsWindowItem>
  </VTabsWindow>
</template>

<script setup lang="ts">
const tab = ref(null);
</script>

<route lang="yaml">
meta:
  title: "客户中心"
  breadcrumb: 客户
</route>
