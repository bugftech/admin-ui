<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb></AppBreadcrumb>
        <SettingTabs />
        <v-divider />
      </v-col>
      <v-col cols="12" md="10">
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup></script>

<route lang="yaml">
redirect: "/settings/basic"
meta:
  breadcrumb: 项目设置
</route>
