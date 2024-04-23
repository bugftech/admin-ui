import { APIResponse } from "@/services/types";
import { API } from "@/services";
import { AxiosError } from "axios";
import BFSDK from "@/api/sdk";

// wechatPay 微信支付的配置
export type wechatPay = {
  id?: number;
  // 微信支付 AppID
  appId: string;
  // 微信支付商户号
  mchId: string;
  // 微信支付子商户号
  subMchId?: string;
  // 微信支付 API 证书
  apiCert?: string;
  // 微信支付 API v2 密钥
  apiV2Key: string;
  // 微信支付 API v3 密钥
  apiV3Key?: string;
  // 是否为服务商模式
  isProvider: boolean;
  // 微信支付回调通知 URL
  notifyUrl: string;
};

// AppType 应用类型枚举
export enum PayType {
  Wechat = "wechat",
  Alipay = "alipay",
}

type alipay = {};

type RootState = {
  wechatpays: wechatPay[];
  currentPayIndex: number;
  currentPayType: PayType;
};

export const usePayStore = defineStore({
  id: "pay",
  state: () =>
    ({
      wechatpays: [
        {
          appId: "112231231231",
          mchId: "asdfasdfas",
          apiV2Key: "xxx",
          isProvider: false,
          notifyUrl: "https://localhost:8080/notify",
        },
      ],
      currentPayIndex: 0,
      currentPayType: PayType.Wechat,
    } as RootState),
  actions: {
    async fetch(appId: number) {
      const { success, data } = await BFSDK.getAppPays(appId);
      if (!success) return;
      this.wechatpays = data;
    },
    addWxPay(pay: wechatPay) {
      this.wechatpays.push(pay);
    },

  },
});
