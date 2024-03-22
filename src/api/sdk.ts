import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { WechatApp } from "@/interfaces/apps";
import { WechatPay } from "@/interfaces/pay";
import { Product, ProductAndSku } from "@/interfaces/product";

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
    const url = "/login";
    return await this.post(url, { username, password });
  }

  async signup(email: string, password: string) {
    const url = "/signup";
    return await this.post(url, { email: email, password: password });
  }

  async getApps(pagination?: Pagination): Promise<APIResponse<WechatApp[]>> {
    const url = this.listWrapperUrl("/apps", pagination);
    return await this.get<WechatApp[]>(url);
  }

  // TODO: 通用的config。不区分type
  async addWxApp(config: WechatApp): Promise<APIResponse<WechatApp[]>> {
    const url = "/apps";
    return await this.post<WechatApp[]>(url, config);
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

  async getProduct(id: number): Promise<APIResponse<ProductAndSku>> {
    const url = `/pms/products/${id}`;
    return await this.get<ProductAndSku>(url);
  }

  async getUsers(): Promise<APIResponse<any>> {
    const url = "/users";
    return await this.get<any[]>(url);
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
