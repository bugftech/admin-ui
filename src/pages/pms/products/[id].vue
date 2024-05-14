<template>
  <v-container>
    <v-form ref="form">
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-toolbar color="transparent">
            <AppBackBtn />
            <v-toolbar-title class="text-body-1 font-weight-bold">
              商品 #<span>{{ id }}</span>
            </v-toolbar-title>

            <v-spacer />
            <v-btn
              size="small"
              class="me-2"
              variant="elevated"
              prepend-icon="mdi-cancel"
              @click="cancel"
              >取消</v-btn
            >
            <v-btn
              size="small"
              variant="elevated"
              prepend-icon="mdi-check-all"
              @click="save"
              >保存</v-btn
            >
          </v-toolbar>
        </v-col>
        <v-col cols="12" md="8">
          <v-card>
            <v-card-text>
              <AppLabel>商品名称</AppLabel>
              <v-text-field
                variant="solo-filled"
                flat
                :rules="nonEmptyRules"
                density="compact"
                placeholder="裙子"
                v-model="item.name"
              ></v-text-field>
              <AppLabel class="mt-4">副标题</AppLabel>
              <v-text-field
                variant="solo-filled"
                flat
                density="compact"
                placeholder="产品副标题"
                v-model="item.subtitle"
              ></v-text-field>

              <AppLabel class="mt-4">描述</AppLabel>
              <v-text-field
                variant="solo-filled"
                flat
                density="compact"
                placeholder="PSN2026010101"
                v-model="item.description"
              ></v-text-field>

              <AppLabel class="mt-4">输入商品号</AppLabel>
              <v-text-field
                variant="solo-filled"
                flat
                density="compact"
                placeholder="PSN2026010101"
                v-model="item.productSn"
              ></v-text-field>

              <v-card flat>
                <v-toolbar density="compact" color="transparent" class="mt-1">
                  <AppLabel>商品详情</AppLabel>
                  <v-spacer />
                  <v-btn
                    icon="mdi-pencil-circle"
                    @click="onEditHtml(item.id)"
                  ></v-btn>
                </v-toolbar>
                <v-card-text style="height: 200px" class="overflow-y-auto">
                  <div v-html="item.detailHtml"></div>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>

          <v-card class="mt-4">
            <v-toolbar color="transparent" density="compact">
              <v-toolbar-title class="text-subtitle-2 font-weight-bold">
                定价
              </v-toolbar-title>
            </v-toolbar>
            <v-divider />
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <AppLabel>价格</AppLabel>
                  <v-text-field
                    variant="solo-filled"
                    flat
                    density="compact"
                    prefix="¥"
                    suffix="元"
                    :rules="nonEmptyRules"
                    class="text-caption"
                    persistent-placeholder
                    v-model.number="item.price"
                    min="0.00"
                    step="0.01"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <AppLabel>原始价格</AppLabel>
                  <v-text-field
                    variant="solo-filled"
                    flat
                    density="compact"
                    prefix="¥"
                    suffix="元"
                    :rules="nonEmptyRules"
                    persistent-placeholder
                    min="0.00"
                    step="0.01"
                    type="number"
                    v-model.number="item.originalPrice"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <AppLabel>成本价格</AppLabel>
                  <v-text-field
                    variant="solo-filled"
                    flat
                    density="compact"
                    prefix="¥"
                    :rules="nonEmptyRules"
                    suffix="元"
                    persistent-placeholder
                    min="0.00"
                    step="0.01"
                    type="number"
                    v-model.number="item.costPrice"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card class="mt-4">
            <v-card-text>
              <AppLabel>横幅</AppLabel>
              <v-row>
                <v-col cols="12" md="6" v-if="item.banner">
                  <v-sheet
                    class="border rounded-lg overflow-hidden"
                    height="100px"
                    style="position: relative"
                  >
                    <v-img
                      :src="item.banner"
                      cover
                      style="top: 0; left: 0; position: absolute; right: 0"
                    ></v-img>
                    <div class="d-flex">
                      <v-spacer />
                      <v-btn
                        icon="mdi-close"
                        size="x-small"
                        variant="flat"
                        @click="item.banner = ''"
                        color="orange-accent-2"
                      ></v-btn>
                    </div>
                  </v-sheet>
                </v-col>
                <v-col cols="12" :md="item.banner ? 6 : 12">
                  <UploadImage @change="onChangeBanner" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <ProductAlbumPics v-model="item.albumPics" class="mt-4" />
          <ProductUpsertSku :skus="item.skus" ref="skuRef" />
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-text>
              <AppLabel>状态</AppLabel>
              <v-select
                hide-details
                density="compact"
                variant="solo-filled"
                flat
                v-model="item.published"
                :items="publishedOptions"
              >
              </v-select>
            </v-card-text>
          </v-card>

          <v-card class="mt-4">
            <v-toolbar color="transparent" density="compact">
              <v-toolbar-title class="text-caption font-weight-bold">
                产品归纳
              </v-toolbar-title>
            </v-toolbar>
            <v-divider />
            <v-card-text>
              <AppLabel>分类</AppLabel>
              <CategorySelect
                v-model:id="item.categoryId"
                v-model:name="item.categoryName"
                :parentId="0"
              />

              <AppLabel class="mt-4">系列(collection)</AppLabel>
              <v-select
                hide-details
                density="compact"
                variant="solo-filled"
                flat
                :items="[]"
              >
              </v-select>
            </v-card-text>
          </v-card>

          <v-card class="mt-4">
            <v-toolbar color="transparent" density="compact">
              <v-toolbar-title class="text-caption font-weight-bold">
                发货信息
              </v-toolbar-title>
            </v-toolbar>
            <v-divider />
            <v-card-text>
              <ProductUnitSelect v-model="item.unit" />
              <ProductWeightSelect v-model="item.weight" />
            </v-card-text>
          </v-card>

          <v-card class="mt-4">
            <v-card-text>
              <AppLabel>UI模版</AppLabel>
              <v-select
                hide-details
                variant="solo-filled"
                flat
                density="compact"
                :items="[]"
              >
              </v-select>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import BFSDK from "@/api/sdk";
