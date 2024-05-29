import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  WechatApp,
  App,
  BindWechatPay,
  AppWebhookConfig,
} from "@/interfaces/apps";
import { PayInfo, WechatPay } from "@/interfaces/pay";
import { Product, ProductAndSku, ProductOrSkuDTO } from "@/interfaces/product";
import { AllCategory } from "@/interfaces/category";
import { OrderInfo } from "@/interfaces/order";
import { Collection } from "@/interfaces/collection";
import { Discount } from "@/interfaces/discount";
import { IdResponse } from "@/interfaces/reponse";
import { Brand } from "@/interfaces/brand";
import {
  UserReferral,
  UserReferralInfo,
  UserReferralRelation,
} from "@/interfaces/userReferral";
import { User } from "@/interfaces/user";
import { AppWechatKF } from "@/interfaces/wechat";
import { ColumnMeta, TableMeta } from "@/interfaces/airtable";

const url = import.meta.env.VITE_API_SERVER_URL;

export type APIResponse<T> = {
  success: boolean;
  data: T;
  status?: number;
  message?: string;
  // headers?: Record<string, string>;
};

type Pagination = {
  page: number;
  limit: number;
};

class BaseClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, withCredentials: boolean) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 5000, // 设置默认超时时间为 5 秒
      withCredentials,
    });
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return {
        success: true,
        data: (response.data &&
        typeof response.data === "object" &&
        "data" in response.data
          ? (response.data as any).data
          : response.data) as T,
        status: response.status,
        message: response.statusText,
      };
    } catch (error) {
      return this.handleErrorResponse<T>(error);
    }
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return {
        success: true,
        data: (response.data &&
        typeof response.data === "object" &&
        "data" in response.data
          ? (response.data as any).data
          : response.data) as T,
        status: response.status,
        message: response.statusText,
      };
    } catch (error) {
      return this.handleErrorResponse<T>(error);
    }
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return {
        success: true,
        data: (response.data &&
        typeof response.data === "object" &&
        "data" in response.data
          ? (response.data as any).data
          : response.data) as T,
        status: response.status,
      };
    } catch (error) {
      return this.handleErrorResponse<T>(error);
    }
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return {
        success: true,
        data: (response.data &&
        typeof response.data === "object" &&
        "data" in response.data
          ? (response.data as any).data
          : response.data) as T,
        status: response.status,
      };
    } catch (error) {
      return this.handleErrorResponse<T>(error);
    }
  }

  private handleErrorResponse<T>(error: any): APIResponse<T> {
    if (error.response) {
      // 请求已发出，但服务器响应状态码不在 2xx 范围内
      return {
        success: false,
        data: null as T,
        status: error.response.status,
        // 返回自定义的错误
        message: error.response.data.message!,
      };
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      return {
        success: false,
        data: null as T,
        message: "No response received from server",
      };
    } else {
      // 在设置请求时发生错误
      return {
        success: false,
        data: null as T,
        message:
          error.message || "An error occurred while processing the request",
      };
    }
  }
}

class SDK extends BaseClient {
  constructor(baseURL: string, withCredentials: boolean) {
    // 调用父类的构造函数，传递基本 URL 和 withCredentials 参数
    super(baseURL, withCredentials);
  }

  async login(username: string, password: string): Promise<APIResponse<any>> {
    const url = "/signin";
    return await this.post(url, { username, password });
  }

  async signup(email: string, password: string) {
    const url = "/signup";
    return await this.post(url, { email: email, password: password });
  }

  async getApps(pagination?: Pagination): Promise<APIResponse<App[]>> {
    const url = this.listWrapperUrl("/apps", pagination);
    return await this.get<App[]>(url);
  }

  async getAppByUid(uid: string): Promise<APIResponse<App>> {
    const url = `/apps/uid/${uid}`;
    return await this.get<App>(url);
  }

  async getAppById(id: number): Promise<APIResponse<App>> {
    const url = `/apps/${id}`;
    return await this.get<App>(url);
  }

  // TODO: 通用的config。不区分type
  async addWxApp(config: WechatApp): Promise<APIResponse<WechatApp[]>> {
    const url = "/apps";
    return await this.post<WechatApp[]>(url, config);
  }

