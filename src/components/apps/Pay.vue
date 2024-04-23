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
            <AppsPayWeixinAddDialog
              :id="id"
              :appId="appId"
              @refresh="onRefresh"
            />
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider />
    <v-card-text class="pa-0">
      <v-row no-gutters>
        <v-col cols="12" md="3" style="background: rgba(0, 0, 0, .1);">
          <v-list v-if="wechatpays.length" bg-color="transparent">
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
        <v-col cols="12" md="9" class="px-4">
          <AppsPayWechatConfig :pay="currentPayForm" v-if="wechatpays.length" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { WechatPay } from "@/interfaces/pay";
import { PayType } from "@/interfaces/pay";

const props = defineProps({
  id: Number, // bfAppId
  appId: String, // 小程序appid
});

const localId = ref();
const localAppId = ref();

watchEffect(() => {
  localId.value = props.id;
  localAppId.value = props.appId;
});

const currentPayIndex = ref(0);
const currentPayType = ref(PayType.Wechat);
const wechatpays = ref<WechatPay[]>([]);

const currentPayForm = computed(() => {
  return wechatpays.value[currentPayIndex.value];
});

const onView = (type: string, id: number) => {};

const fetchApps = async () => {
  const { success, data } = await BFSDK.getAppPays(localId.value);
  if (success) wechatpays.value = data;
};

const onRefresh = async () => {
  await fetchApps()
};

onMounted(async () => {
  if (!localId.value || localId.value === 0) return;
  await fetchApps()
});
</script>

<route lang="yaml">
meta:
  breadcrumb: 支付方式
</route>
