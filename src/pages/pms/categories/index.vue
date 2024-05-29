<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-btn rounded="lg" size="small" to="/pms/categories/new" variant="elevated">
            新增分类
          </v-btn>
        </AppBreadcrumb>
        <CategoryDataTable ref="data" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup></script>

<route lang="yaml">
meta:
  title: "商品分类"
  breadcrumb: "分类"
</route>
