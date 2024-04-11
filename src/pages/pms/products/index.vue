<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-btn
            variant="tonal"
            size="small"
            class="me-2"
          >
            导出
          </v-btn>

          <v-btn
            variant="elevated"
            size="small"
            class="me-2"
            to="/pms/products/new"
          >
            创建商品
          </v-btn>
        </AppBreadcrumb>
        <ProductDataTable class="mt-4"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<route lang="yaml">
meta:
  title: "商品中心"
  breadcrumb: "商品"
</route>
