<template>
  <v-toolbar color="transparent" density="compact" class="border">
    <v-tabs density="compact" v-model="tab">
      <v-tab class="text-caption">品牌</v-tab>
    </v-tabs>
  </v-toolbar>
  <VTabsWindow v-model="tab">
    <VTabsWindowItem :value="1">
      <BrandDataTable />
    </VTabsWindowItem>
  </VTabsWindow>
</template>

<script setup>
const tab = ref(null);
</script>

<route lang="yaml">
meta:
  title: "品牌中心"
  breadcrumb: "品牌"
</route>
