<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-btn
            variant="elevated"
            prepend-icon="mdi-download-circle-outline"
            size="small"
            class="me-2"
          >
            下载CSV
          </v-btn>
        </AppBreadcrumb>
        <!--工具栏-->
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <OrderDataTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup></script>

<route lang="yaml">
name: "orders"
meta:
  title: "订单中心"
  breadcrumb: "订单"
</route>
