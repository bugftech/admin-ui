<template>
  <v-container>
    <v-form ref="form">
      <v-row>
        <v-col cols="12">
          <v-toolbar color="transparent">
            <AppBackBtn />
            <v-toolbar-title class="text-body-1 font-weight-bold">
              创建产品系列
            </v-toolbar-title>

            <v-spacer />
            <v-btn variant="tonal" size="small" class="me-2" @click="cancel"
              >取消</v-btn
            >
            <v-btn
              variant="elevated"
              size="small"
              @click="save"
              :loading="loading"
              >确定</v-btn
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
            <v-card-title class="text-caption">产品系列类型</v-card-title>
            <v-card-text class="px-0">
              <v-list-item>
                <template v-slot:prepend>
                  <v-checkbox-btn readonly :model-value="true"></v-checkbox-btn>
                </template>
                <v-list-item-title class="text-caption font-weight-medium">
                  手动
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  手动将产品添加到此系列中。
                </v-list-item-subtitle>
              </v-list-item>
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

const form = ref();
const loading = ref(false);
const router = useRouter();
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

const onChangePic = (e: string) => {
  editItem.pic = e;
};

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
      params: {id: data.id ? data.id : 0 },
    });
  } else {
    useSnackbar("添加商品系列失败");
  }

  loading.value = false;
};

const clear = () => {
  Object.assign(editItem, defaultItem);
};

const cancel = () => {
  clear();
  router.back();
};
</script>
