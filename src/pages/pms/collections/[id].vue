<template>
  <v-container>
    <v-form ref="form">
      <v-row>
        <v-col cols="12">
          <v-toolbar color="transparent">
            <AppBackBtn />
            <v-toolbar-title class="text-body-1 font-weight-bold">
              {{editItem.name}}
            </v-toolbar-title>

            <v-spacer />
            <v-btn variant="tonal" size="small" class="me-2" @click="cancel"
              >取消</v-btn
            >
            <v-btn
              variant="elevated"
              size="small"
              @click="update"
              :loading="loading"
              >更新</v-btn
            >
          </v-toolbar>
        </v-col>

        <v-col cols="12" md="8">
          <v-card>
            <v-card-text>
              <AppLabel> 标题 </AppLabel>
              <v-text-field
                placeholder="例如: 夏日系列，官方推荐"
                variant="solo-filled"
                flat
                :rules="nonEmptyRules"
                density="compact"
                v-model="editItem.name"
              >
              </v-text-field>
              <AppLabel class="mt-4"> 排序 </AppLabel>
              <v-text-field
                placeholder="0"
                variant="solo-filled"
                flat
                v-model.number="editItem.sort"
                type="number"
                min="0"
                step="1"
                density="compact"
              >
              </v-text-field>
              <AppLabel class="mt-4">详情</AppLabel>
              <div
                style="height: 200px"
                class="overflow-y-auto rounded-lg border"
              >
                <div v-html="editItem.description"></div>
              </div>
            </v-card-text>
          </v-card>

          <v-card class="mt-4">
            <v-toolbar color="transparent">
              <v-toolbar-title class="text-caption font-weight-bold"
                >产品</v-toolbar-title
              >
              <v-spacer />
            </v-toolbar>
            <v-divider />
            <v-select
              density="compact"
              class="ma-2"
              variant="solo-filled"
              flat
              item-title="name"
              item-value="id"
              return-object
              hide-details
              multiple
              :items="products"
              single-line
              v-model="editItem.products"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item.title }}</span>
                </v-chip>
                <span
                  v-if="index === 2"
                  class="text-grey text-caption align-self-center"
                >
                  (+{{ editItem.products.length - 2 }} 其他)
                </span>
              </template>
            </v-select>
            <v-divider />
            <v-card-text
              v-if="editItem.products && editItem.products.length > 0"
            >
              <v-list>
                <v-list-item v-for="(item, i) in editItem.products" :key="i">
                  <template v-slot:prepend>
                    <v-avatar class="rounded-lg border">
                      <v-img :src="item.banner" v-if="item.banner" />
                      <v-icon icon="mdi-image" v-else />
                    </v-avatar>
                  </template>
                  <v-list-item-title
                    class="text-caption font-weight-medium ms-2"
                  >
                    {{ item.name }}
                  </v-list-item-title>
                  <template v-slot:append>
                    <v-btn
                      icon="mdi-close"
                      size="small"
                      variant="text"
                      @click="removeProduct(i)"
                    ></v-btn>
                  </template>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
          <v-card class="mt-4">
            <v-card-text>
              <AppLabel>HANDLE</AppLabel>
              <v-text-field
                v-model="editItem.handle"
                readonly
                density="compact"
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
        <v-col cols="12" md="4">
          <v-card>
            <v-card-text>
              <AppLabel> 状态 </AppLabel>
              <v-radio-group
                inline
                color="indigo"
                hide-details
                v-model="editItem.published"
              >
                <v-radio :value="false">
                  <template v-slot:label>
                    <div class="text-caption font-weight-bold">草稿</div>
                  </template>
                </v-radio>
                <v-radio :value="true">
                  <template v-slot:label>
                    <div class="text-caption font-weight-bold">发布</div>
                  </template>
                </v-radio>
              </v-radio-group>
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
                  <UploadImage @change="onChangePic" />
                </v-col>
              </v-row>
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
import { Product } from "@/interfaces/product";

const form = ref();
const loading = ref(false);
const router = useRouter();
const route = useRoute();

const id = (route.params as { id: number }).id

const editItem = reactive<Collection>({
  id: 0,
  name: "",
  pic: "",
  description: "",
  sort: 0,
  published: true,
  handle: "",
  products: [],
});

const onChangePic = (e: string) => {
  editItem.pic = e;
};

const removeProduct = (i:number) => {
  editItem.products?.splice(i, 1);
};

const update = async () => {
  if (loading.value) return; // 如果正在加载，不执行保存操作
  loading.value = true;
  const { valid } = await form.value.validate();
  if (!valid) {
    loading.value = false;
    return;
  }

  if (editItem.products?.length == 0) return;
  const { success, data } = await BFSDK.updateCollectionItems(
    id,
    editItem.products ?? []
  );
  if (success) {
    useSnackbar("更新商品系列成功");
  } else {
    useSnackbar("更新商品系列失败");
  }

  loading.value = false;
};

const products = ref<Product[]>([]);

const cancel = () => {
  router.back();
};

onMounted(async () => {
  const { success, data } = await BFSDK.getCollection(id);
  if (!success) return;
  Object.assign(editItem, data);
  console.log(data);
  const res = await BFSDK.getProducts();
  if (!res.success) return;
  products.value = res.data;
});
</script>
