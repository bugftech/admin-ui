import { OrderInfo, APIResponse } from "@/services/types";
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
  subMchId: string;
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

type Pays = {
  wechatPays: wechatPay[];
};

type RootState = {
  loading: boolean;
  editWechatPay: wechatPay;
  defaultWechatPay: wechatPay;
  wechatpays: wechatPay[];
};

export const usePayStore = defineStore({
  id: "pay",
  state: () =>
    ({
      loading: false,
      wechatpays: [],
      editWechatPay: {
        appId: "",
        mchId: "",
        subMchId: "",
        apiV2Key: "",
        apiV3Key: "",
        isProvider: false,
        notifyUrl: "",
      },
      defaultWechatPay: {
        appId: "",
        mchId: "",
        subMchId: "",
        apiV2Key: "",
        apiV3Key: "",
        isProvider: false,
        notifyUrl: "",
      },
    } as RootState),
  actions: {
    async fetch<T>(): Promise<APIResponse<T>> {
      try {
        this.loading = true;
        const { data, status } = await API.bugfreed.list<Pays>("pays");
        if (status === 200) {
          console.log(data)
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
  },
});
