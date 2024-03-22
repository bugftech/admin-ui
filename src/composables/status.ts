import { ref, computed } from "vue";

interface StatusItem {
  value: number;
  title?: string;
  color?: string;
  icon?: string;
}

const statusItems: StatusItem[] = [
  {
    value: 0,
    title: "未支付",
    icon: "mdi-cash-remove", // Icon for "未支付"
    color: "red",
  },
  {
    value: 1,
    title: "待发货",
    icon: "mdi-package-variant-closed", // Icon for "待发货"
    color: "orange",
  },
  {
    value: 2,
    title: "已发货",
    icon: "mdi-truck-check", // Icon for "已发货"
    color: "blue",
  },
  {
    value: 3,
    title: "已完成",
    icon: "mdi-checkbox-marked-circle", // Icon for "已完成"
    color: "green",
  },
  {
    value: 4,
    title: "已关闭",
    icon: "mdi-close-circle", // Icon for "已关闭"
    color: "gray",
  },
  {
    value: 5,
    title: "无效的",
    icon: "mdi-cancel", // Icon for "无效的订单"
    color: "black",
  },
];

// useOrderStatus 获取订单状态
export function useOrderStatus(id: number): StatusItem | undefined {
  return statusItems.find((item) => item.value === id);
}
