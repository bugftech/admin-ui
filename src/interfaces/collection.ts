import { Product } from "./product";

export interface Collection {
  id?: number;
  name: string;
  pic: string;
  description: string;
  sort: number;
  published: boolean;
  handle?: string;
  createdAt?: Date;
  products: Product[];
}