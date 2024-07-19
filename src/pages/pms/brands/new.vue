<template>
  <v-toolbar density="comfortable" class="me-4">
    <v-toolbar-title>
      <AppBackBtn /><span class="text-subtitle-2 ms-1"> 添加品牌</span>
    </v-toolbar-title>
    <v-spacer />
    <v-btn size="small" class="me-2" variant="tonal" @click="cancel"
      >取消</v-btn
    >
    <v-btn size="small" variant="flat" @click="save" color="indigo">保存数据</v-btn>
  </v-toolbar>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                placeholder="苹果"
                label="品牌名称"
                persistent-placeholder
                variant="solo-filled"
                flat
                :rules="nonEmptyRules"
                density="comfortable"
                v-model="editItem.name"
              />
              <v-text-field
                label="品牌首字母"
                class="mt-3"
                persistent-placeholder
                placeholder="A"
                variant="solo-filled"
                flat
                :rules="nonEmptyRules"
                density="comfortable"
                v-model="editItem.firstLetter"
              />

              <v-text-field
                label="排序"
                class="mt-3"
                persistent-placeholder
                placeholder="A"
                variant="solo-filled"
                flat
                :rules="nonEmptyRules"
                density="comfortable"
                v-model.number="editItem.sort"
                type="number"
                step="1"
                min="0"
              />

              <v-card class="mt-3 border elevation-0" variant="text">
                <v-toolbar color="transparent">
                  <v-toolbar-title class="text-caption"
                    >品牌故事</v-toolbar-title
                  >
                  <v-spacer />
                </v-toolbar>
                <v-divider />
                <RichEditor v-model="editItem.brandStory" />
              </v-card>
            </v-form>
          </v-card-text>
        </v-card>
        <v-card class="mt-4">
          <v-card-text>
            <AppLabel> LOGO </AppLabel>
            <v-row>
              <v-col cols="12" md="6" v-if="editItem.logo">
                <v-sheet
                  class="border rounded-lg overflow-hidden"
                  height="100px"
                  style="position: relative"
                >
                  <v-img
                    :src="editItem.logo"
                    cover
                    style="top: 0; left: 0; position: absolute; right: 0"
                  ></v-img>
                  <div class="d-flex">
                    <v-spacer />
                    <v-btn
                      icon="mdi-close"
                      size="x-small"
                      variant="flat"
                      @click="editItem.logo = ''"
                      color="orange-accent-2"
                    ></v-btn>
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12" :md="editItem.logo ? 6 : 12">
                <UploadImage v-model="editItem.logo" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-text>
            <AppLabel> 横幅 </AppLabel>
            <v-row>
              <v-col cols="12" md="6" v-if="editItem.banner">
                <v-sheet
                  class="border rounded-lg overflow-hidden"
                  height="100px"
                  style="position: relative"
                >
                  <v-img
                    :src="editItem.banner"
                    cover
                    style="top: 0; left: 0; position: absolute; right: 0"
                  ></v-img>
                  <div class="d-flex">
                    <v-spacer />
                    <v-btn
                      icon="mdi-close"
                      size="x-small"
                      variant="flat"
                      @click="editItem.banner = ''"
                      color="orange-accent-2"
                    ></v-btn>
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12" :md="editItem.banner ? 6 : 12">
                <UploadImage v-model="editItem.banner" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="text-caption"> 额外信息 </v-card-title>
          <v-card-text>
            <v-checkbox
              v-model="editItem.factoryMade"
              hide-details
              density="compact"
            >
              <template v-slot:label>
                <div class="text-caption ml-2">品牌制造商</div>
              </template>
            </v-checkbox>
            <v-checkbox
              v-model="editItem.visiable"
              density="compact"
              hint="注意：隐藏品牌时，将无法在应用程序看到此品牌"
              persistent-hint
            >
              <template v-slot:label>
                <div class="text-caption ml-2">用户可以看到此品牌</div>
              </template>
            </v-checkbox>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { nonEmptyRules } from "@/composables/formRules";
import { Brand } from "@/sdk/pms/brand/types";
import bugfreed from "@/sdk";
import { PMS } from "@/sdk/pms/pms";
const pms = new PMS({ bugfreed });

const defaultItem: Brand = {
  id: 0,
  uid: "",
  name: "",
  firstLetter: "",
  sort: 0,
  factoryMade: false,
  visiable: false,
  productCount: 0,
  productCommentCount: 0,
  logo: "",
  banner: "",
  brandStory: "",
};

const loading = ref(false);

let editItem = reactive<Brand>({ ...defaultItem });
const form = ref();

const save = async () => {
  const { valid } = await form.value.validate();
  if (loading.value || !valid) return;
  loading.value = true;
  const { success } = await pms.brand().create(editItem);
  if (!success) {
    useSnackbar("添加品牌失败");
    loading.value = false;
    return;
  }

  useSnackbar("添加品牌成功");
  loading.value = false;
};

const cancel = () => {
  Object.assign(editItem, defaultItem);
};
</script>
