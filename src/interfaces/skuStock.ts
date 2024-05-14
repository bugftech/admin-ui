export interface SkuStock {
  tenantId: number;
  productId: number;
  id: number;
  uid: string;
  skuCode: string;
  price: number;
  originalPrice: number;
  costPrice: number;
  stock: number;
  lowStock: number;
  lockStock: number;
  pic: string;
  SaleCount: number;
  skuAttributes: SkuAttribute[];
}

export interface SkuAttribute {
  key: String;
  value: string;
}
