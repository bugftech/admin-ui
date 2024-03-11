import axios from "axios";

// 不能直接用vue-router.他只能在setup函数内使用
import router from "@/router";
const url = import.meta.env.VITE_API_SERVER_URL;

const instance = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    config.withCredentials = true;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // status 2xx
    return response;
  },
  function (error) {
    // 响应状态码不是 2xx 时触发失败的回调，形参中的 error 是“失败的结果”
    if (error.response.status === 403) {
      const currentRouteName = router.currentRoute.value.name;
      console.log("currentRouteName:",currentRouteName)
      if (currentRouteName !== "/login") {
        router.push({
          name: "/login",
          query: {
            redirect: router.currentRoute.value.fullPath,
          },
        });
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
