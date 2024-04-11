export enum AppType {
  Wechat = "wechat",
  Alipay = "alipay",
}


export interface App {
  id?: number;
  name: string;
  uuid?: string;
  appId: string;
  appSecret: string;
  appType: number;
  createdAt: Date;
}


export interface WechatApp {
  id?: number;
  name: string;
  uuid?: string;
  appId: string;
  appSecret: string;
}



export interface AlipayApp {
  id?: number;
  name: string;
  uuid?: string;
  appId: string;
  appSecret: string;
}
