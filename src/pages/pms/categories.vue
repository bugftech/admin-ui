<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-btn variant="tonal" size="small"> 导入 </v-btn>
          <v-btn variant="tonal" size="small" class="mx-2"> 导出 </v-btn>
          <CategoryUpsertDialog />
        </AppBreadcrumb>
        <CategoryDataTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCategoryStore } from "@/store/category";
const store = useCategoryStore();

onMounted(async () => {
  const { success } = await store.fetch();
  console.log("fetch categories ok");
});
</script>

<route lang="yaml">
meta:
  breadcrumb: 分类
</route>
