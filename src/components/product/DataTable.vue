<template>
  <v-card>
    <v-toolbar color="transparent">
      <AppDatePicker />
      <v-spacer />
      <v-tooltip text="刷新" class="text-caption" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-sync" size="small" v-bind="props" />
        </template>
      </v-tooltip>
    </v-toolbar>
    <v-divider />
    <v-text-field
      flat
      density="compact"
      variant="solo"
      placeholder="检索"
      prepend-inner-icon="mdi-magnify"
      v-model="search"
    >
    </v-text-field>
    <v-divider />
    <v-data-table
      show-select
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
          :model-value="item.isPublished"
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
      <template v-slot:[`item.originalPrice`]="{ item }">
        <div>{{ usePriceYuan(item.originalPrice) }}</div>
      </template>
      <template v-slot:[`item.promotionPrice`]="{ item }">
        <div>{{ usePriceYuan(item.promotionPrice) }}</div>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <div class="d-flex">
          <v-chip
            size="x-small"
            label
            color="orange-accent-3"
            class="mr-2"
            v-if="item.isNew"
            prepend-icon="mdi-new-box"
            >新品</v-chip
          >
          <v-chip
            size="x-small"
            label
            class="mr-2"
            color="green-darken-1"
            v-if="item.isRecommand"
            prepend-icon="mdi-star"
            >推荐</v-chip
          >
          <v-chip
            size="x-small"
            label
            v-if="item.isPreview"
            prepend-icon="mdi-cloud-off-outline"
            >预告</v-chip
          >
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import BFSDK from "@/api/sdk";
// Utilities
import { usePriceYuan } from "@/composables/price";
import { Product } from "@/interfaces/product";

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
    title: "促销价格",
    key: "promotionPrice",
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
    title: "是否上架",
    key: "isPublished",
  },
  {
    title: "状态",
    key: "status",
  },
];

const search = ref();
const router = useRouter();
const items = ref<Product[]>([]);
const loading = ref(false);

const onClickRow = (e: any, selected: any) => {
  const id = items.value[selected.index].id;
  router.push(`/pms/products/${id}`);
};

const fetch = async () => {
  loading.value = true;
  const { success, data } = await BFSDK.getProducts();
  if (!success) return (loading.value = false);
  items.value = data;
  loading.value = false;
};

onMounted(async () => {
  await fetch()
});

defineExpose({
  items,
  fetch
});
</script>
