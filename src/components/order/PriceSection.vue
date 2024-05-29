<template>
  <v-card>
    <v-toolbar color="transparent" density="compact">
      <v-card-title class="text-caption">价格信息</v-card-title>
      <v-spacer />
      <v-btn variant="tonal" prepend-icon="mdi-help-circle" size="small"
        >对价格有疑问</v-btn
      >
    </v-toolbar>
    <v-divider />
    <v-card-text>
      <v-row dense>
        <v-col
          cols="12"
          class="d-flex justify-space-between"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-label class="text-caption font-weight-mediumn">{{
            item.title
          }}</v-label>
          <div class="text-caption font-weight-bold">{{ item.value }}</div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
// Utilities
import { usePriceYuan } from "@/composables/price";
const props = defineProps({
  totalAmount: {
    type: Number,
    default: 0,
  },
  payAmount: {
    type: Number,
    default: 0,
  },
  promotionAmount: {
    type: Number,
    default: 0,
  },
  discountAmount: {
    type: Number,
    default: 0,
  },
});

const items = ref([]);

items.value = [
  {
    title: "总价:",
    value: usePriceYuan(props.totalAmount),
  },
  {
    title: "促销价格:",
    value: usePriceYuan(props.promotionAmount),
  },
  {
    title: "打折金额:",
    value: usePriceYuan(props.discountAmount),
  },
  {
    title: "应付价格:",
    value: usePriceYuan(props.payAmount),
  },
];
</script>
