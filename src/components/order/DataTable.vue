<template>
  <v-card>
    <v-toolbar color="transparent">
      <AppDatePicker />
      <v-checkbox
        hide-details
        v-model="autoRefresh"
        true-icon="fa:fas fa-check-square"
        false-icon="fa:far fa-square"
      >
        <template v-slot:label>
          <div class="text-caption font-weight-bold">5S刷新一次</div>
        </template>
      </v-checkbox>
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
import { ref, computed, onBeforeUnmount, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useOrderStore } from "@/store/orders";
import { usePriceYuan } from "@/composables/price";
// Utilities
import { formatDateTime } from "@/composables/time";

const order = useOrderStore();
const search = ref();
const router = useRouter();
const autoRefresh = ref(false);
let refreshInterval: NodeJS.Timeout;

const onClickRow = (e: any, selected: any) => {
  order.setCurrentIndex(selected.index);
  router.push({ name: "/orders/[id]/", params: { id: selected.index } });
};

const { headers, items, loading } = storeToRefs(order);

const filtered = computed(() => {
  return items.value.map((item) => item.order);
});

const startRefreshInterval = () => {
  refreshInterval = setInterval(refreshData, 5000); // 每5秒刷新一次，可以根据需求调整时间间隔
};

const stopRefreshInterval = () => {
  clearInterval(refreshInterval);
};

const refreshData = () => {
  // 这里是请求刷新数据的逻辑，可以是接口请求或者其他数据更新方法
  // 这里假设通过axios请求数据
  order.fetch()
  console.log("refresh");
};

watch(autoRefresh, (newVal) => {
  if (newVal) {
    // 当checkbox为true时启动定时器
    startRefreshInterval();
  } else {
    // 当checkbox为false时关闭定时器
    stopRefreshInterval();
  }
});

onBeforeUnmount(() => {
  // 在组件销毁时清除定时器，防止内存泄漏
  stopRefreshInterval();
});
</script>
