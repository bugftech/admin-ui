import { SkuStock, SkuAttribute } from "./skuStock";

// Product product model
export interface Product {
  tenantId: number;
  brandId: number;
  brandName: string;
  categoryId: number;
  categoryName: string;
  id: number;
  name: string;
  banner: string;
  productSn: string;
  published: boolean;
  newArrvial: boolean;
  productType: string;
  recommand: boolean;
  sort: number;
  sale: number;
  price: number;
  originalPrice: number;
  costPrice: number;
  subtitle: string;
  description: string;
  stock: number;
  lowStock: number;
  unit: string;
  weight: string;
  preview: boolean;
  serviceIds: string;
  keywords: string[];
  note: string;
  albumPics: string[];
  detailTitle: string;
  detailDesc: string;
  detailHtml: string;
}

export interface ProductAndSku extends Product {
  skus: SkuStock[];
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
