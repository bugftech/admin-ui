<template>
  <v-card class="elevation-1">
    <v-toolbar color="transparent" density="compact">
      <v-toolbar-title class="text-caption font-weight-bold"
        >基础信息</v-toolbar-title
      >
    </v-toolbar>
    <v-divider />
    <v-card-text>
      <v-row dense>
        <v-col
          cols="12"
          v-for="(obj, i) in filtered"
          :key="i"
        >
          <!-- 
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
          -->

          <template v-if="useBool(obj.title)">
            <v-checkbox-btn :value="obj.value" hide-details density="compact">
              <template v-slot:label>
                <div class="text-caption font-weight-bold">{{ obj.name }}</div>
              </template>
            </v-checkbox-btn>
          </template>
          <template v-else-if="useTime(obj.title)">
            <v-text-field
              readonly
              :label="obj.name"
              :value="obj.value ? formatDateTime(obj.value) : ''"
              :placeholder="obj.name"
              persistent-placeholder
              variant="solo-filled"
              flat
              hide-details
            ></v-text-field>
          </template>
          <v-text-field
              readonly
              :label="obj.name"
              :value="obj.value"
              :placeholder="obj.name"
              persistent-placeholder
              variant="solo-filled"
              flat
              hide-details
              v-else
            ></v-text-field>
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

const filtered = computed(() => {
  if (!props.item) return [];
  return Object.keys(props.item).reduce((acc, key) => {
    const value = props.item[key];
    const translatedKey = translation[key] || key;
    if (translatedKey !== key) {
      acc.push({ title: key, name: translatedKey, value });
    }
    return acc;
  }, []);
});

const useBool = (key) => {
  const boolItems = ["confirmStatus", "deleteStatus"];
  return boolItems.find((item) => item === key);
};

const useTime = (key) => {
  const timeItems = ["commentTime", "modifyTime", "createTime", "paymentTime"];
  return timeItems.find((item) => item === key);
};

watch(props.item, () => {
  propsToFilter();
});
</script>
