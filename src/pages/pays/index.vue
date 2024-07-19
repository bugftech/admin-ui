<template>
  <v-toolbar color="transparent" density="compact" class="border">
    <v-tabs density="compact" v-model="tab">
      <v-tab class="text-caption">支付</v-tab>
    </v-tabs>
  </v-toolbar>
  <VTabsWindow v-model="tab">
    <VTabsWindowItem :value="1">
      <PayDataTable />
    </VTabsWindowItem>
  </VTabsWindow>
</template>

<script setup lang="ts">
const tab = ref(null);
</script>

<route lang="yaml">
meta:
  title: "支付中心"
  breadcrumb: "支付"
</route>
