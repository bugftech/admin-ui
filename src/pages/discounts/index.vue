<template>
  <v-toolbar color="transparent" class="border">
    <v-tabs density="compact" v-model="tab">
      <v-tab class="text-caption" :value="1">折扣</v-tab>
    </v-tabs>
  </v-toolbar>
  <VTabsWindow v-model="tab">
    <VTabsWindowItem :value="1">
      <AppToolkitBar>
        <DiscountNewMenu />
        <v-divider vertical class="mx-2 my-3" />
        <v-btn
          prepend-icon="mdi-sync"
          size="small"
          @click="refresh"
          class="border"
          >刷新数据</v-btn
        >
        <v-spacer />
        <v-text-field
          flat
          density="compact"
          variant="solo-filled"
          placeholder="检索"
          prepend-inner-icon="mdi-magnify"
          v-model="search"
        >
        </v-text-field>
      </AppToolkitBar>
      <v-data-table
        :headers="headers"
        :items="items"
        class="text-caption"
        :search="search"
        :loading="loading"
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
          <v-chip size="x-small" :color="item.published ? 'lime' : undefined">{{
            item.published ? "活跃" : "草稿"
          }}</v-chip>
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
            </v-btn>
          </v-sheet>
        </template>
      </v-data-table>
    </VTabsWindowItem>
  </VTabsWindow>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { Discount } from "@/interfaces/discount";
const tab = ref(null);
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
