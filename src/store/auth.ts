import http from "@/plugins/axios";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { useAppStore } from "./app";
import { APIResponse } from "@/services/types";

const app = useAppStore();

type State = {
  logined: boolean;
  loading: boolean;
};

export const useAuthStore = defineStore({
  id: "auth",
  state: (): State =>
    ({
      loading: false,
      logined: false,
    } as State),

  actions: {
    async login(
      username: string,
      password: string
    ): Promise<APIResponse<null>> {
      try {
        this.loading = true;
        const { status } = await http.post("/signin", {
          username: username,
          password: password,
        });
        if (status === 200) {
          app.snackbar("登录成功", {
            color: "indigo",
            timeout: 2000,
            location: "top center",
          });
          return {
            success: true,
            data: null,
            status: status,
          };
        } else {
          app.snackbar("无效的账号或者密码", {
            timeout: 2000,
          });
          return {
            success: false,
            data: null,
            status: status,
          };
        }
      } catch (error) {
        const _error = error as AxiosError<string>;
        app.snackbar("服务器错误", {
          timeout: 2000,
        });
        return {
          success: false,
          status: _error.response?.status,
          data: null,
        };
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
  },
});
