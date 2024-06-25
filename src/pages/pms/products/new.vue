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
              <v-text-field
                variant="solo-filled"
                flat
                density="comfortable"
                placeholder="裙子"
                label="商品名称"
                persistent-placeholder
                v-model="item.name"
                :rules="nonEmptyRules"
              ></v-text-field>
              <v-text-field
                class="mt-4"
                variant="solo-filled"
                flat
                density="comfortable"
                label="副标题"
                persistent-placeholder
                placeholder="PSN2026010101"
                v-model="item.subtitle"
              ></v-text-field>

              <v-text-field
                class="mt-4"
                variant="solo-filled"
                flat
                density="comfortable"
                label="描述"
                persistent-placeholder
                placeholder="PSN2026010101"
                v-model="item.description"
              ></v-text-field>
              <v-combobox
                placeholder="请输入关键词，回车键分隔"
                variant="solo-filled"
                flat
                chips
                multiple
                label="关键词"
                class="mt-4"
                density="comfortable"
                persistent-placeholder
                hide-details
                v-model="item.keywords"
              ></v-combobox>
              <v-text-field
                variant="solo-filled"
                flat
                class="mt-4"
                density="comfortable"
                label="商品号"
                placeholder="请输入商品号"
                persistent-placeholder
                v-model="item.productSn"
              ></v-text-field>

              <v-card flat>
                <v-toolbar density="compact" color="transparent" class="mt-2">
                  <AppLabel>商品详情</AppLabel>
                  <v-spacer />
                  <v-btn
                    icon="mdi-pencil"
                    size="x-small"
                    variant="elevated"
                    @click="editHtml = true"
                  />
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
                  <v-text-field
                    variant="solo-filled"
                    flat
                    density="compact"
                    prefix="¥"
                    suffix="元"
                    label="价格"
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
                    label="原始价格"
                    v-model.number="item.originalPrice"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
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
                    label="成本价格"
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
                hide-details
                density="compact"
                variant="solo-filled"
                flat
                label="状态"
                persistent-placeholder
                placeholder="请选择状态"
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
              <CategorySelect
                v-model:id="item.categoryId"
                v-model:name="item.categoryName"
              />

              <v-select
                class="mt-4"
                label="系列(collection)"
                placeholder="请选择商品系列"
                persistent-placeholder
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
              <v-select
                label="UI模版"
                placeholder="请选择UI模版"
                persistent-placeholder
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

  <v-dialog
    v-model="editHtml"
    transition="dialog-bottom-transition"
    max-width="800"
  >
    <v-card>
      <v-toolbar> </v-toolbar>
      <v-divider />
      <TiptapEditor v-model="item.detailHtml" />
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="indigo" size="small">取消</v-btn>
        <v-btn color="indigo" size="small">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
  categoryId: 0,
  categoryName: "",
  id: 0,
  name: "",
  banner: "",
  productSn: "",
  productType: "",
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

const editHtml = ref(false);
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
    copyItem.skus = skuRef.value.items;
  }

  // 处理价格YuanToFen
  copyItem.price = copyItem.price * 100;
  copyItem.costPrice = copyItem.costPrice * 100;
  copyItem.originalPrice = copyItem.originalPrice * 100;

  const { success } = await BFSDK.addProduct(copyItem);
  if (success) {
    useSnackbar("添加商品成功");
  } else {
    useSnackbar("添加商品失败");
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
