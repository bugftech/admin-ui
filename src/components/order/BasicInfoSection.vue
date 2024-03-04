<template>
  <v-card class="elevation-1">
    <v-toolbar color="transparent" density="compact">
      <v-toolbar-title class="text-caption">基础信息</v-toolbar-title>
    </v-toolbar>
    <v-divider />
    <v-card-text>
      <v-row dense>
        <v-col
          cols="12"
          class="d-flex justify-space-between"
          v-for="(obj, i) in filtered"
          :key="i"
        >
          <v-label class="text-caption font-weight-mediumn">{{
            obj.name
          }}</v-label>
          <div class="text-caption font-weight-bold" v-if="useBool(obj.title)">
            <v-icon :color="obj.value ? 'green' : 'red'">{{
              obj.value
                ? "mdi-checkbox-marked-circle-outline"
                : "mdi-checkbox-blank-circle-outline"
            }}</v-icon>
          </div>
          <div
            class="text-caption font-weight-bold"
            v-else-if="useTime(obj.title)"
          >
            {{ obj.value ? formatDateTime(obj.value) : "" }}
          </div>
          <div class="text-caption font-weight-bold" v-else>
            {{ obj.value }}
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { formatDateTime } from "@/composables/time";

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

const props = defineProps({
  item: {
    type: Object,
  },
});

const filtered = ref([]);

if (props.item) {
  // 遍历对象的所有键
  Object.keys(props.item).forEach((key) => {
    // 获取键对应的值
    const value = props.item[key];
    // 获取对应的翻译名称，如果找不到则使用原始键
    const translatedKey = translation[key] || key;
    // 如果找不到对应的翻译，则跳过
    if (translatedKey === key) {
      return;
    }
    // 构建新的对象并放入新数组中
    filtered.value.push({ title: key, name: translatedKey, value: value });
  });
}

const useBool = (key) => {
  const boolItems = ["confirmStatus", "deleteStatus"];
  return boolItems.find((item) => item === key);
};

const useTime = (key) => {
  const timeItems = ["commentTime", "modifyTime", "createTime", "paymentTime"];
  return timeItems.find((item) => item === key);
};
</script>
