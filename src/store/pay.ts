import { APIResponse } from "@/services/types";
import { API } from "@/services";
import { AxiosError } from "axios";

// wechatPayConfig 微信支付的配置
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
  loading: boolean;
  wechatpays: wechatPay[];
  alipays: alipay[];
  currentPayIndex: number;
  currentPayType: PayType;
};

export const usePayStore = defineStore({
  id: "pay",
  state: () =>
    ({
      loading: false,
      wechatpays: [
        {
          appId: "112231231231",
          mchId: "asdfasdfas",
          apiV2Key: "xxx",
          isProvider: false,
          notifyUrl: "https://localhost:8080/notify",
        },
      ],
      alipays: [],
      currentPayIndex: 0,
      currentPayType: PayType.Wechat,
    } as RootState),
  actions: {
    async fetch<T>(): Promise<APIResponse<T>> {
      try {
        this.loading = true;
        const { data, status } = await API.bugfreed.list<wechatPay[]>("pays");
        if (status === 200) {
          console.log(data);
          this.loading = true;
          return {
            success: true,
            data: null as unknown as T,
          };
        }
      } catch (error) {
        const _error = error as AxiosError<string>;
        return {
          success: false,
          status: _error.response?.status,
          data: null as unknown as T,
        };
      } finally {
        this.loading = false;
      }
      // Add a return statement at the end of the function
      return {
        success: false,
        data: null as unknown as T,
      };
    },
    addWxPay(pay: wechatPay) {
      this.wechatpays.push(pay);
    },
    updateWxPay(pay: wechatPay) {
      const idx = this.wechatpays.findIndex((item) => item.appId === pay.appId);
      if (idx > -1) {
        this.wechatpays[idx] = pay;
      }
    },
  },
});
