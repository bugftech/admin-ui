import { defineStore } from "pinia";
import { OrderInfo, APIResponse } from "@/services/types";
import { API } from "@/services";
import { AxiosError } from "axios";

import data from "@/data/order_header.json";

type State = {
  headers?: any[];
  items: OrderInfo[];
  page: number;
  limit: number;
  loading: boolean;
  currentIndex: number;
};

export const useOrderStore = defineStore({
  id: "order",
  state: (): State =>
    ({
      headers: Array.from(data),
      items: [],
      page: 1,
      limit: 20,
      loading: false,
      currentIndex: 0,
    } as State),
  getters: {
    currentOrder: (state) => {
      if (
        state.items.length === 0 ||
        state.currentIndex > state.items.length - 1
      )
        return;
      return state.items[state.currentIndex];
    },
  },
  actions: {
    setItems(data: OrderInfo[]) {
      this.items = data;
    },
    // 记录当前位置
    setCurrentIndex(idx: number) {
      this.currentIndex = idx;
    },
    next() {
      this.currentIndex++;
      console.log("next:", this.currentIndex);
    },
    prev() {
      this.currentIndex--;
      console.log("prev:", this.currentIndex);
    },
    async fetch<T>(): Promise<APIResponse<T>> {
      try {
        this.loading = true;
        const { data, status } = await API.bugfreed.list<OrderInfo>("orders");
        if (status === 200) {
          this.setItems(data.data);
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
