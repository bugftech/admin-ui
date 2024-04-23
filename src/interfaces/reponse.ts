export type APIResponse<T> = {
  success: boolean;
  data: T;
  status?: number;
  message?: string;
};

// IdResponse 创建对象返回的id，id自增。uid为唯一标识符号
export type IdResponse = {
  id: number;
  uid: string;
};
