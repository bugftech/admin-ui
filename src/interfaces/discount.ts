// 折扣类型
export type DiscountType =
  | "moneyOffProduct"
  | "buyXgetY"
  | "moneyOffOrder"
  | "shipping";

// 折扣方式
export type DiscountWay = "automatic" | "coupon";

// 折扣策略
export type DiscountStrategy = "fixed_amount" | "percentage_amount";

// 最低购买要求策略
export type MinPurchaseStrategy =
  | "none"
  | "min_purchase_amt"
  | "min_purchase_count";

// 客户资格策略
export type CustomerStrategy = "all" | "segment" | "specified";

// 折扣信息接口
export interface Discount {
  id: number;
  uid: string;
  tenantId?: string;
  name: string;
  type: DiscountType;
  way: DiscountWay;
  code: string;
  description: string;
  strategy: DiscountStrategy;
  strategyValue: number;
  minPurchaseStrategy: MinPurchaseStrategy;
  minPurchaseValue: number;
  maxUsageCount: number;
  oncePerCustomer: boolean;
  oncePerOrder: boolean;
  customerStrategy: CustomerStrategy;
  status: string;
  startDate: Date; // 注意：时间类型可能需要调整
  endDate?: Date; // 注意：时间类型可能需要调整
  items: DiscountItem[]; // 折扣关联商品
  customers: number[]; // 满足购买条件的客户
}

// 折扣关联商品接口
export interface DiscountItem {
  id: number;
  discountId: number;
  itemId: number;
  itemType: string; // "product" or "sku"
  createdAt: string; // 注意：时间类型可能需要调整
  updatedAt: string; // 注意：时间类型可能需要调整
}

// isDiscountType 判断是否为discounttype
export function isDiscountType(value: any): value is DiscountType {
  return (
    value === "moneyOffProduct" ||
    value === "buyXgetY" ||
    value === "moneyOffOrder" ||
    value === "shipping"
  );
}
