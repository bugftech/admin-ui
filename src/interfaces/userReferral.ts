export interface UserReferral {
  id?: number; // 唯一标识符
  tenantId?: number; // 租户ID
  bfAppId?: number; // 商家前台App ID
  userId: number | null; // 推荐人用户ID
  referralCode?: string; // 推荐码
  qrcodeUrl?: string; // 二维码URL
  company: string; // 推荐人所属公司名称
  companyAddress: string; // 推荐人所属公司地址
  contactPerson: string; // 联系人姓名
  phoneNumber: string; // 联系电话号码
  website: string; // 公司网站
  invalid: boolean; // 标识该推荐码是否有效
}

export interface UserReferralInfo {
  id: number;
  tenantId: number;
  bfAppId: number;
  bfAppName: string;
  userId: number; // 推荐人Id
  userName: string;
  userPhone: string;
  referralCode: string;
  qrcodeUrl: string;
  invalid: boolean; // 标识该code是否有效
}

export interface UserReferralRelation {
  id: number;
  tenantId?: number;
  bfAppId: number;
  referreId: number;
  referredId: number;
  expiredAt?: number;
  expired: boolean;
}