  // 返回uid
  async createApp(config: App): Promise<APIResponse<IdResponse>> {
    const url = "/apps";
    return await this.post<IdResponse>(url, config);
  }

  async deleteApp(id: number): Promise<APIResponse<WechatApp[]>> {
    const url = `/apps/${id}`;
    return await this.delete<WechatApp[]>(url);
  }

  async updateApp(id: number, config: App): Promise<APIResponse<WechatApp>> {
    const url = `/apps/${id}`;
    return await this.put<WechatApp>(url, config);
  }

  async getAppPays(appId: number): Promise<APIResponse<WechatPay[]>> {
    const url = `/apps/${appId}/pays`;
    return await this.get<WechatPay[]>(url);
  }

  async getProducts(pagination?: Pagination): Promise<APIResponse<Product[]>> {
    const url = this.listWrapperUrl("/pms/products", pagination);
    return await this.get<Product[]>(url);
  }

  async getProductsAndSkus(
    pagination?: Pagination
  ): Promise<APIResponse<ProductOrSkuDTO[]>> {
    const url = this.listWrapperUrl("/pms/products-skus", pagination);
    return await this.get<ProductOrSkuDTO[]>(url);
  }

  async getProduct(
    id: number,
    withSkus: boolean
  ): Promise<APIResponse<ProductAndSku>> {
    let url = `/pms/products/${id}`;
    if (withSkus) {
      url = url + "?withSkus=true";
    }
    return await this.get<ProductAndSku>(url);
  }

  async addProduct(config: ProductAndSku): Promise<APIResponse<ProductAndSku>> {
    const url = "/pms/products";
    return await this.post<ProductAndSku>(url, config);
  }

  async updateProduct(
    id: number | string,
    product: ProductAndSku
  ): Promise<APIResponse<ProductAndSku>> {
    const url = `/pms/products/${id}`;
    return await this.put<ProductAndSku>(url, product);
  }

  async getUsers(): Promise<APIResponse<any>> {
    const url = "/users";
    return await this.get<any[]>(url);
  }

  async getUserByPhone(phone: string): Promise<APIResponse<User>> {
    const url = `/users/phone/${phone}`;
    return await this.get<User>(url);
  }

  async getSkus(): Promise<APIResponse<any>> {
    const url = "/pms/skus";
    return await this.get<any[]>(url);
  }

  async getCategories(
    pagination?: Pagination
  ): Promise<APIResponse<AllCategory[]>> {
    const url = this.listWrapperUrl("/pms/categories", pagination);
    return await this.get<AllCategory[]>(url);
  }

  async getCategoriesByParentId(
    id: number
  ): Promise<APIResponse<AllCategory[]>> {
    const url = `/pms/categories/${id}/children`;
    return await this.get<AllCategory[]>(url);
  }

  async getCategoryById(id: number): Promise<APIResponse<AllCategory>> {
    const url = `/pms/categories/${id}`;
    return await this.get<AllCategory>(url);
  }

  async filterCategories(level: number): Promise<APIResponse<AllCategory[]>> {
    const url = `/pms/categories?level=${level}`;
    return await this.get<AllCategory[]>(url);
  }

  async updateCategory(
    id: number,
    config: AllCategory
  ): Promise<APIResponse<AllCategory>> {
    const url = `/pms/categories/${id}`;
    return await this.put<AllCategory>(url, config);
  }

  async addCategory(config: AllCategory): Promise<APIResponse<AllCategory>> {
    const url = `/pms/categories`;
    return await this.post<AllCategory>(url, config);
  }

  async getOrders(pagination?: Pagination): Promise<APIResponse<OrderInfo[]>> {
    const url = this.listWrapperUrl("/orders", pagination);
    return await this.get<OrderInfo[]>(url);
  }

  async getOrderById(
    id: number,
    withItems?: boolean
  ): Promise<APIResponse<OrderInfo>> {
    let url = `/orders/${id}`;
    if (withItems) {
      url += `?withItems=${withItems}`;
    }
    return await this.get<OrderInfo>(url);
  }

  // Applications Wechat KFs

