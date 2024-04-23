import { SkuStock, SkuAttribute } from "./skuStock";

// Product product model
export interface Product {
  tenantId: number;
  brandId: number;
  brandName: string;
  productCategoryId: number;
  productCategoryName: string;
  productAttributeCategoryId: number;
  productAttributeCategoryValues: any[];
  id: number;
  feightTemplateId?: number;
  name: string;
  banner: string;
  productSn: string;
  isDeleted: boolean;
  isPublished: boolean;
  isNew: boolean;
  isRecommand: boolean;
  isVerified: boolean;
  sort: number;
  sale: number;
  price: number;
  promotionPrice: number;
  originalPrice: number;
  costPrice: number;
  giftGrowth: number;
  giftPoint: number;
  usePointLimit: number;
  subTitle: string;
  description: string;
  stock: number;
  lowStock: number;
  unit: string;
  weight: string;
  isPreview: boolean;
  serviceIds: string;
  keywords: string;
  note: string;
  albumPics: any;
  detailTitle: string;
  detailDesc: string;
  detailHtml: string;
  promotionStartTime?: Date;
  promotionEndTime?: Date;
  promotionPerLimit: number;
  promotionType: number;
}

export interface ProductAndSku extends Product {
  skuStockList: SkuStock[];
}

export interface ProductOrSkuDTO {
  id: number;
  productId: number;
  productName: string;
  productPic: string;
  productPrice: number;
  productStock: number;
  productLowStock: number;
  skuId: number;
  skuPic: string;
  skuCode: string;
  skuStock: number;
  skuLowStock: number;
  variant: boolean;
  skuAttributes: SkuAttribute[];
}
