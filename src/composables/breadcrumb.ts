// useBreadcrumbs.ts
import { computed, ComputedRef } from "vue";
import {
  RouteRecordNormalized,
  useRoute,
} from "vue-router";

interface BreadcrumbItem {
  title: string;
  disabled?: boolean;
  href: string;
}

// useBreadcrumbs 使用面包屑
export const useBreadcrumbs = (breadcrumbs: ComputedRef<BreadcrumbItem[]>) => {
  const route = useRoute();
  // 计算面包屑导航项
  breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const matchedRoutes = route.matched.filter(
      (record: RouteRecordNormalized) => record.meta?.title
    );
    return matchedRoutes.map(
      (record: RouteRecordNormalized, index: number): BreadcrumbItem => ({
        title: record.meta.title as string,
        disabled: index === matchedRoutes.length - 1, // 最后一个路由禁用链接.
        href: record.path as string,
      })
    );
  });

  return {
    breadcrumbs,
  };
};
