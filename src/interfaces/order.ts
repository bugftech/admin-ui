// Order 订单信息
export interface Order  {
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
}

// OrderItem 订单内商品条目
export interface OrderItem {
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
}

// OrderInfo 订单的全部信息
export interface OrderInfo {
  order: Order;
  orderItems: OrderItem[];
}


// UpdateOrderStatus 更新订单参数
export interface UpdateOrderStatus { 
  status: number;
  bfAppId: number;
}
