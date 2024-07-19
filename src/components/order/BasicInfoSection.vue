<template>
  <v-card class="elevation-1">
    <v-toolbar color="transparent" density="compact">
      <v-toolbar-title class="text-caption font-weight-bold"
        >基础信息</v-toolbar-title
      >
      <v-spacer />
      <v-btn size="small" class="pe-2" variant="flat" theme="dark">订单状态: {{ orderStatus[localItem.status] }}</v-btn>
    </v-toolbar>
    <v-divider />
    <v-card-text v-if="localItem">
      <v-text-field
        label="App Id"
        placeholder="BfAppID"
        variant="solo-filled"
        flat
        persistent-placeholder
        readonly
        hint="订单来源的APP ID"
        persistent-hint
        :value="localItem.bfAppId"
        hide-details="auto"
      >
      </v-text-field>
      <v-text-field
        class="mt-3"
        label="订单号"
        placeholder="订单号"
        variant="solo-filled"
        flat
        persistent-placeholder
        :value="localItem.orderSn"
        hide-details="auto"
        append-icon="mdi-content-copy"
        @click:append="copySn(localItem.orderSn)"
      >
      </v-text-field>

      <v-text-field
        class="mt-4"
        label="自动确认完成的天数"
        placeholder="自动确认完成的天数"
        variant="solo-filled"
        flat
        persistent-placeholder
        hint="订单购买到完成状态，如未点击收货，自动在指定天数确认完成。"
        persistent-hint
        suffix="/天"
        :value="localItem.autoConfirmDay"
        hide-details="auto"
      >
      </v-text-field>

      <v-text-field
        class="mt-4"
        label="订单类型"
        placeholder="订单类型"
        variant="solo-filled"
        flat
        persistent-placeholder
        hint="订单类型分为两种：正常订单和秒杀订单"
        persistent-hint
        :value="localItem.orderType === 0 ? '正常订单' : '秒杀订单'"
        hide-details="auto"
      >
      </v-text-field>

      <v-text-field
        class="mt-4"
        label="支付类型"
        placeholder="支付类型"
        variant="solo-filled"
        flat
        persistent-placeholder
        hint="支付类型：未支付，微信，支付宝，其他方式"
        persistent-hint
        :value="payTypes[localItem.payType]"
        hide-details="auto"
      >
      </v-text-field>

      <v-text-field
        class="mt-4"
        label="支付时间"
        placeholder="支付时间"
        variant="solo-filled"
        flat
        persistent-placeholder
        :value="formatDateTime(localItem.paymentTime)"
        hide-details="auto"
      >
      </v-text-field>

      <v-text-field
        class="mt-4"
        label="下单时间"
        placeholder="下单时间"
        variant="solo-filled"
        flat
        persistent-placeholder
        :value="formatDateTime(localItem.createTime)"
        hide-details="auto"
      >
      </v-text-field>
      <v-text-field
        class="mt-4"
        label="订单来源"
        placeholder="订单来源"
        variant="solo-filled"
        flat
        persistent-placeholder
        :value="sourceTypes[localItem.sourceType]"
        hide-details="auto"
      >
      </v-text-field>

      <v-list slim>
        <v-list-item>
          <template v-slot:prepend>
            <v-list-item-action start>
              <v-checkbox-btn :value="localItem.confirmStatus" readonly>
              </v-checkbox-btn>
            </v-list-item-action>
          </template>
          <v-list-item-title class="text-caption font-weight-medium"
            >已确认收货</v-list-item-title
          >
          <v-list-item-subtitle class="text-caption"
            >已确认表示用户已确认收货</v-list-item-subtitle
          >
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-list-item-action start>
              <v-checkbox-btn :value="localItem.deleteStatus" readonly>
              </v-checkbox-btn>
            </v-list-item-action>
          </template>
          <v-list-item-title class="text-caption font-weight-medium"
            >已删除</v-list-item-title
          >
          <v-list-item-subtitle class="text-caption"
            >用户删除订单会讲此值更新为已删除</v-list-item-subtitle
          >
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { formatDateTime } from "@/composables/time";
import { copyToClipboardFormatted } from "@/composables/copy";
import { Order } from "@/sdk/order/types";

const props = defineProps({
  item: {
    type: Object as () => Order,
  },
});
const translation = {
  bfAppId: "应用ID",
  memberUsername: "会员用户名",
  id: "ID",
  autoConfirmDay: "自动确认天数",
  confirmStatus: "确认状态",
  deleteStatus: "删除状态",
  orderSn: "订单编号",
  orderType: "订单类型",
  payType: "支付类型",
  sourceType: "来源类型",
  commentTime: "评论时间",
  modifyTime: "修改时间",
  createTime: "创建时间",
  paymentTime: "支付时间",
};

const localItem = reactive<Order>({} as Order);

const payTypes: Record<number, string> = {
  0: "未支付",
  1: "微信支付",
  2: "支付宝",
  3: "其他方式",
};

const sourceTypes: Record<number, string> = {
  0: "微信小程序",
  1: "支付宝小程序",
  2: "Tiktok",
  3: "App",
  4: "Web",
};

const orderStatus: Record<number, string> = {
  0: "待付款",
  1: "待发货",
  2: "已发货",
  3: "已完成",
  4: "已关闭",
  5: "无效订单",
};

watch(
  () => props.item,
  (newItem) => {
    if (newItem) {
      Object.assign(localItem, newItem);
    }
  },
  { immediate: true }
);

const copySn = (orderSn: string) => {
  copyToClipboardFormatted(orderSn);
};
</script>