  // getWechatKFs 获取App列表下的微信客服
  async getWechatKFs(id: number): Promise<APIResponse<AppWechatKF[]>> {
    const url = `/apps/${id}/kfs`;
    return await this.get<AppWechatKF[]>(url);
  }

  // getDefaultWechatKF 获取默认的客服
  async getDefaultWechatKF(id: number): Promise<APIResponse<AppWechatKF[]>> {
    const url = `/apps/${id}/kfs/default`;
    return await this.get<AppWechatKF[]>(url);
  }

  async addWechatKF(
    id: number,
    config: AppWechatKF
  ): Promise<APIResponse<AppWechatKF>> {
    const url = `/apps/${id}/kfs`;
    return await this.post<AppWechatKF>(url, config);
  }

  async updateWechatKF(
    id: number,
    kfId: number,
    config: AppWechatKF
  ): Promise<APIResponse<AppWechatKF>> {
    const url = `/apps/${id}/kfs/${kfId}`;
    return await this.put<AppWechatKF>(url, config);
  }

  async changeDefaultWechatKF(
    id: number,
    kfId: number,
    config: AppWechatKF
  ): Promise<APIResponse<AppWechatKF>> {
    const url = `/apps/${id}/kfs/${kfId}/default`;
    return await this.put<AppWechatKF>(url, config);
  }

  // webhook
  async getWebooksByAppId(
    id: number
  ): Promise<APIResponse<AppWebhookConfig[]>> {
    const url = `/apps/${id}/webhooks`;
    return await this.get<AppWebhookConfig[]>(url);
  }
  async getWebookById(
    id: number,
    hookId: number
  ): Promise<APIResponse<AppWebhookConfig>> {
    const url = `/apps/${id}/webhooks/${hookId}`;
    return await this.get<AppWebhookConfig>(url);
  }

  async updateWebookById(
    id: number,
    hookId: number,
    config: AppWebhookConfig
  ): Promise<APIResponse<AppWebhookConfig>> {
    const url = `/apps/${id}/webhooks/${hookId}`;
    return await this.put<AppWebhookConfig>(url, config);
  }

  async addAppWebook(
    id: number,
    config: AppWebhookConfig
  ): Promise<APIResponse<AppWebhookConfig>> {
    const url = `/apps/${id}/webhooks`;
    return await this.post<AppWebhookConfig>(url, config);
  }

  // Applications Pay
  async addWechatPay(config: WechatPay): Promise<APIResponse<WechatPay>> {
    const url = "/pays/wechat";
    return await this.post<WechatPay>(url, config);
  }

  async updateWechatPay(
    id: number,
    config: WechatPay
  ): Promise<APIResponse<WechatPay>> {
    const url = `/pays/${id}/wechat`;
    return await this.put<WechatPay>(url, config);
  }

  async getWechatPay(id: number): Promise<APIResponse<WechatPay>> {
    const url = `/pays/${id}/wechat`;
    return await this.get<WechatPay>(url);
  }

  async getWechatPays(): Promise<APIResponse<WechatPay[]>> {
    const url = "/pays/wechat";
    return await this.get<WechatPay[]>(url);
  }

  async bindWechatPay(
    id: number,
    config: BindWechatPay
  ): Promise<APIResponse<WechatPay>> {
    const url = `/apps/${id}/wxpay`;
    return await this.put<WechatPay>(url, config);
  }

  async updateAppPay(
    id: number,
    payId: number,
    config: WechatPay
  ): Promise<APIResponse<WechatPay>> {
    const url = `/apps/${id}/pays/${payId}`;
    return await this.put<WechatPay>(url, config);
  }

  async getPays(): Promise<APIResponse<PayInfo[]>> {
    const url = "/pays";
    return await this.get<PayInfo[]>(url);
  }

  // Collection
  async addCollection(config: Collection): Promise<APIResponse<Collection>> {
    const url = "/pms/collections";
    return await this.post<Collection>(url, config);
  }

  async getAllCollections(): Promise<APIResponse<Collection[]>> {
    const url = "/pms/collections/all";
    return await this.get<Collection[]>(url);
  }

