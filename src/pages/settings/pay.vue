<template>
  <v-card>
    <v-card-text class="py-2">
      <v-row>
        <v-col cols="12" md="6">
          <div class="text-subtitle-1 font-weight-bold">为您的项目添加应用</div>
          <div class="text-caption v-label mt-2">
            要开始使用，请先从右侧选择一个第三方支付。
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="d-flex justify-center ga-4">
            <v-spacer />
            <SettingPayAddDialog method="wechat" />
            <v-divider class="my-4" vertical />
            <v-btn icon="fa:fab fa-alipay" variant="outlined" disabled />
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider />
    <v-card-text class="pa-0">
      <v-row no-gutters>
        <v-col cols="12" md="4">
          <v-list v-if="wechatpays.length">
            <v-list-subheader class="text-caption font-weight-regular"
              >微信支付</v-list-subheader
            >
            <v-list-item
              v-for="(wx, i) in wechatpays"
              :key="i"
              color="indigo"
              prepend-icon="mdi-wechat"
              :active="i === currentPayIndex && currentPayType === 'wechat'"
              @click="onView('wechat', i)"
            >
              <v-list-item-title class="text-subtitle-2">{{
                wx.mchId
              }}</v-list-item-title>
              <v-list-item-subtitle class="text-caption">
                {{ wx.appId }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>
        <v-divider vertical />
        <v-col cols="12" md="8" class="px-4">
          <SettingPayWechatConfig
            :pay="currentPayForm"
            v-if="wechatpays.length"
          />
          <v-card-text v-else> </v-card-text>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { PayType } from "@/interfaces/pay";

import BFSDK from "@/api/sdk";

const currentPayIndex = ref(0);
const currentPayType = ref(PayType.Wechat);
const wechatpays = ref([]);
const alipays = ref([]);

const currentPayForm = computed(() => {
  const pays =
    currentPayType.value === "wechat" ? wechatpays.value : alipays.value;
  return pays[currentPayIndex.value];
});

onMounted(async () => {
  const { data, success } = await BFSDK.getAppPays(5);
  if (success) {
    wechatpays.value = data;
  }
});
</script>

<route lang="yaml">
meta:
  breadcrumb: 支付方式
</route>
