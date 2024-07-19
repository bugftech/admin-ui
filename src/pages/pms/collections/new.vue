<template>
  <v-toolbar density="comfortable">
    <v-toolbar-title>
      <AppBackBtn /> <span class="text-subtitle-2 ms-2">创建产品系列</span>
    </v-toolbar-title>

    <v-spacer />
    <v-btn variant="tonal" size="small" class="me-2" @click="cancel"
      >取消</v-btn
    >
    <v-btn
      variant="flat"
      size="small"
      @click="save"
      :loading="loading"
      color="indigo"
      >保存数据</v-btn
    >
  </v-toolbar>
  <v-divider />
  <v-container>
    <v-form ref="form">
      <v-row>
        <v-col cols="12" md="8">
          <v-card>
            <v-card-text>
              <v-text-field
                label="标题"
                placeholder="例如: 夏日系列，官方推荐"
                variant="solo-filled"
                flat
                :rules="nonEmptyRules"
                v-model="editItem.name"
                persistent-placeholder
                hide-details="auto"
              >
              </v-text-field>

              <v-text-field
                class="mt-4"
                label="排序"
                placeholder="0"
                variant="solo-filled"
                flat
                persistent-placeholder
                v-model.number="editItem.sort"
                type="number"
                min="0"
                step="1"
                hide-details="auto"
              >
              </v-text-field>

              <v-card flat class="border mt-3">
                <v-card-item>
                  <v-card-subtitle class="text-caption">详情</v-card-subtitle>
                </v-card-item>
                <RichEditor v-model="editItem.description" />
              </v-card>
            </v-card-text>
          </v-card>

          <v-card class="mt-4">
            <v-card-title class="text-caption">产品系列类型</v-card-title>
            <v-list-item>
              <template v-slot:prepend>
                <v-list-item-actions start>
                  <v-checkbox-btn readonly :model-value="true"></v-checkbox-btn>
                </v-list-item-actions>
              </template>
              <v-list-item-title class="text-caption font-weight-medium">
                手动
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption">
                手动将产品添加到此系列中。
              </v-list-item-subtitle>
            </v-list-item>
            <v-card-text>
              <v-select
                variant="solo-filled"
                flat
                multiple
                hide-details="auto"
                label="商品列表"
                placeholder="选择适应的商品"
                persistent-placeholder
                :items="products"
                v-model="editItem.products"
                item-value="id"
                chips
                item-title="name"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item v-bind="props">
                    <template v-slot:title>
                      <div class="text-caption">{{ item.raw.name }}</div>
                    </template>
                  </v-list-item>
                </template>
              </v-select>
            </v-card-text>
          </v-card>
          <v-card class="mt-4">
            <v-card-title class="text-caption">图片</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6" v-if="editItem.pic">
                  <v-sheet
                    class="border rounded-lg overflow-hidden"
                    height="100px"
                    style="position: relative"
                  >
                    <v-img
                      :src="editItem.pic"
                      cover
                      style="top: 0; left: 0; position: absolute; right: 0"
                    ></v-img>
                    <div class="d-flex">
                      <v-spacer />
                      <v-btn
                        icon="mdi-close"
                        size="x-small"
                        variant="flat"
                        @click="editItem.pic = ''"
                        color="orange-accent-2"
                      ></v-btn>
                    </div>
                  </v-sheet>
                </v-col>
                <v-col cols="12" :md="editItem.pic ? 6 : 12">
                  <UploadImage v-model="editItem.pic" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-text>
              <v-select
                v-model="editItem.published"
                label="状态"
                placerholder="选择系列是否发布"
                persistent-placeholder
                variant="solo-filled"
                flat
                :items="publishedOptions"
                item-value="value"
                item-title="title"
                hide-details="auto"
              >
              </v-select>
            </v-card-text>
          </v-card>
          <v-card class="mt-4">
            <v-card-text>
              <v-text-field
                label="handle"
                persistent-placeholder
                v-model="editItem.handle"
                readonly
                variant="solo-filled"
                flat
                :placeholder="
                  'https://api.bugfreed.com/pms/collections/' + editItem.name
                "
              >
              </v-text-field>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { Collection } from "@/interfaces/collection";
import { nonEmptyRules } from "@/composables/formRules";
import BFSDK from "@/api/sdk";
import bugfreed from "@/sdk";
import { PMS } from "@/sdk/pms/pms";
import { Product } from "@/sdk/pms/product/types";

const form = ref();
const loading = ref(false);
const router = useRouter();

const products = ref<Product[]>([]);

const pms = new PMS({ bugfreed });
const defaultItem: Collection = {
  id: 0,
  name: "",
  pic: "",
  description: "",
  sort: 0,
  published: true,
  handle: "",
  products: [],
};

let editItem = reactive<Collection>({ ...defaultItem });

const save = async () => {
  if (loading.value) return; // 如果正在加载，不执行保存操作
  loading.value = true;
  const { valid } = await form.value.validate();
  if (!valid) {
    loading.value = false;
    return;
  }

  const { success, data } = await BFSDK.addCollection(editItem);
  if (success) {
    useSnackbar("添加商品系列成功");
    router.push({
      name: "/pms/collections/[id]",
      params: { id: data.id ? data.id : 0 },
    });
  } else {
    useSnackbar("添加商品系列失败");
  }

  loading.value = false;
};

const clear = () => {
  Object.assign(editItem, defaultItem);
};

const publishedOptions = [
  {
    title: "草稿",
    value: false,
  },
  {
    title: "发布",
    value: true,
  },
];

const fetchProducts = async () => {
  const { success, data } = await pms.product().list();
  if (success) products.value = data;
};

const cancel = () => {
  clear();
  router.back();
};

onMounted(() => {
  Promise.all([fetchProducts()]);
});
</script>
