<template>
  <v-dialog max-width="600">
    <template v-slot:activator="{ props: activeProps }">
      <v-btn
        append-icon="mdi-plus"
        size="small"
        theme="dark"
        variant="flat"
        class="border"
        v-bind="activeProps"
      >
        添加支付
      </v-btn>
    </template>
    <v-card theme="dark">
      <v-card-item>
        <v-card-title class="text-subtitle-2"> 选择支付方式 </v-card-title>
        <v-card-subtitle class="text-caption">
          选择一个合适的支付方式配置,以开启对应的支付功能。
        </v-card-subtitle>
      </v-card-item>
      <v-container>
        <v-row>
          <v-col cols="4" v-for="(item, i) in payMethods" :key="i">
            <v-card
              :color="item.color"
              @click="toConfigure(item.to)"
              :disabled="item.disabled"
              variant="flat"
            >
              <v-card-item>
                <v-card-title class="text-subtitle-2">
                  {{ item.title }}
                </v-card-title>
                <v-card-subtitle class="text-caption">
                  {{ item.subtitle }}
                </v-card-subtitle>
                <v-card-actions class="mt-8">
                  <v-btn block variant="tonal" size="small" rounded="pill"
                    >去配置</v-btn
                  >
                </v-card-actions>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { color } from "echarts";

const payMethods: any[] = [
  {
    title: "微信支付",
    subtitle: "wechatpay method",
    to: "/pays/wechat/new",
    disabled: false,
    color: "green",
  },
  {
    title: "支付宝支付",
    subtitle: "alipay method",
    to: "/pays/wechat/new",
    disabled: true,
    color: "indigo",
  },
  {
    title: "其他的方式",
    subtitle: "others method",
    to: "/pays/wechat/new",
    disabled: true,
    color: "lime",
  },
];
const router = useRouter();
const toConfigure = (to: string) => {
  router.push({
    path: to,
  });
};
</script>
