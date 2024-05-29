<template>
  <v-card>
    <v-toolbar color="transparent" density="compact">
      <v-tooltip text="刷新" class="text-caption" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-sync"
            size="small"
            v-bind="props"
            @click="fetchOrders"
          />
        </template>
      </v-tooltip>
      <v-spacer />
      <v-checkbox
        hide-details
        density="compact"
        v-model="autoRefresh"
        true-icon="fa:fas fa-check-square"
        false-icon="fa:far fa-square"
      >
        <template v-slot:label>
          <div class="text-caption font-weight-bold me-2">5S</div>
        </template>
      </v-checkbox>
    </v-toolbar>
    <v-divider />
    <v-text-field
      flat
      density="compact"
      variant="solo"
      placeholder="检索"
      rounded="0"
      prepend-inner-icon="mdi-magnify"
      v-model="search"
    >
    </v-text-field>
    <v-divider />
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
// Utilities
import { ref, computed, onBeforeUnmount, watch } from "vue";
import { useRouter } from "vue-router";
import { usePriceYuan } from "@/composables/price";
import { formatDateTime } from "@/composables/time";
import BFSDK from "@/api/sdk";
import { OrderInfo } from "@/interfaces/order";

const headers: any[] = [
  {
    title: "订单编号",
    key: "id",
  },
  {
    title: "订单总金额",
    key: "totalAmount",
  },
  {
    title: "实付金额",
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
  refreshInterval = setInterval(fetchOrders, 5000); // 每5秒刷新一次，可以根据需求调整时间间隔
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

const fetchOrders = async () => {
  if (loading.value) return;
  loading.value = true;
  const { success, data } = await BFSDK.getOrders();
  if (success) {
    items.value = data.reverse();
  }

  loading.value = false;
};

onMounted(() => {
  fetchOrders();
});

onBeforeUnmount(() => {
  // 在组件销毁时清除定时器，防止内存泄漏
  stopRefreshInterval();
});
</script>
