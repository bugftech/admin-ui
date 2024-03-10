<template>
  <v-tabs density="compact" v-model="activeTab">
    <v-tab class="text-caption" v-for="(tab, i) in tabs" :to="tab.to" :key="i" exact
      >{{ tab.title }}
    </v-tab>
  </v-tabs>
</template>

<script setup>
const activeTab = ref("/settings/pay");

const tabs = [
  {
    title: "基础信息",
    to: "/settings/basic",
  },
  {
    title: "支付",
    to: "/settings/pay",
  },
  {
    title: "通知",
    to: "/settings/notification",
  },
  {
    title: "服务账号",
    to: "/settings/serviceaccount",
  },
];
</script>
