import { useAppStore, Notification } from "@/store/app";
const appStore = useAppStore();
// useSnackbar 发送消息
export const useSnackbar = (
  message: string,
  options: Partial<Notification> = {}
) => {
  appStore.snackbar(message, options);
};
