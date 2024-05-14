// UserDTO
export interface User {
  id: number; // id 是主键
  uid: string;
  email: string;
  emailVerified: boolean;
  name: string;
  nickName: string;
  avatar: string;
  login: string;
  phone: string;
  tenantId: number;
  admin: boolean; // 是否超级管理员
  disabled: boolean;
  tenant: boolean; // 是否为租户和TenantId
  bfAppId: number; // 用户为租户的用户时。此id不为空
  bfAppName: string; // 用户为租户的用户时。此id不为空
  ServiceAccount: boolean; // 是否为服务账号
  createdAt: Date;
  lastSeenAt: number; // 上次查看时间，可能为空
}

export enum SourceFlag {
  WeChatMiniProgram = "WeChatMiniProgram",
  PublicAccount = "PublicAccount",
  Weibo = "Weibo",
  GitHub = "GitHub",
  // 其他用户来源可以在此处继续添加
}
