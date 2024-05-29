<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-btn variant="tonal" size="small" class="me-2"> 导出 </v-btn>
          <DiscountNewMenu />
        </AppBreadcrumb>
        <!--工具栏-->
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="transparent">
            <v-spacer />
            <v-tooltip text="刷新" class="text-caption" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  icon="mdi-sync"
                  size="small"
                  v-bind="props"
                  @click="refresh"
                />
              </template>
            </v-tooltip>
          </v-toolbar>
          <v-divider />
          <v-text-field
            flat
            density="compact"
            variant="solo"
            placeholder="检索"
            rounded="0"
            prepend-inner-icon="mdi-magnify"
            v-model="search"
          >
          </v-text-field>
          <v-divider />
          <v-data-table
            :headers="headers"
            :items="items"
            class="text-caption"
            show-select
            :search="search"
            :loading="loading"
            hover
            @click:row="onClickRow"
          >
            <template v-slot:[`item.name`]="{ item }">
              <v-list-item slim class="pa-0">
                <v-list-item-title class="text-caption font-weight-bold">{{
                  item.name
                }}</v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  {{
                    item.priceStrategy === "fixed_amount"
                      ? "固定金额" + ":" + item.priceStrategyValue
                      : "百分比" + ":" + item.priceStrategyPercent
                  }}
                  · {{}}
                </v-list-item-subtitle>
              </v-list-item>
            </template>
            <template v-slot:[`item.way`]="{ item }">
              <div>{{ item.name === "automatic" ? "自动折扣" : "折扣码" }}</div>
            </template>
            <template v-slot:[`item.published`]="{ item }">
              <v-chip
                size="x-small"
                :color="item.published ? 'lime' : undefined"
                >{{ item.published ? "活跃" : "草稿" }}</v-chip
              >
            </template>
            <template v-slot:[`item.type`]="{ item }">
              <div>{{ discountTypes[item.type] }}</div>
            </template>
            <template v-slot:[`item.customerStrategy`]="{ item }">
              <div>{{ customerTypes[item.customerStrategy] }}</div>
            </template>
            <template v-slot:loading>
              <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template v-slot:no-data>
              <v-sheet>
                <v-img src="@/assets/discount.svg" height="200px" class="my-8">
                </v-img>

                <div class="text-subtitle-2 v-card-title">产品折扣</div>
                <div class="text-caption v-card-subtitle">
                  产品折扣允许自定义组合，帮助您更好的营销产品。
                </div>
                <v-btn
                  size="small"
                  class="ma-4"
                  color="orange-accent-2"
                  variant="flat"
                  to="/discounts/new"
                  >添加折扣
                  
                  </v-btn
                >
              </v-sheet>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { Discount } from "@/interfaces/discount";

const headers = [
  {
    title: "标题",
    key: "name",
  },
  {
    title: "状态",
    key: "published",
  },
  {
    title: "方法",
    key: "way",
  },
  {
    title: "客户策略",
    key: "customerStrategy",
  },
  {
    title: "类型",
    key: "type",
  },
];

const items = ref<Discount[]>([]);
const search = ref("");
const loading = ref(false);
const router = useRouter();

const discountTypes = {
  moneyOffProduct: "产品折扣",
  buyXgetY: "买X得Y",
  moneyOffOrder: "订单折扣",
  shipping: "运费折扣",
};

const customerTypes = {
  all: "所有客户",
  segment: "过滤的客户",
  specified: "指定的客户",
};

const refresh = async () => {
  loading.value = true;
  await fetchData();
  loading.value = false;
};

const fetchData = async () => {
  const { data, success } = await BFSDK.getDiscounts();
  if (success) {
    items.value = data;
  }
};

const onClickRow = (e: any, selected: any) => {
  const { item } = selected;
  if (!item.id) return;
  router.push({ name: "/discounts/[id]", params: { id: item.uid } });
};

onMounted(async () => {
  await fetchData();
});
</script>

<route lang="yaml">
meta:
  title: 折扣中心"
  breadcrumb: "折扣"
</route>
