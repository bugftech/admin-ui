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
            color="black"
            size="small"
            prepend-icon="mdi-update"
          >
            更新状态
          </v-btn>
        </template>
        <v-list nav density="compact">
          <v-list-item
            v-for="(item, i) in filtered"
            :key="i"
            @click="updateStatus(item.value)"
          >
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-divider />
    <v-stepper :model-value="value" class="elevation-0">
      <v-stepper-header>
        <template v-for="(item, i) in items" :key="i">
          <v-divider v-if="i"></v-divider>
          <v-stepper-item
            v-bind="item"
            :rules="[item.rule]"
            :value="item.value"
            :complete="value > item.value"
          >
            <template v-slot:title>
              <div class="text-caption font-weight-bold">{{ item.title }}</div>
            </template>
          </v-stepper-item>
        </template>
      </v-stepper-header>
    </v-stepper>
  </v-card>

  <AppConfirmDialog ref="confirm" />
</template>

<script setup>
const props = defineProps({
  orderId: {
    type: Number,
  },
  value: {
    type: Number,
    required: true,
  },
});

const items = [
  {
    value: 0,
    title: "未支付",
    rule: () => true,
  },
  {
    value: 1,
    title: "代发货",
    rule: () => true,
  },
  {
    value: 2,
    title: "已发货",
    rule: () => true,
  },
  {
    value: 3,
    title: "已完成",
    rule: () => true,
  },
  {
    value: 4,
    title: "已关闭",
    rule: () => true,
  },
  {
    value: 5,
    title: "无效的订单",
    rule: () => true,
  },
];

const filtered = items.filter((item) => item.value > props.value);
// confirm dialog ref
const confirm = ref();

const updateStatus = (status) => {
  const statusItem = items.find(item=> item.value === status);
  confirm.value
    .open(
      "更新订单状态",
      `手动将订单状态更新为 <span class="d-inline py-1 px-2 bg-red rounded-pill font-weight-bold"> ${statusItem.title}</span> .更新后将无法再次回退，请谨慎操作。`
    )
    .then((ok) => {
      if (ok) {
        console.log(status);
      }
    });
};
</script>
