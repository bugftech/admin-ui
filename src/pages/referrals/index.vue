<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-btn variant="elevated" size="small" to="/referrals/new">添加推荐人</v-btn>
        </AppBreadcrumb>
        <ReferralDataTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>

<route lang="yaml">
meta:
  title: "推荐人"
  breadcrumb: 推荐人
</route>
