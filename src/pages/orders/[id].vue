<template>
  <v-container>
    <v-row>
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
        </v-toolbar>
      </v-col>
      <v-col cols="12">
        <OrderStatusStepper
          v-if="order"
          :status="order.status"
          :orderId="order.id"
          :bfAppId="order.bfAppId"
        />
      </v-col>
      <v-col cols="12" md="8">
        <OrderBasicInfoSection :item="order" />
        <OrderNoteSection class="mt-4" :note="order.note" v-if="order?.note" />
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="elevation-1 mb-4">
          <v-toolbar color="transparent" density="compact">
            <v-card-title class="text-caption">订单商品</v-card-title>
          </v-toolbar>
          <v-divider />
          <v-card-text class="pa-0">
            <template v-if="orderItems">
              <OrderItemsSection :items="orderItems" />
            </template>
          </v-card-text>
        </v-card>
        <OrderPriceSection
          v-if="order"
          :totalAmount="order.totalAmount"
          :payAmount="order.payAmount"
          :promotionAmount="order.promotionAmount"
        />

        <OrderBillSection class="mt-4" />

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { copyOrderInfo } from "@/composables/order";
import BFSDK from "@/api/sdk";
import { Order, OrderItem } from "@/interfaces/order";
const route = useRoute();
const id = (route.params as { id: number }).id;

const order = ref<Order>();
const orderItems = ref<OrderItem[]>([]);
const copy = () => {
  if (order) {
    copyOrderInfo({
      ...order.value,
      items: orderItems.value,
    });
  }
};

onMounted(async () => {
  if (!id) return;
  const { success, data } = await BFSDK.getOrderById(id, true);
  if (success) {
    order.value = data.order;
    orderItems.value = data.orderItems;
  }
});
</script>

<route lang="yaml">
meta:
  title: "编辑订单"
  breadcrumb: "查看"
</route>
