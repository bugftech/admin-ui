<template>
  <v-card>
    <v-toolbar color="transparent">
      <v-spacer />
      <v-dialog width="600">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            size="small"
            prepend-icon="mdi-plus"
            variant="flat"
            color="grey-darken-4"
          >
            添加新的支付
          </v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar color="transparent" density="default">
              <v-toolbar-title class="text-body-2 font-weight-medium">
                添加支付能力到您的应用
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                icon="mdi-close"
                variant="text"
                @click="isActive.value = false"
              ></v-btn>
            </v-toolbar>
            <v-card-subtitle class="text-caption text-wrap v-label">
              若需要使用支付能力，请选择一个对应的平台支付。
            </v-card-subtitle>
            <v-card-text class="pa-12">
              <div class="d-flex justify-center ga-4">
                <template v-for="(platform, i) in platforms" :key="i">
                  <v-divider v-if="i != 0" vertical class="my-4" />
                  <v-btn
                    :icon="platform.icon"
                    variant="outlined"
                    rounded="circle"
                    size="large"
                    :color="platform.color"
                    :disabled="platform.disabled"
                  ></v-btn>
                </template>
              </div>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-toolbar>
    <v-divider />
    <v-card-text class="pa-0">
      <v-row no-gutters>
        <v-col cols="12" md="3">
          <v-sheet>
            <v-list bg-color="transparent" density="compact" :lines="false">
              <v-list-subheader class="text-caption">
                <v-icon start color="green">mdi-wechat</v-icon> 微信
              </v-list-subheader>
              <v-list-item
                v-for="(wx, i) in wechatPays"
                :key="i"
                @click="viewWxPay(wx.id)"
              >
                <v-list-item-title class="text-caption font-weight-bold">
                  微信支付 {{ i + 1 }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider />
            <v-list bg-color="transparent" density="compact" :lines="false">
              <v-list-subheader class="text-caption">
                <v-icon start color="blue" icon="fa:fab fa-alipay"></v-icon>
                支付宝
              </v-list-subheader>
            </v-list>
            <v-divider />
          </v-sheet>
        </v-col>
        <v-divider vertical />
        <v-col cols="12" md="9">
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { usePayStore } from "@/store/pay";
const viewWxPay = () => {};
const platforms = [
  {
    id: 1,
    title: "微信支付",
    icon: "mdi-wechat",
    color: "green",
  },
  {
    id: 1,
    title: "支付宝",
    icon: "fa:fab fa-alipay",
    disabled: true,
    color: "blue",
  },
];

const pay = usePayStore();
const { wechatPays } = storeToRefs(pay);
</script>

<route lang="yaml">
meta:
  breadcrumb: 支付方式
</route>
