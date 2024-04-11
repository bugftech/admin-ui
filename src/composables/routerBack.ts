import { useRouter } from "vue-router";

// 返回上一页面
export const useRouterBack = () => {
  const router = useRouter();
  return router.back();
};
