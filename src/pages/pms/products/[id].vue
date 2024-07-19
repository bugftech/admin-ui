<template>
  <v-toolbar density="comfortable" theme="transparent">
    <v-toolbar-title class="text-subtitle-2 font-weight-bold">
      <AppBackBtn /> <span class="ms-1">编辑 {{ item.name }}</span>
    </v-toolbar-title>

    <v-spacer />
    <v-btn
      size="small"
      class="me-2"
      variant="tonal"
      rounded="lg"
      prepend-icon="mdi-cancel"
      @click="cancel"
      >取消</v-btn
    >
    <v-btn
      size="small"
      rounded="lg"
      variant="flat"
      color="indigo"
      prepend-icon="mdi-check-all"
      @click="save"
      >更新商品</v-btn
    >
  </v-toolbar>
  <v-divider />
  <v-container>
    <v-form ref="form">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-text>
              <v-text-field
                v-model="item.name"
                :rules="nonEmptyRules"
                density="comfortable"
                placeholder="裙子"
                label="名称(必须)"
                hint="商品名称"
                variant="solo-filled"
                flat
                persistent-hint
                persistent-placeholder
              ></v-text-field>

              <v-text-field
                v-model="item.subtitle"
                density="comfortable"
                placeholder="裙子"
                label="副标题"
                hint="副标题提供更多的商品概要描述"
                variant="solo-filled"
                flat
                persistent-hint
                persistent-placeholder
                class="mt-4"
              ></v-text-field>

              <v-combobox
                class="mt-4"
                placeholder="服装,男装"
                variant="solo-filled"
                flat
                chips
                multiple
                density="comfortable"
                label="商品关键字"
                v-model="item.keywords"
                hint="商品关键字"
                persistent-hint
                persistent-placeholder
              ></v-combobox>

              <v-text-field
                v-model="item.productSn"
                density="comfortable"
                placeholder="P20240511001"
                label="商品号"
                hint="商品号为商品对外的唯一标识符号"
                variant="solo-filled"
                flat
                persistent-hint
                persistent-placeholder
                class="mt-4"
              ></v-text-field>

              <v-card class="mt-4 border" flat>
                <v-toolbar density="compact" color="transparent">
                  <v-toolbar-title class="text-caption"
                    >商品详情</v-toolbar-title
                  >
                </v-toolbar>
                <v-divider />
                <RichEditor v-model="item.detailHtml" />
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
              <v-row dense>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model.number="item.price"
                    :rules="nonEmptyRules"
                    persistent-placeholder
                    prefix="¥"
                    suffix="/元"
                    min="0.00"
                    step="0.01"
                    type="number"
                    density="comfortable"
                    placeholder="P20240511001"
                    label="销售价格"
                    hint="商品号为商品对外的唯一标识符号"
                    variant="solo-filled"
                    flat
                    persistent-hint
                    class="mt-4"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :rules="nonEmptyRules"
                    v-model.number="item.originalPrice"
                    persistent-placeholder
                    prefix="¥"
                    suffix="/元"
                    min="0.00"
                    step="0.01"
                    type="number"
                    density="comfortable"
                    placeholder="P20240511001"
                    label="市场价"
                    hint="商品号为商品对外的唯一标识符号"
                    variant="solo-filled"
                    flat
                    persistent-hint
                    class="mt-4"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :rules="nonEmptyRules"
                    v-model.number="item.costPrice"
                    persistent-placeholder
                    prefix="¥"
                    suffix="/元"
                    min="0.00"
                    step="0.01"
                    type="number"
                    density="comfortable"
                    placeholder="P20240511001"
                    label="成本价格"
                    hint="商品号为商品对外的唯一标识符号"
                    variant="solo-filled"
                    flat
                    persistent-hint
                    class="mt-4"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card class="mt-4">
            <v-card-title class="text-subtitle-2 font-weight-bold">
              库存
            </v-card-title>
            <v-divider />
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model.number="item.stock"
                    :rules="nonEmptyRules"
                    persistent-placeholder
                    suffix="/件"
                    min="0"
                    step="1"
                    type="number"
                    density="comfortable"
                    placeholder="请输入产品库存"
                    label="产品库存"
                    hint="如果存在变体SKU，此库存将会失效。"
                    variant="solo-filled"
                    flat
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model.number="item.lowStock"
                    :rules="nonEmptyRules"
                    persistent-placeholder
                    suffix="/件"
                    min="0"
                    step="1"
                    type="number"
                    density="comfortable"
                    placeholder="告警库存阈值"
                    label="告警库存阈值"
                    hint="如果存在变体SKU，此告警阈值将会失效。"
                    variant="solo-filled"
                    flat
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model.number="item.lowStock"
                    :rules="nonEmptyRules"
                    persistent-placeholder
                    suffix="/件"
                    min="0"
                    step="1"
                    type="number"
                    density="comfortable"
                    placeholder="销售的库存"
                    label="销售的库存"
                    hint="如果存在变体SKU，此销售的库存将会失效。"
                    variant="solo-filled"
                    flat
                    persistent-hint
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
                  <UploadImage v-model="item.banner" />
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
              <v-select
                v-model="item.published"
                :items="publishedOptions"
                label="状态"
                placeholder="系列(collection)"
                hint="草稿的状态，用户无法看到商品。"
                density="comfortable"
                variant="solo-filled"
                flat
                persistent-hint
                persistent-placeholder
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
              <CategorySelect
                v-model:id="item.categoryId"
                v-model:name="item.categoryName"
                :parentId="0"
              />

              <v-select
                :items="[]"
                label="系列(collection)"
                placeholder="系列(collection)"
                hint="请输入商品系列名称，如“经典系列”或“限量版系列”。"
                density="comfortable"
                variant="solo-filled"
                flat
                persistent-hint
                persistent-placeholder
                class="mt-4"
              >
              </v-select>
            </v-card-text>
          </v-card>
          <v-card class="mt-4">
            <v-card-text>
              <v-select
                density="comfortable"
                variant="solo-filled"
                flat
                label="产品类型"
                hint="不同的产品类型对应的不同的行为，请确保你的产品类型符合"
                persistent-hint
                persistent-placeholder
                placeholder="选择分类"
                v-model="item.productType"
                :items="productTypes"
                item-title="title"
                item-value="value"
              >
              </v-select>
            </v-card-text>
          </v-card>
          <v-card class="mt-4" v-if="item.productType === 'physical'">
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
        </v-col>
      </v-row>
    </v-form>
  </v-container>

  <v-dialog
    fullscreen
    v-model="editHtmlDialog"
    transition="dialog-bottom-transition"
  >
    <v-card rounded="0">
      <v-toolbar color="indigo">
        <v-btn icon="mdi-close" @click="editHtmlDialog = false"></v-btn>
        <v-toolbar-title class="text-subtitle-1 font-weight-bold">
          编辑商品富文本
        </v-toolbar-title>
      </v-toolbar>
      <v-divider />
      <v-card-text class="pa-0">
        <RichEditor v-model="item.detailHtml" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { nonEmptyRules } from "@/composables/formRules";
