export interface Brand {
  id: number; // id 是主键
  uid: string;
  name: string; // 品牌名称
  firstLetter: string; // 品牌首字母
  sort: number; // 品牌显示排序
  factoryMade: boolean; // 是否为工厂制造
  visiable: boolean; // 是否显示
  productCount: number; // 关联该品牌的商品数量
  productCommentCount: number; // 产品评论数量
  logo: string; // 品牌LOGO
  banner: string; // 专区大图
  brandStory: string; // 品牌故事
}
