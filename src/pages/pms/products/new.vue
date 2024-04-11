<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <v-toolbar color="transparent">
          <AppBackBtn />
          <v-toolbar-title class="text-body-1 font-weight-bold">
            创建商品
          </v-toolbar-title>
          <v-spacer />
          <v-btn size="small" class="me-2" variant="tonal" @click="cancel"
            >取消</v-btn
          >
          <v-btn size="small" variant="elevated" @click="save">保存</v-btn>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-form ref="form">
      <v-row justify="center">
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
                placeholder="PSN2026010101"
                v-model="item.subTitle"
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
                    icon="mdi-pencil"
                    size="small"
                    @click="onEditHtml(item.id)"
                  ></v-btn>
                </v-toolbar>
                <v-card-text
                  style="height: 200px"
                  class="overflow-y-auto border rounded-lg"
                >
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
          <ProductUpsertSku :skus="item.skuStockList" ref="skuRef" />
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
                v-model="item.isPublished"
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
                v-model:id="item.productCategoryId"
                v-model:name="item.productCategoryName"
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
import BFSDK from "@/api/sdk";
import { ProductAndSku } from "@/interfaces/product";
import { nonEmptyRules } from "@/composables/formRules";

const router = useRouter();

const defaultProduct: ProductAndSku = {
  tenantId: 0,
  brandId: 0,
  brandName: "",
  productCategoryId: 0,
  productCategoryName: "",
  productAttributeCategoryId: 0,
  productAttributeCategoryValues: [],
  id: 0,
  name: "",
  banner: "",
  productSn: "",
  isDeleted: false,
  isPublished: false,
  isNew: false,
  isRecommand: false,
  isVerified: false,
  sort: 0,
  sale: 0,
  price: 0,
  promotionPrice: 0,
  originalPrice: 0,
  costPrice: 0,
  giftGrowth: 0,
  giftPoint: 0,
  usePointLimit: 0,
  subTitle: "",
  description: "",
  stock: 0,
  lowStock: 0,
  unit: "",
  weight: "",
  isPreview: false,
  serviceIds: "",
  keywords: "",
  note: "",
  albumPics: [],
  detailTitle: "",
  detailDesc: "",
  detailHtml: "",
  promotionPerLimit: 0,
  promotionType: 0,
  skuStockList: [],
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

const skuRef = ref();
const form = ref();
const save = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;
  let copyItem = item.value;
  if (skuRef.value.items) {
    copyItem.skuStockList = skuRef.value.items;
  }

  // 处理价格YuanToFen
  copyItem.price = copyItem.price * 100
  copyItem.costPrice = copyItem.costPrice * 100
  copyItem.originalPrice = copyItem.originalPrice * 100

  const { success } = await BFSDK.addProduct(copyItem);
  if (success) {
    useSnackbar("添加商品成功")
  } else {
    useSnackbar("添加商品失败")
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
