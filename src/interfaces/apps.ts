export enum AppType {
  Wechat = "wechat",
  Alipay = "alipay",
}

export enum EnvType {
  DevelopmentEnv = "dev",
  ProductionEnv = "prod",
}

export interface App {
  id?: number;
  name: string;
  uid?: string;
  tenantId?: number;
  appId: string;
  appSecret: string;
  wechatPayId: number;
  alipayPayId: number;
  appType: AppType;
  env: EnvType;
}

export interface WechatApp {
  id: number;
  name: string;
  uid?: string;
  appId: string;
  appSecret: string;
}

export interface AlipayApp {
  id: number;
  name: string;
  uid?: string;
  appId: string;
  appSecret: string;
}

export interface BindWechatPay {
  wechatPayId: number;
}

export interface AppWebhookConfig {
  id: number;
  bfAppId: number;
  tenantId?: number;
  name: string;
  url: string;
  contentType: string;
  template: string;
  createdAt?: Date;
  updatedAt?: Date;
}
