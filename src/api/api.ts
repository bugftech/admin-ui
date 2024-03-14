import axios from "axios";
const url = import.meta.env.VITE_API_SERVER_URL;

class Base {
  private axiosIntance;
  constructor() {
    this.axiosIntance = axios.create({
      baseURL: url,
      timeout: 5000,
      headers: {
        "Content-type": "application/json",
      },
    });
  }
  // 内部请求
  async request(method: string, url: string, data: any) {
    try {
      const response = await this.axiosIntance.request({
        method,
        url,
        data,
        withCredentials: true,
      });

      const res = response.data;

      return res;
    } catch (error) {
      console.error("request error:", error);
      throw error;
    }
  }

  async GET(url: string, params?: any) {
    return await this.request("GET", url, params);
  }

  async POST(url: string, data: any) {
    return await this.request("POST", url, data);
  }

  async DELETE(url: string, params: any) {
    return await this.request("DELETE", url, params);
  }

  async PUT(url: string, data: any) {
    return await this.request("PUT", url, data);
  }
}

class UserRequest extends Base {
  async filter() {
    const url = "/users/all";
    const data = await this.GET(url);
    return data;
  }
}
