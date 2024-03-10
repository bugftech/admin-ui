/**
 * API Response
 */
export type APIResponse<T> = {
  success: boolean;
  data: T;
  status?: number;
};

/**
 * Pagination
 */
export type Pagination = {
  page: number;
  limit: number;
};

/**
 * DataTableHeader
 */

export type DataTableHeader = {
  title: string;
  key: string;
};

/**
 * Order
 */

// Order 订单信息
export type Order = {
  tenantId: number;
  bfAppId: number;
  memberId: number;
  memberUsername: string;
  id: number;
  autoConfirmDay: number;
  billContent: string;
  billHeader: string;
  billReceiverEmail: string;
  billReceiverPhone: string;
  billType: number;
  confirmStatus: number;
  couponId: number;
  deleteStatus: boolean;
  deliveryCompany: string;
  deliverySn: string;
  deliveryTime: Date | null;
  growth: number;
  integration: number;
  discountAmount: number;
  freightAmount: number;
  couponAmount: number;
  integrationAmount: number;
  promotionAmount: number;
  totalAmount: number;
  payAmount: number;
  note: string;
  orderSn: string;
  orderType: number;
  payType: number;
  promotionInfo: string;
  receiverCity: string;
  receiverDetailAddress: string;
  receiverName: string;
  receiverPhone: string;
  receiverPostCode: string;
  receiverProvince: string;
  receiverRegion: string;
  receiveTime: Date | null;
  sourceType: number;
  status: number;
  useIntegration: number;
  commentTime: Date | null;
  modifyTime: string;
  createTime: string;
  paymentTime: Date | null;
};

// OrderItem 订单内商品条目
export type OrderItem = {
  id: number;
  tenantId: number;
  bfAppId: number;
  orderItemId: number;
  orderId: number;
  orderSn: string;
  productAttr: string;
  productBrand: string;
  productCategoryId: number;
  productId: number;
  productName: string;
  productSubTitle: string;
  productPic: string;
  productPrice: number;
  productQuantity: number;
  productSn: string;
  productSkuCode: string;
  productSkuId: number;
  promotionAmount: number;
  promotionName: string;
  couponAmount: number;
  giftGrowth: number;
  giftIntegration: number;
  integrationAmount: number;
  realAmount: number;
};

// OrderInfo 订单的全部信息
export type OrderInfo = {
  order: Order;
  orderItems: OrderItem[];
};

// wechatPayConfig 微信支付的配置
export type wechatPayConfig = {
  id?: number;
  // 微信支付 AppID
  appId: string;
  // 微信支付商户号
  mchId: string;
  // 微信支付子商户号
  subMchId: string;
  // 微信支付 API 证书
  apiCert: string;
  // 微信支付 API v2 密钥
  apiV2Key: string;
  // 微信支付 API v3 密钥
  apiV3Key: string;
  // 是否为服务商模式
  isProvider: boolean;
  // 微信支付回调通知 URL
  notifyUrl: string;
};