import { ProductService } from "@/sdk/pms/product/product";
import bugfreed from "@/sdk";
import { ProductAndSku } from "@/sdk/pms/product/types";

const route = useRoute();
const router = useRouter();
const id = (route.params as { id: string }).id;
const editHtmlDialog = ref(false);
const product = new ProductService({ bugfreed });

const productTypes: any[] = [
  {
    title: "虚拟商品",
    value: "digital",
  },
  {
    title: "物理商品",
    value: "physical",
  },
  {
    title: "服务商品",
    value: "services",
  },
  {
    title: "捆绑商品",
    value: "bundles",
  },
  {
    title: "订阅产品",
    value: "subscriptions",
  },
];

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
  const { data, success } = await product.get(intId, true);
  if (success) {
    data.albumPics = data.albumPics ? data.albumPics : [];
    data.price = data.price / 100;
    data.originalPrice = data.originalPrice / 100;
    data.costPrice = data.costPrice / 100;
    Object.assign(item.value, data);
    route.meta.title = "编辑商品" + data.name;
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

  const intId = parseInt(id);
  const { success } = await product.update(intId, copyItem);
  if (success) {
    useSnackbar("更新商品成功");
    const intId = parseInt(id);
    const { data, success } = await product.get(intId, true);
    if (success) {
      data.albumPics = data.albumPics ? data.albumPics : [];
      data.price = data.price / 100;
      data.originalPrice = data.originalPrice / 100;
      data.costPrice = data.costPrice / 100;
      Object.assign(item.value, data);
    }
  } else {
    useSnackbar("更新商品失败");
  }
};

const cancel = () => {
  router.back();
};
</script>

<route lang="yaml">
meta:
  title: "编辑商品"
  breadcrumb: "编辑商品"
</route>
