export interface SkuStock {
  productId: number;
  id: number;
  skuCode: string;
  price: number;
  stock: number;
  lowStock: number;
  pic: string;
  salesVolumn: number;
  promotionPrice: number;
  lockStock: number;
  skuAttributes: SkuAttribute[];
}

export interface SkuAttribute {
  key: String;
  value: string;
}
