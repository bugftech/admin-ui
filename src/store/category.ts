import { APIResponse } from "@/services/types";
import { API } from "@/services";
import { AxiosError } from "axios";
import { Category } from "@/interfaces/category";


interface AllCategory extends Category {
  items?: Category[];
}


type State = {
  loading: boolean;
  items: AllCategory[];
};

export const useCategoryStore = defineStore({
  id: "category",
  state: (): State => ({
    loading: false,
    items: [],
  }),
  actions: {
    setItems(data: AllCategory[]) {
      this.items = data;
    },

    async fetch<T>(): Promise<APIResponse<T>> {
      try {
        this.loading = true;
        const { data, status } = await API.bugfreed.list<AllCategory>(
          "pms/categories"
        );
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
