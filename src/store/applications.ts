import { defineStore } from "pinia";

// MiniConfig 小程序配置
export type MiniConfig = {
  name: string;
  appId: string;
  appSecret: string;
  uuid?: string;
};

// RootState 根状态类型
export type RootState = {
  miniprograms: MiniConfig[];
  alipays: MiniConfig[]; // 注意这里类型的统一
  currentAppIndex: number;
  currentAppType: AppType; // 使用枚举代替字符串
};

// AppType 应用类型枚举
export enum AppType {
  Wechat = "wechat",
  Alipay = "alipay",
}

export const useApplicationStore = defineStore({
  id: "application",
  state: (): RootState => ({
    miniprograms: [
      {
        uuid: "wxuuid001",
        name: "Bugfreed01",
        appId: "123456789",
        appSecret: "987654321",
      },
      {
        uuid: "wxuuid002",
        name: "Bugfreed02",
        appId: "123456789",
        appSecret: "987654321",
      },
      {
        uuid: "wxuuid003",
        name: "Bugfreed03",
        appId: "123456789",
        appSecret: "987654321",
      },
    ],
    alipays: [
      {
        uuid: "aliuuid001",
        name: "Bugfreed01",
        appId: "123456789",
        appSecret: "987654321",
      },
      {
        uuid: "aliuuid002",
        name: "Bugfreed02",
        appId: "123456789",
        appSecret: "987654321",
      },
      {
        uuid: "aliuuid003",
        name: "Bugfreed03",
        appId: "123456789",
        appSecret: "987654321",
      },
    ],
    currentAppIndex: 0,
    currentAppType: AppType.Wechat,
  }),
  actions: {
    addApp(app: MiniConfig, appType: AppType) {
      if (appType === AppType.Wechat) {
        this.miniprograms.push(app);
      } else if (appType === AppType.Alipay) {
        this.alipays.push(app);
      }
    },
    viewApp(appType: AppType, idx: number) {
      this.currentAppType = appType;
      this.currentAppIndex = idx;
    },
    deleteApp(appType: AppType, uuid: string) {
      const apps =
        appType === AppType.Wechat ? this.miniprograms : this.alipays;
      const idx = apps.findIndex((item) => item.uuid === uuid);
      if (idx > -1) {
        apps.splice(idx, 1);
        if (idx > 0) {
          this.currentAppIndex = idx - 1;
        }
      }

      if (this.miniprograms.length === 0) {
        this.currentAppType = AppType.Alipay;
      }
    },
    updateApp(config: MiniConfig) {
      const apps =
        this.currentAppType === AppType.Wechat
          ? this.miniprograms
          : this.alipays;
      const idx = apps.findIndex((item) => item.uuid === config.uuid);
      if (idx > -1) {
        apps[idx] = config;
      }

      console.log("update apps:", apps);
    },
  },
});
