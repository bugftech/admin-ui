<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn variant="tonal" v-bind="props">所有</v-btn>
    </template>
    <v-list nav>
      <v-list-item v-for="(item, index) in items" :key="index" :value="index">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
const items = [
  { title: "未支付" },
  { title: "未发货" },
  { title: "已发货" },
  { title: "已完成" },
  { title: "无效的订单" },
];
</script>
