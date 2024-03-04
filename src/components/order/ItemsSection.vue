<template>
  <v-list>
    <v-list-item v-for="(item, i) in items" :key="i" lines="two">
      <template v-slot:prepend>
        <v-avatar v-if="item.productPic">
          <v-img :src="item.productPic"></v-img>
        </v-avatar>
        <v-avatar v-else>
          <v-icon>mdi-image-off</v-icon>
        </v-avatar>
      </template>
      <v-list-item-title class="text-caption font-weight-bold">
        {{ item.productName ? item.productName : "" }}
      </v-list-item-title>
      <v-list-item-subtitle class="text-caption">
        {{ item.productSubTitle ? item.productSubTitle : "" }}
      </v-list-item-subtitle>
      <template v-slot:append>
        <div>
          <v-label class="text-caption font-weight-mediumn"
            >x
            {{ item.productQuantity ? item.productQuantity : "NaN" }}</v-label
          >
          <div class="text-caption font-weight-bold text--grey">¥ {{item.productPrice?usePriceYuan(item.productPrice):'NaN'}}</div>
        </div>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { usePriceYuan } from "@/composables/price";
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>
