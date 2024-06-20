<template>
  <v-card>
    <v-toolbar color="transparent" density="compact">
      <v-card-title class="text-caption">订单状态</v-card-title>
      <v-spacer />
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            variant="flat"
            size="small"
            rounded="lg"
            color="orange-accent-2"
            prepend-icon="mdi-update"
          >
            更新状态
          </v-btn>
        </template>
        <v-list nav density="compact">
          <v-list-item
            v-for="(item, i) in filtered"
            :key="i"
            @click="updateStatus(item.status)"
          >
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-divider />
    <v-stepper :model-value="step" class="elevation-0">
      <v-stepper-header>
        <template v-for="(item, i) in items" :key="i">
          <v-divider v-if="i"></v-divider>
          <v-stepper-item
            v-bind="item"
            :rules="[item.rule]"
            :value="item.status"
            :complete="status > item.status"
          >
            <template v-slot:title>
              <div class="text-caption font-weight-bold">{{ item.title }}</div>
            </template>
          </v-stepper-item>
        </template>
      </v-stepper-header>
    </v-stepper>

    <v-stepper-vertical :items="['Step 1', 'Step 2', 'Step 3']"></v-stepper-vertical>

  </v-card>

  <AppConfirmDialog ref="confirm" />
</template>

<script setup>
import { useOrderStore } from "@/store/orders";

import { useAppStore } from "@/store/app";

const props = defineProps({
  orderId: {
    type: Number,
  },
  // TODO: remove后续会移除次选项
  bfAppId: {
    type: Number,
  },
  status: {
    type: Number,
  },
});

const items = [
  {
    status: 0,
    title: "未支付",
    rule: () => true,
  },
  {
    status: 1,
    title: "待发货",
    rule: () => true,
  },
  {
    status: 2,
    title: "已发货",
    rule: () => true,
  },
  {
    status: 3,
    title: "已完成",
    rule: () => true,
  },
  {
    status: 4,
    title: "已关闭",
    rule: () => true,
  },
  {
    status: 5,
    title: "无效的订单",
    rule: () => true,
  },
];

const { orderId, status, bfAppId } = props;

const step = ref(props.status);

const filtered = items.filter((item) => item.status > status);
// confirm dialog ref
const confirm = ref();
const orderStore = useOrderStore();
const app = useAppStore();

const updateStatus = async (expectStatus) => {
  const selectedItem = items.find((item) => item.status === expectStatus);
  confirm.value
    .open(
      "更新订单状态",
      `手动将订单状态更新为 <span class="d-inline py-1 px-2 bg-red rounded-pill font-weight-bold"> ${selectedItem.title}</span> .更新后将无法再次回退，请谨慎操作。`
    )
    .then(async (ok) => {
      if (ok) {
        const { success } = await orderStore.updateStatus(orderId, {
          status: selectedItem.status,
          bfAppId: bfAppId,
        });

        if (success) {
          app.snackbar("", { message: "订单状态更新成功" });
          step.value = expectStatus;
        } else {
          app.snackbar("", { message: "订单状态更新失败" });
        }
      }
    });
};
</script>
