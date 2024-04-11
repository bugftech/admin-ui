<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn variant="elevated" size="small" v-bind="props"> 创建折扣 </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" link :to="item.to">
        <template v-slot:prepend>
          <v-icon>{{ item.prependIcon }}</v-icon>
        </template>

        <v-list-item-title class="text-caption font-weight-bold">
          {{ item.title }}</v-list-item-title
        >
        <v-list-item-subtitle class="text-caption">{{
          item.subtitle
        }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
const items = [
  {
    prependIcon: "mdi-shopping",
    title: "商品折扣",
    subtitle: "对特定商品或者多个商品进行折扣处理",
    to: "/discounts/new?type=product",
  },
  {
    prependIcon: "mdi-cart",
    title: "订单折扣",
    subtitle: "对订单总价进行折扣处理",
    to: "/discounts/new?type=order",
  },
  {
    prependIcon: "mdi-truck",
    title: "运费折扣",
    subtitle: "对订单运费进行折扣处理",
    to: "/discounts/new?type=shipping",
  },
];
</script>
