<template>
  <v-card rounded="0" flat>
    <v-toolbar>
      <v-toolbar-title class="text-caption font-weight-bold"
        >在线商店</v-toolbar-title
      >
      <v-spacer />
      <v-app-bar-nav-icon>
        <v-icon>mdi-cart</v-icon>
      </v-app-bar-nav-icon>
    </v-toolbar>
    <v-alert
      class="text-caption"
      text="在线商品仅为渲染商品样式测试。尚不开放独立站点部署以及线上支付"
      color="red"
      rounded="0"
      icon="mdi-ab-testing"
    />
    <v-container>
      <v-row>
        <v-col cols="12">
          <div
            class="text-caption font-weight-bold d-flex justify-space-between mb-4 align-center"
          >
            <div class="text-truncate">商品分类</div>
          </div>
          <v-slide-group
            v-model="cateTab"
            selected-class="bg-primary"
            show-arrows
          >
            <v-slide-group-item
              v-for="(cate, i) in categories"
              :key="i + 1"
              v-slot="{ isSelected, toggle }"
            >
              <v-btn
                :color="isSelected ? 'indigo' : undefined"
                class="ma-2"
                rounded
                variant="flat"
                size="small"
                @click="toggle"
              >
                {{ cate.name }}
              </v-btn>
            </v-slide-group-item>
          </v-slide-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div
            class="text-caption font-weight-bold d-flex justify-space-between mb-4 align-center"
          >
            <div class="text-truncate">商品列表</div>
          </div>
          <v-data-iterator :items="products" :items-per-page="100">
            <template v-slot:default="{ items }">
              <v-row>
                <v-col
                  v-for="(item, i) in items"
                  :key="i"
                  cols="12"
                  sm="6"
                  xl="3"
                  md="4"
                >
                  <v-sheet border class="rounded-lg">
                    <v-list-item
                      :title="item.raw.name"
                      density="comfortable"
                      lines="two"
                      :subtitle="item.raw.subtitle"
                    >
                      <template v-slot:title>
                        <div class="text-subtitle-2 d-flex align-center">
                          {{ item.raw.name }}
                          <v-chip
                            variant="tonal"
                            color="green"
                            size="x-small"
                            class="ml-2"
                            v-if="item.raw.keywords"
                            >{{ item.raw.keywords.join("/") }}
                          </v-chip>
                        </div>
                      </template>
                      <template v-slot:subtitle>
                        <div class="text-caption mt-2">
                          {{ item.raw.subtitle }}
                        </div>
                      </template>
                      <template v-slot:prepend>
                        <v-avatar size="64">
                          <v-img
                            :src="item.raw.banner"
                            contain
                          ></v-img>
                        </v-avatar>
                      </template>
                    </v-list-item>
                    <v-list-item>
                      <template v-slot:prepend>
                        <div class="text-caption">销售价格：</div>
                      </template>
                      <template v-slot:append>
                        <div
                          class="text-subtitle-2 font-weight-bold text-indigo"
                        >
                          ¥ {{ item.raw.price / 100 }} 元
                        </div>
                      </template>
                    </v-list-item>

                    <div class="d-flex pa-2">
                      <v-btn
                        size="small"
                        block
                        rounded="pill"
                        variant="tonal"
                        color="indigo"
                        @click="viewProduct(i)"
                        >查看商品</v-btn
                      >
                    </div>
                  </v-sheet>
                </v-col></v-row
              >
            </template>
          </v-data-iterator>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <v-navigation-drawer
    location="right"
    floating
    v-model="drawer"
    permanent
    class="elevation-1"
    color="#f5f5f5"
    width="300"
  >
    <div v-if="product">
      <v-sheet>
        <v-toolbar>
          <v-btn prepend-icon="mdi-close" size="small" @click="drawer = false"
            >关闭</v-btn
          >
        </v-toolbar>
        <v-carousel
          height="200"
          show-arrows="hover"
          cycle
          hide-delimiter-background
        >
          <v-carousel-item v-for="(slide, i) in product.albumPics" :key="i">
            <v-img :src="slide" cover aspect-ratio="16/9" />
          </v-carousel-item>
        </v-carousel>
        <v-list-item>
          <template v-slot:prepend>
            <div class="text-subtitle-2">¥ {{ product.price / 100 }}元</div>
          </template>
          <template v-slot:append>
            <v-btn size="x-small" variant="tonal">立即购买</v-btn>
          </template>
        </v-list-item>
      </v-sheet>
      <div v-html="product.detailHtml" class="mt-4"></div>
    </div>
    <template v-slot:append>
      <v-sheet class="pa-4">
        <v-btn size="small" block rounded="pill" variant="flat" color="indigo"
          >加入购物车</v-btn
        >
      </v-sheet>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import bugfreed from "@/sdk";
import { Category } from "@/sdk/pms/category/types";
import { PMS } from "@/sdk/pms/pms";
import { Product } from "@/sdk/pms/product/types";

const pms = new PMS({ bugfreed });
const drawer = ref(false);
const products = ref<Product[]>([]);
const categories = ref<Category[]>([]);
const cateTab = ref(0);

const fetchFirstCategory = async () => {
  const { success, data } = await pms.category().list();
  if (success) categories.value = data;
};

const productIndex = ref<number>(-1);
const fetchProduct = async () => {
  const { success, data } = await pms.product().list();
  if (success) products.value = data;
};

const viewProduct = (idx: number) => {
  productIndex.value = idx;
  drawer.value = true;
};

const product = computed(() => {
  if (productIndex.value === -1) return;
  return products.value[productIndex.value];
});

onMounted(() => {
  Promise.all([fetchFirstCategory(), fetchProduct()]);
});
</script>

<route lang="yaml">
meta:
  title: "预览商店"
  breadcrumb: "预览商店"
</route>
