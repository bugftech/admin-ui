<template>
  <app-toolkit-bar>
    <v-btn
      theme="dark"
      variant="flat"
      size="small"
      appendIcon="mdi-plus"
      to="/pms/products/new"
    >
      新建商品
    </v-btn>
    <v-divider class="mx-2 my-3" vertical />
    <v-btn prepend-icon="mdi-sync" size="small" class="border">
      刷新数据
    </v-btn>
    <v-divider class="mx-2 my-3" vertical />

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          size="small"
          class="border"
          append-icon="mdi-filter"
          >产品类型</v-btn
        >
      </template>

      <v-list density="compact">
        <v-list-item
          v-for="(k, v) in productTypes"
          :key="v"
          @click="addFilter('productType', v)"
        >
          <v-list-item-title class="text-caption">
            {{ k }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-spacer />
    <v-text-field
      flat
      density="compact"
      variant="solo-filled"
      placeholder="检索"
      append-icon="mdi-magnify"
      v-model="search"
    >
    </v-text-field>
  </app-toolkit-bar>

  <v-data-table
    return-object
    class="text-caption"
    hover
    :loading="loading"
    :search="search"
    :headers="headers"
    :items="items"
    @click:row="onClickRow"
  >
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
    <template v-slot:[`item.isPublished`]="{ item }">
      <v-checkbox-btn
        readonly
        :model-value="item.published"
        hide-details
      ></v-checkbox-btn>
    </template>
    <template v-slot:[`item.name`]="{ item }">
      <v-list-item class="pa-0" slim>
        <template v-slot:prepend>
          <v-avatar class="rounded-lg border">
            <v-img :src="item.banner" v-if="item.banner" />
            <v-icon icon="mdi-image" v-else />
          </v-avatar>
        </template>
        <v-list-item-title class="text-caption font-weight-medium ms-2">
          {{ item.name }}
        </v-list-item-title>
      </v-list-item>
    </template>
    <template v-slot:[`item.price`]="{ item }">
      <div>{{ usePriceYuan(item.price) }}</div>
    </template>
    <template v-slot:[`item.published`]="{ item }">
      <v-checkbox-btn v-model="item.published" readonly></v-checkbox-btn>
    </template>
    <template v-slot:[`item.originalPrice`]="{ item }">
      <div>{{ usePriceYuan(item.originalPrice) }}</div>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <div class="d-flex">
        <v-chip
          size="x-small"
          label
          color="orange-accent-3"
          class="mr-2"
          v-if="item.newArrvial"
          prepend-icon="mdi-new-box"
          >新品</v-chip
        >
        <v-chip
          size="x-small"
          label
          class="mr-2"
          color="green-darken-1"
          v-if="item.recommand"
          prepend-icon="mdi-star"
          >推荐</v-chip
        >
        <v-chip
          size="x-small"
          label
          v-if="item.preview"
          prepend-icon="mdi-cloud-off-outline"
          >预告</v-chip
        >
      </div>
    </template>
    <template v-slot:[`item.productType`]="{ item }">
      <v-chip size="x-small" variant="tonal" color="indigo">{{
        productTypes[item.productType]
      }}</v-chip>
    </template>
    <template v-slot:[`no-data`]>
      <v-sheet>
        <v-img src="@/assets/shopping_bags.svg" height="200px" class="my-8">
        </v-img>
        <div class="v-card-title text-subtitle-2">商品库存</div>
        <div class="text-caption v-card-subtitle">商品库存记录商品的状态</div>
        <v-btn
          size="small"
          class="ma-4"
          color="orange-accent-2"
          variant="flat"
          to="/pms/products/new"
          >添加商品</v-btn
        >
      </v-sheet>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
// Utilities
import { usePriceYuan } from "@/composables/price";
import bugfreed from "@/sdk";
import { ProductService } from "@/sdk/pms/product/product";
import { Product } from "@/sdk/pms/product/types";

// GiftCard,Digital,Physical,Services,Bundles,Subscriptions
const productTypes: { [key: string]: string } = {
  digital: "虚拟商品",
  physical: "物理商品",
  services: "服务商品",
  bundles: "捆绑商品",
  subscriptions: "订阅产品",
};

const headers = [
  {
    title: "产品名称",
    key: "name",
  },
  {
    title: "售卖价格",
    key: "price",
  },
  {
    title: "原价",
    key: "originalPrice",
  },
  {
    title: "销量",
    key: "sale",
  },
  {
    title: "库存",
    key: "stock",
  },
  {
    title: "产品类型",
    key: "productType",
  },
  {
    title: "是否上架",
    key: "published",
  },
  {
    title: "状态",
    key: "status",
  },
];

const product = new ProductService({ bugfreed });

const search = ref();
const router = useRouter();
const items = ref<Product[]>([]);
const loading = ref(false);
// filters 过滤条件
const filters = ref<{ [key: string]: any }>({});

const onClickRow = (e: any, selected: any) => {
  const { item } = selected;
  const idx = items.value.findIndex((prod) => prod.id === item.id);
  if (idx < 0) return;
  const id = items.value[idx].id;
  router.push(`/pms/products/${id}`);
};

const fetch = async () => {
  loading.value = true;
  const { success, data } = await product.list();
  if (!success) return (loading.value = false);
  items.value = data;
  loading.value = false;
};

onMounted(async () => {
  await fetch();
});

const addFilter = (key: string, value: any) => {
  // 将键值对添加到 filters 对象中
  filters.value[key] = value;
};

const hasFilter = (key: string): boolean => {
  // 使用 'in' 操作符检查键是否存在
  return key in filters.value;
};

const removeFilter = (key: string): void => {
  delete filters.value[key];
};

const getFilter = (key: string): string | undefined => {
  return filters.value[key];
};

defineExpose({
  items,
  fetch,
});
</script>
