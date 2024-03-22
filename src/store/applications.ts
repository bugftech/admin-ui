import { defineStore } from "pinia";
import BFSDK from "@/api/sdk";
import { WechatApp, AlipayApp, AppType } from "@/interfaces/apps";
import { constructFrom } from "date-fns";

// MiniConfig 小程序配置
export type MiniConfig = {
  name: string;
  appId: string;
  appSecret: string;
  uuid?: string;
};

// RootState 根状态类型
export type RootState = {
  miniprograms: WechatApp[];
  alipays: MiniConfig[]; // 注意这里类型的统一
  currentAppIndex: number;
  currentAppType: AppType; // 使用枚举代替字符串
};

export const useApplicationStore = defineStore({
  id: "application",
  state: (): RootState => ({
    miniprograms: [],
    alipays: [],
    currentAppIndex: 0,
    currentAppType: AppType.Wechat,
  }),
  actions: {
    viewApp(appType: AppType, idx: number) {
      this.currentAppType = appType;
      this.currentAppIndex = idx;
    },

    async fetch() {
      const { data, success } = await BFSDK.getApps();
      if (!success) return;
      this.miniprograms = data;
    },

    async addApp(appType: AppType, config: WechatApp | AlipayApp) {
      if (appType === AppType.Wechat) {
        const { success } = await BFSDK.addWxApp(config);
        if (success) {
          this.fetch();
        }
      }
    },

    async deleteApp(id: number) {
      const { success } = await BFSDK.deleteApp(id);
      if (!success) return;
      this.fetch();
    },

    async updateApp(id: number, config: MiniConfig) {
      const { success } = await BFSDK.updateApp(id, config);
      if (!success) return;
      this.fetch();
    },
  },
});
