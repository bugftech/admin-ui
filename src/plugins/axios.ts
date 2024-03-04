import axios from "axios";
import { useRouter } from "vue-router";
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

const router = useRouter()
instance.interceptors.response.use(
  function (response) {
    // status 2xx
    return response;
  },
  function (error) {
    // 响应状态码不是 2xx 时触发失败的回调，形参中的 error 是“失败的结果”
    if (error.response.status === 401 ) {
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default instance;
