<template>
  <v-toolbar color="transparent" class="border">
    <v-tabs density="compact" v-model="tab">
      <v-tab class="text-caption" :value="1">短链接</v-tab>
    </v-tabs>
  </v-toolbar>
  <VTabsWindow v-model="tab">
    <VTabsWindowItem :value="1">
      <AppToolkitBar>
        <v-btn theme="dark" variant="flat" append-icon="mdi-plus" size="small">
          创建短链接
        </v-btn>
      </AppToolkitBar>
      <v-data-table :headers="headers" class="text-caption"> </v-data-table>
    </VTabsWindowItem>
  </VTabsWindow>
</template>

<script setup lang="ts">
const tab = ref(null);
const headers: any[] = [
  {
    title: "uid",
    key: "uid",
  },
  {
    title: "路径",
    key: "path",
  },
  {
    title: "创建者",
    key: "createdBy",
  },
  {
    title: "最近查看",
    key: "lastSeenAt",
  },
];
</script>

<route lang="yaml">
meta:
  title: "短链接"
  breadcrumb: "短链接"
</route>