  async getCollection(id: number): Promise<APIResponse<Collection[]>> {
    const url = `/pms/collections/${id}`;
    return await this.get<Collection[]>(url);
  }

  async getDiscounts(
    pagination?: Pagination
  ): Promise<APIResponse<Discount[]>> {
    const url = this.listWrapperUrl("/discounts", pagination);
    return await this.get<Discount[]>(url);
  }

  async addDiscount(config: Discount): Promise<APIResponse<Discount>> {
    const url = "/discounts";
    return await this.post<Discount>(url, config);
  }

  async getDiscountByUid(uid: string): Promise<APIResponse<Discount>> {
    const url = `/discounts/uid/${uid}`;
    return await this.get<Discount>(url);
  }

  async updateCollectionItems(
    id: number,
    config: Product[]
  ): Promise<APIResponse<Collection>> {
    const url = `/pms/collections/${id}/items`;
    return await this.put<Collection>(url, { Products: config });
  }

  // brands
  async getBrands(pagination?: Pagination): Promise<APIResponse<Brand[]>> {
    const url = this.listWrapperUrl("/pms/brands", pagination);
    return await this.get<Brand[]>(url);
  }

  async addBrand(brand: Brand): Promise<APIResponse<Brand>> {
    const url = "/pms/brands";
    return await this.post<Brand>(url, brand);
  }

  // 添加推荐人
  async addReferralUser(ur: UserReferral): Promise<APIResponse<UserReferral>> {
    const url = "/referrals";
    return await this.post<UserReferral>(url, ur);
  }

  async addReferredUser(
    id: number,
    confg: UserReferralRelation
  ): Promise<APIResponse<UserReferralRelation>> {
    const url = `/referrals/${id}/user`;
    return await this.post<UserReferralRelation>(url, confg);
  }

  async getReferrals(): Promise<APIResponse<UserReferralInfo[]>> {
    const url = "/referrals";
    return await this.get<UserReferralInfo[]>(url);
  }

  async getReferralById(id: number): Promise<APIResponse<UserReferralInfo>> {
    const url = `/referrals/${id}`;
    return await this.get<UserReferralInfo>(url);
  }

  async updateReferralById(
    id: number,
    config: UserReferral
  ): Promise<APIResponse<UserReferral>> {
    const url = `/referrals/${id}`;
    return await this.put<UserReferral>(url, config);
  }

  async getOrdersByReferralId(id: number): Promise<APIResponse<OrderInfo[]>> {
    const url = `/referrals/${id}/orders`;
    return await this.get<OrderInfo[]>(url);
  }

  async analysticsDailyOrders(): Promise<APIResponse<any[]>> {
    const url = "/analytics/orders/daily";
    return await this.get<any[]>(url);
  }

  async analysticsMonthOrders(): Promise<APIResponse<any[]>> {
    const url = "/analytics/orders/month";
    return await this.get<any[]>(url);
  }

  async getUsersByReferralId(id: number): Promise<APIResponse<User[]>> {
    const url = `/referrals/${id}/users`;
    return await this.get<User[]>(url);
  }

  // air table
  async getAirTables(): Promise<APIResponse<TableMeta[]>> {
    const url = "/airtables";
    return await this.get<TableMeta[]>(url);
  }

  async getAirTableColumns(id: number): Promise<APIResponse<ColumnMeta[]>> {
    const url = `/airtables/${id}/cols`;
    return await this.get<ColumnMeta[]>(url);
  }

  async getAirTableRows(id: number): Promise<APIResponse<any[]>> {
    const url = `/airtables/${id}/rows`;
    return await this.get<any[]>(url);
  }

  async uploadQrcodeFile(code: string, formData: FormData): Promise<APIResponse<any>> {
    const url = `/oss/${code}/qrcode`;
    return this.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // listWrapperUrl 获取列表的方式
  private listWrapperUrl(url: string, pagination?: Pagination): string {
    if (!pagination) return url;

    let queryString = "";
    if (pagination.limit > 0 && pagination.page > 0) {
      queryString = `?page=${pagination.page}&limit=${pagination.limit}`;
    }

    return url + queryString;
  }
}

const BFSDK = new SDK(url, true);

export default BFSDK;
