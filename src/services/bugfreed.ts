import http from "@/plugins/axios";
import { APIResponse, Pagination } from "./types";

const supportedServices = ["orders", "products"];

// list 根据分页获取数据
async function list<T>(serviceName: string, pagination?: Pagination) {
  if (!supportedServices.includes(serviceName)) {
    throw new Error(`Unsupported service: ${serviceName}`);
  }

  let url: string = `/${serviceName}`;
  if (pagination) {
    const { page, limit } = pagination;
    url += `?page=${page}&pageSize=${limit}`;
  } else {
    url += "/all";
  }

  return await http.get<APIResponse<T[]>>(url, { withCredentials: true });
}

// get 获取单个数据
async function get<T>(serviceName: string, id: number) {
  if (!supportedServices.includes(serviceName)) {
    throw new Error(`Unsupported service: ${serviceName}`);
  }
  if (!id) {
    throw new Error("no id provided");
  }

  const url: string = `/${serviceName}/${id}`;
  return await http.get<APIResponse<T>>(url, { withCredentials: true });
}

// remove 删除一条
async function remove<T>(serviceName: string, id: number) {
  if (!supportedServices.includes(serviceName)) {
    throw new Error(`Unsupported service: ${serviceName}`);
  }
  if (!id) {
    throw new Error("no id provided");
  }

  const url: string = `/${serviceName}/${id}`;
  return await http.delete<APIResponse<T>>(url, { withCredentials: true });
}

// add 添加一个对象
async function add<T>(serviceName: string, data: T) {
  if (!supportedServices.includes(serviceName)) {
    throw new Error(`Unsupported service: ${serviceName}`);
  }

  const url: string = `/${serviceName}`;
  return await http.post<APIResponse<T>>(url, data, { withCredentials: true });
}

// update 更新一个对象
async function update<T>(serviceName: string, id: number, data: T) {
  if (!supportedServices.includes(serviceName)) {
    throw new Error(`Unsupported service: ${serviceName}`);
  }

  const url: string = `/${serviceName}/${id}`;
  return await http.put<APIResponse<T>>(url, data, { withCredentials: true });
}

export default {
  list,
  get,
  remove,
  add,
  update,
};
