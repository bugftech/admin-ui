<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <v-toolbar color="transparent">
          <AppBackBtn />
          <v-toolbar-title class="text-body-1 font-weight-bold">
            创建品牌
          </v-toolbar-title>
          <v-spacer />
          <v-btn size="small" class="me-2" variant="tonal" @click="cancel"
            >取消</v-btn
          >
          <v-btn size="small" variant="elevated" @click="save">保存</v-btn>
        </v-toolbar>
      </v-col>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-text>
            <AppLabel> 标题 </AppLabel>
            <v-text-field
              placeholder="苹果"
              variant="solo-filled"
              flat
              :rules="nonEmptyRules"
              density="compact"
              v-model="editItem.name"
            />
            <AppLabel class="mt-4"> 首字母 </AppLabel>
            <v-text-field
              placeholder="A"
              variant="solo-filled"
              flat
              :rules="nonEmptyRules"
              density="compact"
              v-model="editItem.firstLetter"
            />

            <AppLabel class="mt-4"> 排序 </AppLabel>
            <v-text-field
              placeholder="A"
              variant="solo-filled"
              flat
              :rules="nonEmptyRules"
              density="compact"
              v-model.number="editItem.sort"
              type="number"
              step="1"
              min="0"
            />

            <AppLabel class="mt-4"> 品牌故事 </AppLabel>
            <v-textarea
              placeholder="A"
              variant="solo-filled"
              flat
              :rules="nonEmptyRules"
              density="compact"
              v-model="editItem.brandStory"
            />
          </v-card-text>
        </v-card>
        <v-card class="mt-4">
          <v-card-text>
            <AppLabel> LOGO </AppLabel>
            <UploadImage @change="onChangeLogo"></UploadImage>
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-text>
            <AppLabel> 横幅 </AppLabel>
            <UploadImage @change="onChangeBanner"></UploadImage>
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
import BFSDK from "@/api/sdk";
import { Brand } from "@/interfaces/brand";

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

const onChangeLogo = (e: string) => {
  editItem.logo = e;
};

const onChangeBanner = (e: string) => {
  editItem.banner = e;
};

const save = async () => {
  if (loading.value) return;
  loading.value =true
  const { success, data } = await BFSDK.addBrand(editItem);
  if (!success) {
    useSnackbar("添加品牌失败")
    loading.value =false
    return
  }

  useSnackbar("添加品牌成功")
  loading.value =false
};

const cancel = () => {};
</script>
