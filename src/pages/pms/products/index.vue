<template>
  <v-toolbar color="transparent" density="compact" class="border">
    <v-tabs density="compact" v-model="tab">
      <v-tab class="text-caption">商品</v-tab>
    </v-tabs>
  </v-toolbar>
  <VTabsWindow v-model="tab">
    <VTabsWindowItem :value="1">
      <ProductDataTable />
    </VTabsWindowItem>
  </VTabsWindow>
</template>

<script setup>
const tab = ref(null);
</script>

<route lang="yaml">
meta:
  title: "商品中心"
  breadcrumb: "商品"
</route>
