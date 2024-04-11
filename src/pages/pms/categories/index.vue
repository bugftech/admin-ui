<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-btn variant="tonal" size="small"> 导入 </v-btn>
          <v-btn
            variant="tonal"
            size="small"
            class="mx-2"
            @click.stop="download"
          >
            导出
          </v-btn>
          <CategoryUpsertDialog />
        </AppBreadcrumb>
        <CategoryDataTable ref="data" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const data = ref();

const download = () => {
  console.log(data.value.items);
};
</script>

<route lang="yaml">
meta:
  title: "商品分类"
  breadcrumb: 分类
</route>
