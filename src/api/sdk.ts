import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { WechatApp, App } from "@/interfaces/apps";
import { WechatPay } from "@/interfaces/pay";
import { Product, ProductAndSku, ProductOrSkuDTO } from "@/interfaces/product";
import { AllCategory } from "@/interfaces/category";
import { OrderInfo } from "@/services/types";
import { Collection } from "@/interfaces/collection";
import { Discount } from "@/interfaces/discount";
import { IdResponse } from "@/interfaces/reponse";

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

  async updateApp(
    id: number,
    config: WechatApp
  ): Promise<APIResponse<WechatApp>> {
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

  async getProduct(id: number): Promise<APIResponse<ProductAndSku>> {
    const url = `/pms/products/${id}`;
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

  async getSkus(): Promise<APIResponse<any>> {
    const url = "/tenant/skus";
    return await this.get<any[]>(url);
  }

  async getCategories(level?: number): Promise<APIResponse<AllCategory[]>> {
    let url = "";
    if (level === 1) {
      url = "/pms/categories";
    } else {
      url = "/pms/categories/all";
    }

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

  // Applications Pay
  async addPay(id: number, config: WechatPay): Promise<APIResponse<WechatPay>> {
    const url = `/apps/${id}/pays`;
    return await this.post<WechatPay>(url, config);
  }

  async updateAppPay(
    id: number,
    payId: number,
    config: WechatPay
  ): Promise<APIResponse<WechatPay>> {
    const url = `/apps/${id}/pays/${payId}`;
    return await this.put<WechatPay>(url, config);
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

  // listWrapperUrl 获取列表的方式
  private listWrapperUrl(url: string, pagination?: Pagination): string {
    if (!pagination) return url + "/all";

    let queryString = "";
    if (pagination.limit > 0 && pagination.page > 0) {
      queryString = `?page=${pagination.page}&limit=${pagination.limit}`;
    }

    return url + queryString;
  }
}

const BFSDK = new SDK(url, true);

export default BFSDK;
