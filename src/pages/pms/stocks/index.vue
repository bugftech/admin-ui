<template>
  <v-toolbar color="transparent" density="compact" class="border">
    <v-tabs density="compact" v-model="tab">
      <v-tab class="text-caption" :value="1">商品库存</v-tab>
      <v-tab class="text-caption" :value="2">SKU库存</v-tab>
    </v-tabs>
  </v-toolbar>
  <VTabsWindow v-model="tab">
    <VTabsWindowItem :value="1">
      <AppToolkitBar>
        <v-btn
          size="small"
          prepend-icon="mdi-sync"
          @click="fetch"
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
        class="text-caption"
        hover
        :search="search"
        :items="skus"
        :loading="loading"
      >
        <template v-slot:[`item.variant`]="{ item }">
          <v-list-item class="pa-0">
            <template v-slot:prepend>
              <v-avatar class="rounded-lg border">
                <v-img :src="item.pic" v-if="item.pic" />
                <v-icon icon="mdi-image" v-else />
              </v-avatar>

              <v-list-item-title class="text-caption font-weight-bold ms-2">
                {{ convertToString(item.skuAttributes) }}
              </v-list-item-title>
            </template>
          </v-list-item>
        </template>
        <template v-slot:[`item.skuCode`]="{ item }">
          <div>{{ item.skuCode ? item.skuCode : "WG-A-001-BLACK" }}</div>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-icon icon="mdi-dots-vertical" size="x-large" v-bind="props">
              </v-icon>
            </template>
            <v-list>
              <v-list-item>
                <v-btn
                  @click="edit(item)"
                  size="small"
                  prepend-icon="mdi-pencil"
                  >编辑</v-btn
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

        <template v-slot:loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-slot:[`no-data`]>
          <v-sheet>
            <v-img src="@/assets/stock_prices.svg" height="200px" class="my-8">
            </v-img>
            <div class="v-card-title text-subtitle-2">商品库存</div>
            <div class="text-caption v-card-subtitle">
              库存会显示商品的可售卖的状态
            </div>
            <v-btn
              size="small"
              class="ma-4"
              color="orange-accent-2"
              variant="flat"
              >添加商品</v-btn
            >
          </v-sheet>
        </template>
      </v-data-table>
    </VTabsWindowItem>
  </VTabsWindow>
  <AppConfirmDialog ref="confirm"> </AppConfirmDialog>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { SkuStock } from "@/interfaces/skuStock";

const skus = ref<SkuStock[]>([]);
const search = ref("");
const confirm = ref();
const loading = ref(false);
const tab = ref(null);

const headers: any[] = [
  {
    title: "变体",
    key: "variant",
  },
  {
    title: "商品ID",
    key: "productId",
  },
  {
    title: "SKU编号",
    key: "skuCode",
  },
  {
    title: "锁定库存",
    key: "lock",
  },
  {
    title: "现货",
    key: "stock",
  },
  {
    title: "操作",
    key: "actions",
    align: "end",
  },
];

const router = useRouter();

const edit = (item: SkuStock) => {
  router.push({
    name: "/pms/products/[id]",
    params: { id: item.productId },
  });
};

const fetch = async () => {
  if (loading.value) return;
  loading.value = true;
  const { data, success } = await BFSDK.getSkus();
  if (success) {
    skus.value = data;
  } else {
    useSnackbar("获取数据失败");
  }

  loading.value = false;
};

const convertToString = (list: any) => {
  if (!Array.isArray(list)) {
    return "";
  }

  return list
    .map((item) => {
      if (item && typeof item.value !== "undefined") {
        return item.value;
      } else {
        return "";
      }
    })
    .join("/");
};

onMounted(async () => {
  await fetch();
});
</script>

<route lang="yaml">
meta:
  title: "商品库存"
  breadcrumb: 库存
</route>
