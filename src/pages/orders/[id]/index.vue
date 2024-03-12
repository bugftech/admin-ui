<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-toolbar color="transparent">
          <AppBackBtn />
          <v-toolbar-title class="text-body-1 font-weight-bold">
            订单#<span>{{ id }}</span>
          </v-toolbar-title>

          <v-spacer />
          <v-btn
            prepend-icon="mdi-invoice"
            variant="elevated"
            class="me-2"
            size="small"
            >开发票</v-btn
          >
          <v-btn
            prepend-icon="mdi-content-copy"
            variant="elevated"
            class="me-2"
            size="small"
            @click.stop="copy"
            >复制</v-btn
          >
          <v-btn
            append-icon="mdi-link"
            variant="elevated"
            class="me-2"
            size="small"
            >分享</v-btn
          >
          <v-sheet class="rounded-pill elevation-1">
            <v-btn
              icon="mdi-menu-left"
              rounded="0"
              class="px-4 rounded-l-pill"
              size="x-small"
              @click="prev"
            ></v-btn>
            <v-divider vertical />
            <v-btn
              icon="mdi-menu-right"
              rounded="0"
              class="px-4"
              size="x-small"
              @click="next"
            ></v-btn>
          </v-sheet>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <OrderStatusStepper
          :status="order?.status"
          :orderId="order?.id"
          :bfAppId="order?.bfAppId"
        />
      </v-col>
      <v-col cols="12" md="8">
        <OrderBasicInfoSection :item="order" />
        <OrderNoteSection class="mt-4" :note="order.note" v-if="order?.note" />
        <v-card class="elevation-1 mt-4">
          <v-toolbar color="transparent" density="compact">
            <v-card-title class="text-caption">订单商品</v-card-title>
          </v-toolbar>
          <v-divider />
          <v-card-text>
            <template v-if="orderItems">
              <OrderItemsSection :items="orderItems" />
            </template>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <OrderPriceSection
          :totalAmount="order?.totalAmoun"
          :payAmount="order?.payAmount"
          :promotionAmount="order?.promotionAmount"
        />

        <OrderBillSection class="mt-4" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useOrderStore } from "@/store/orders";
import { copyOrderInfo } from "@/composables/order";

const route = useRoute();
const id = route.params.id;
const orderStore = useOrderStore();
const order = ref();
const orderItems = ref([]);

order.value = orderStore.currentOrder.order;
orderItems.value = orderStore.currentOrder.orderItems;

const next = () => {
  orderStore.next();
};

const prev = () => {
  orderStore.prev();
};

const copy = () => {
  if (order) {
    copyOrderInfo({ ...order.value, items: orderItems.value });
  }
};
</script>

<route lang="yaml">
meta:
  breadcrumb: "查看"
</route>
