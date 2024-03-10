import { defineStore } from "pinia";

// MiniConfig 小程序配置
export type MiniConfig = {
  name: string;
  appId: string;
  appSecret: string;
};

type RootState = {
  miniprograms: MiniConfig[];
};

export const useApplicationStore = defineStore({
  id: "application",
  state: () =>
    ({
      miniprograms: [],
    } as RootState),
  actions: {
    addMiniApp(obj: MiniConfig) {
      console.log("obj:", obj);
      this.miniprograms.push(obj);
      console.log("miniprograms:", this.miniprograms);
    },
    viewMiniApp(idx: number) {
      if (idx > this.miniprograms.length) return;
      return this.miniprograms[idx];
    },
  },
});
