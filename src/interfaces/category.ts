export interface Category {
  id: number;
  parentId: number;
  name: string;
  level: number;
  count: number;
  unit: string;
  sort: number;
  icon: string;
  image: string;
  keywords: string;
  description: string;
}