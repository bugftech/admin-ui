<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-btn variant="elevated" size="small">添加客户</v-btn>
        </AppBreadcrumb>
        <CustomerDataTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>

<route lang="yaml">
meta:
  title: "客户中心"
  breadcrumb: 客户
</route>
