<template>
  <v-toolbar color="transparent" density="compact" class="border">
    <v-tabs density="compact" v-model="tab">
      <v-tab class="text-caption">分类</v-tab>
    </v-tabs>
  </v-toolbar>
  <VTabsWindow v-model="tab">
    <VTabsWindowItem :value="1">
      <CategoryDataTable ref="data" />
    </VTabsWindowItem>
  </VTabsWindow>
</template>

<script setup lang="ts">
const tab = ref(null);
</script>

<route lang="yaml">
meta:
  title: "商品分类"
  breadcrumb: "分类"
</route>
