export interface Category {
  id: number;
  parentId: number;
  name: string;
  level: number;
  count: number;
  sort: number;
  pic: string;
  keywords: string[];
  description: string;
  published: boolean;
}

export interface AllCategory extends Category {
  items?: Category[];
}
