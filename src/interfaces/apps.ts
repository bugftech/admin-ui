export enum AppType {
  Wechat = "wechat",
  Alipay = "alipay",
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
