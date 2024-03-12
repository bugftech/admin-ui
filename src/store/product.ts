import { APIResponse } from "@/services/types";
import { API } from "@/services";
import { Product } from "@/interfaces/product";

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
  })
})