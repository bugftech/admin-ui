<template>
  <v-data-table
    density="comfortable"
    show-select
    return-object
    class="text-caption"
    hover
    :headers="headers"
    :items="items"
    v-bind="$attrs"
  >
    <template v-for="slotName in keys" v-slot:[`item.${slotName}`]="{ item }">
      <slot :name="`item.${slotName}`" :item="item"></slot>
    </template>
    <template v-slot:no-data>
      <slot name="no-data"></slot>
    </template>
    <template v-slot:loading> </template>
  </v-data-table>
</template>

<script setup>
import { defineOptions } from "vue";
import { VDataTable } from "vuetify/components";

defineOptions({
  inheritAttrs: false,
  extends: VDataTable,
});

const props = defineProps({
  headers: {
    type: Array,
    default: () => [],
  },
  items: {
    type: Array,
    default: () => [],
  },
});

const keys = computed(() => {
  const headerItems = props.headers.length
    ? props.headers.map((item) => item.key)
    : [];
  return headerItems;
});
</script>