import { ProductAndSku } from "@/interfaces/product";
import { nonEmptyRules } from "@/composables/formRules";

const route = useRoute();
const router = useRouter();
const id = (route.params as { id: string }).id;

const defaultProduct: ProductAndSku = {
  tenantId: 0,
  brandId: 0,
  brandName: "",
  categoryId: 0,
  categoryName: "",
  id: 0,
  productType: "",
  name: "",
  banner: "",
  productSn: "",
  published: false,
  newArrvial: false,
  recommand: false,
  sort: 0,
  sale: 0,
  price: 0,
  originalPrice: 0,
  costPrice: 0,
  subtitle: "",
  description: "",
  stock: 0,
  lowStock: 0,
  unit: "",
  weight: "",
  preview: false,
  serviceIds: "",
  keywords: [],
  note: "",
  albumPics: [],
  detailTitle: "",
  detailDesc: "",
  detailHtml: "",
  skus: [],
};

// 现在 defaultProduct 对象包含了所有字段，并且每个字段都有默认值。

const item = ref<ProductAndSku>(defaultProduct);

interface PublishedOption {
  title: string;
  value: boolean;
}

const publishedOptions: PublishedOption[] = [
  {
    title: "草稿",
    value: false,
  },
  {
    title: "发布",
    value: true,
  },
];

const onChangeBanner = (e: string) => {
  item.value.banner = e;
};

const onEditHtml = (productId: number) => {
  router.push({ path: "/editor", query: { productId: productId } });
};

onMounted(async () => {
  const intId = parseInt(id);
  const { data, success } = await BFSDK.getProduct(intId, true);
  if (success) {
    data.albumPics = data.albumPics ? data.albumPics : [];
    data.price = data.price / 100;
    data.originalPrice = data.originalPrice / 100;
    data.costPrice = data.costPrice / 100;
    Object.assign(item.value, data);
  }
});

const skuRef = ref();
const form = ref();
const save = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;
  let copyItem = item.value;
  if (skuRef.value.items) {
    copyItem.skus = skuRef.value.items;
    copyItem.price = copyItem.price * 100;
    copyItem.originalPrice = copyItem.originalPrice * 100;
    copyItem.costPrice = copyItem.costPrice * 100;
  }
  const { success, data } = await BFSDK.updateProduct(id, copyItem);
  if (success) {
    console.log(data);
  }
};

const cancel = () => {
  router.back();
};
</script>

<route lang="yaml">
meta:
  title: "查看商品"
  breadcrumb: 查看
</route>
