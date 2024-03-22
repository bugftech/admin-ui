import { Product } from "@/interfaces/product";
import BFSDK from "@/api/sdk";
import data from "@/data/product_header.json";

type State = {
  headers?: any[];
  items: Product[];
  page: number;
  limit: number;
  loading: boolean;
};

export const useProductStore = defineStore({
  id: "product",
  state: (): State => ({
    headers: Array.from(data),
    items: [],
    page: 1,
    limit: 20,
    loading: false,
  }),
  actions: {
    async fetch() {
      this.loading = true;
      const { success, data } = await BFSDK.getProducts();
      if (!success) return;
      this.items = data;
      this.loading = false;
    },
  },
});
