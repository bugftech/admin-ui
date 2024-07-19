<template>
  <v-toolbar color="transparent" density="compact" class="border">
    <v-tabs density="compact" v-model="tab">
      <v-tab class="text-caption">数据</v-tab>
    </v-tabs>
  </v-toolbar>
  <VTabsWindow v-model="tab">
    <VTabsWindowItem :value="1">
      <ReferralDataTable ref="data" />
    </VTabsWindowItem>
  </VTabsWindow>
</template>

<script setup lang="ts">
const tab = ref(null);
</script>

<route lang="yaml">
meta:
  title: "推荐人"
  breadcrumb: 推荐人
</route>
