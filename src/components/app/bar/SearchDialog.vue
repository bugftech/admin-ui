<template>
  <v-dialog
    max-width="800"
    :scrim="false"
    content-class="overflow-visible align-self-start mt-0"
    max-height="900"
    scrollable
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        v-bind="props"
        variant="solo-filled"
        flat
        density="compact"
        hide-details
      >
        <template v-slot:prepend-inner>
          <v-icon size="small"> mdi-magnify </v-icon>
        </template>
        <template v-slot:append-inner>
          <v-btn
            size="x-small"
            prepend-icon="mdi-apple-keyboard-command"
            class="border"
            append-icon="mdi-temperature-kelvin"
          >
          </v-btn>
        </template>
      </v-text-field>
    </template>
    <v-autocomplete
      variant="solo"
      hide-details
      :items="items"
      density="compact"
      class="py-2 text-caption"
      placeholder="搜索"
      auto-select-first
    >
      <template v-slot:prepend-inner>
        <v-icon size="small"> mdi-magnify </v-icon>
      </template>
      <template v-slot:append-inner>
        <v-btn
          size="x-small"
          prepend-icon="mdi-apple-keyboard-command"
          class="border"
          variant="text"
        >
          K
        </v-btn>
      </template>
      <template v-slot:item="{ item }">
        <v-list-item slim link :to="item.raw.to">
          <template v-slot:prepend>
            <v-icon size="small">{{ item.raw.prependIcon }}</v-icon>
          </template>
          <template v-slot:append>
            <v-icon size="small">{{ item.raw.appendIcon }}</v-icon>
          </template>
          <v-list-item-title class="text-caption font-weight-medium">
            {{ item.raw.title }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-caption">
            {{ item.raw.subtitle }}
          </v-list-item-subtitle>
        </v-list-item>
      </template>
    </v-autocomplete>
  </v-dialog>
</template>

<script setup>
const items = ref([
  {
    prependIcon: "mdi-cart-check",
    title: "商城订单",
    subtitle: "orders",
    appendIcon: "mdi-arrow-right",
    to: "/orders"
  },
  {
    prependIcon: "mdi-google-analytics",
    title: "分析",
    subtitle: "Analyst",
    appendIcon: "mdi-arrow-right",
    to: "/orders"
  },
  {
    prependIcon: "mdi-sale",
    title: "折扣",
    subtitle: "discount",
    appendIcon: "mdi-arrow-right",
    to: "/orders"
  },
  {
    prependIcon: "mdi-ticket",
    title: "优惠券",
    subtitle: "coupons",
    appendIcon: "mdi-arrow-right",
    to: "/orders"
  },
]);
</script>

<style>
.mt-0 {
  margin-top: 0px !important;
}
</style>
