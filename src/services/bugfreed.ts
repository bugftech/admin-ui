import http from "@/plugins/axios";
import { APIResponse, Pagination } from "./types";

// list 根据分页获取数据
async function list<T>(
  serviceName: string,
  query?: Record<string, any>,
  pagination?: Pagination
) {
  let url: string = `/${serviceName}`;
  if (pagination) {
    const { page, limit } = pagination;
    url += `?page=${page}&pageSize=${limit}`;
  } else {
    url += "/all";
  }

  // Append query parameters if provided
  if (query) {
    const queryParams = new URLSearchParams(query).toString();
    url += `&${queryParams}`;
  }

  return await http.get<APIResponse<T[]>>(url, { withCredentials: true });
}

// get 获取单个数据
async function get<T>(serviceName: string, id: number) {
  if (!id) {
    throw new Error("no id provided");
  }

  const url: string = `/${serviceName}/${id}`;
  return await http.get<APIResponse<T>>(url, { withCredentials: true });
}

// remove 删除一条
async function remove<T>(serviceName: string, id: number) {
  if (!id) {
    throw new Error("no id provided");
  }

  const url: string = `/${serviceName}/${id}`;
  return await http.delete<APIResponse<T>>(url, { withCredentials: true });
}

// add 添加一个对象
async function add<T>(serviceName: string, data: T) {
  const url: string = `/${serviceName}`;
  return await http.post<APIResponse<T>>(url, data, { withCredentials: true });
}

// update 更新一个对象
async function update<T>(serviceName: string, id: number, data: T) {
  const url: string = `/${serviceName}/${id}`;
  return await http.put<APIResponse<T>>(url, data, { withCredentials: true });
}

async function getByURL<T>(url: string) {
  return await http.get<APIResponse<T>>(url, { withCredentials: true });
}

export default {
  list,
  get,
  remove,
  add,
  update,
  getByURL,
};
