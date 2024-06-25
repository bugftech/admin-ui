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
        <v-col cols="12" v-for="(item, i) in items" :key="i">
          <v-text-field
            :value="item.value / 100"
            :label="item.title"
            :placeholder="item.title"
            persistent-placeholder
            variant="solo-filled"
            flat
            readonly
            suffix="元"
            prefix="¥"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
// Utilities
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
    title: "总价",
    value: props.totalAmount,
  },
  {
    title: "促销价格",
    value: props.promotionAmount,
  },
  {
    title: "打折金额",
    value: props.discountAmount,
  },
  {
    title: "应付价格",
    value: props.payAmount,
  },
];
</script>
