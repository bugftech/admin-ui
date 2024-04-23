export interface WechatPay {
  id?: number;
  // 微信支付 AppID
  appId: string;
  bfAppId: number;
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
}

// AppType 应用类型枚举
export enum PayType {
  Wechat = "wechat",
  Alipay = "alipay",
}
