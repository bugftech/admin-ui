<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-btn
            variant="elevated"
            size="small"
            class="me-2"
            to="/pms/brands/new"
          >
            添加品牌
          </v-btn>
        </AppBreadcrumb>
        <BrandDataTable class="mt-4"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
</script>

<route lang="yaml">
meta:
  title: "品牌中心"
  breadcrumb: "品牌"
</route>
