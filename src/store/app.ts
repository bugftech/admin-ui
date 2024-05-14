// Data
import data from "@/data/nav.json";
import noticeFile from "@/assets/notice.mp3";
// Composables
import { defineStore } from "pinia";

// Types

// Notification 消息通知
export type Notification = {
  title?: string;
  message: string;
  timeout?: number;
  color?: string;
  // icon
  icon?: string;
  // 事件类型：order
  event?: string;
  location?: string;
};

// NavItem 导航栏数据
type NavItem = {
  divider?: boolean;
  title?: string;
  key?: string;
  subheader?: string;
  inactiveIcon?: string;
  activeIcon?: string;
  items?: NavItem[];
};

// RootState app根状态数据
export type RootState = {
  drawer: null;
  settings: boolean;
  notifications: Notification[];
  navItems: NavItem[];
};

export const useAppStore = defineStore({
  id: "app",
  state: () =>
    ({
      drawer: null,
      settings: false,
      navItems: Array.from(data),
      notifications: [],
      pages: getPages(data as NavItem[]),
    } as RootState),
  actions: {
    snackbar(message: string, options: Partial<Notification> = {}) {
      // 时间类型
      if (options.event) {
        const audio = new Audio(noticeFile);
        audio.play();
      }
      this.notifications.push({ message, ...options });
    },
  },
});

function getPage(item: NavItem, parent = ""): string[] {
  const key = `${parent}${parent ? "/" : ""}${item?.key ?? item}`;

  return item?.items?.length ? getPages(item.items, key) : [key];
}

function getPages(items: NavItem[] = [], parent = ""): string[] {
  let array: any = [];
  for (const item of items) {
    if (item?.divider || item?.subheader) continue;

    array = [...array, ...getPage(item, parent)];
  }
  return array;
}
