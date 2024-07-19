<template>
  <v-sheet class="elevation-3 rounded-lg px-4 ma-2">
    <v-toolbar density="compact" color="transparent">
      <v-btn
        prepend-icon="mdi-sync"
        size="small"
        @click="fetch"
        variant="flat"
        color="indigo"
        >刷新</v-btn
      >
      <v-divider vertical class="ma-2" />
      <v-btn
        size="small"
        :active="autoRefresh"
        prepend-icon="mdi-clock"
        variant="flat"
        class="border"
        @click="autoRefresh = !autoRefresh"
      >
        自动刷新
      </v-btn>
      <v-divider vertical class="ma-2" />
      <v-btn
        size="small"
        variant="flat"
        append-icon="mdi-magnify"
        class="border"
      >
        检索
      </v-btn>
      <v-spacer />
      <v-btn
        icon="mdi-download"
        size="small"
      >
      </v-btn>
    </v-toolbar>
  </v-sheet>
  <v-data-table
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
    <template v-slot:[`item.orderSn`]="{ item }">
      <v-chip
        size="small"
        variant="tonal"
        label
        append-icon="mdi-content-copy"
        >{{ item.orderSn }}</v-chip
      >
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
</template>

<script setup lang="ts">
// Utilities
import { ref, computed, onBeforeUnmount, watch } from "vue";
import { useRouter } from "vue-router";
import { usePriceYuan } from "@/composables/price";
import { formatDateTime } from "@/composables/time";

import { OrderInfo } from "@/sdk/order/types";
import bugfreed from "@/sdk";
import { OrderService } from "@/sdk/order/order";
const order = new OrderService({ bugfreed });

const headers: any[] = [
  {
    title: "订单编号",
    key: "orderSn",
  },
  {
    title: "订单总金额",
    key: "totalAmount",
  },
  {
    title: "应付金额",
    key: "payAmount",
  },
  {
    title: "客户",
    key: "memberUsername",
  },
  {
    title: "订单状态",
    key: "status",
  },
  {
    title: "创建时间",
    key: "createTime",
  },
];

const search = ref();
const router = useRouter();
const autoRefresh = ref(false);
const loading = ref(false);
const items = ref<OrderInfo[]>([]);

let refreshInterval: NodeJS.Timeout;

const onClickRow = async (e: any, selected: any) => {
  const { id } = selected.item;
  if (!id) return;
  router.push({ name: "/orders/[id]", params: { id: id } });
};

const filtered = computed(() => {
  return items.value.map((item) => item.order);
});

const startRefreshInterval = () => {
  refreshInterval = setInterval(fetch, 5000); // 每5秒刷新一次，可以根据需求调整时间间隔
};

const stopRefreshInterval = () => {
  clearInterval(refreshInterval);
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

const fetch = async () => {
  if (loading.value) return;
  loading.value = true;
  const { success, data } = await order.list();
  if (success) {
    items.value = data.reverse();
  }

  loading.value = false;
};

onMounted(() => {
  fetch();
});

onBeforeUnmount(() => {
  // 在组件销毁时清除定时器，防止内存泄漏
  stopRefreshInterval();
});
</script>
