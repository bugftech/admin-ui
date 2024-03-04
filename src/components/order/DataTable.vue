<template>
  <v-card>
    <v-toolbar color="transparent">
      <AppDatePicker />
      <v-checkbox label="2S刷新一次" hide-details />
      <v-tooltip text="刷新" class="text-caption" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-sync"
            size="small"
            v-bind="props"
            @click="order.fetch"
          />
        </template>
      </v-tooltip>
      <v-spacer />
      <v-responsive max-width="344">
        <v-text-field
          flat
          density="compact"
          variant="solo-filled"
          placeholder="检索"
          class="me-2"
          prepend-inner-icon="mdi-magnify"
          v-model="search"
        >
        </v-text-field>
      </v-responsive>
    </v-toolbar>
    <v-divider />
    <v-data-table
      density="comfortable"
      show-select
      return-object
      class="text-caption"
      hover
      :loading="loading"
      :search="search"
      :headers="headers"
      :items="filtered"
      @click:row="onClickRow"
    >
      <template v-slot:[`item.status`]="{ item }">
        <OrderStatusChip :status="item.status" />
      </template>
      <template v-slot:[`item.createTime`]="{ item }">
        <div>{{ formatDateTime(item.createTime) }}</div>
      </template>
      <template v-slot:[`item.totalAmount`]="{ item }">
        <div>{{ usePriceYuan(item.totalAmount) }}</div>
      </template>
      <template v-slot:[`item.payAmount`]="{ item }">
        <div>{{ usePriceYuan(item.payAmount) }}</div>
      </template>
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useOrderStore } from "@/store/orders";
import { usePriceYuan } from "@/composables/price";
// Utilities
import { formatDateTime } from "@/composables/time";

const order = useOrderStore();
const search = ref();
const router = useRouter();
const onClickRow = (e: any, selected: any) => {
  order.setCurrentIndex(selected.index);
  router.push({ name: "/orders/[id]/", params: { id: selected.index } });
};

const { headers, items, loading } = storeToRefs(order);

const filtered = computed(() => {
  return items.value.map((item) => item.order);
});
</script>
