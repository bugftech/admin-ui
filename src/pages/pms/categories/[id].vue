<template>
  <v-container>
    <v-form ref="form">
      <v-row>
        <v-col cols="12">
          <v-toolbar color="transparent">
            <AppBackBtn />
            <v-toolbar-title class="text-body-1 font-weight-bold">
              创建产品分类
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
              >确定</v-btn
            >
          </v-toolbar>
        </v-col>
        <v-col cols="12" md="7">
          <v-card>
            <v-card-text>
              <v-text-field
                :rules="nonEmptyRules"
                v-model="editItem.name"
                variant="solo-filled"
                flat
                label="名称"
                placeholder="分类名称"
                persistent-hint
                persistent-placeholder
                hint="分类名称"
                density="comfortable"
              >
              </v-text-field>

              <AppLabel class="mt-4">父级分类</AppLabel>

              <CategorySelect
                ref="cateRef"
                :disabled="editItem.level === 1"
                v-model:parentId="editItem.parentId"
              />

              <v-text-field
                placeholder="100"
                type="number"
                variant="solo-filled"
                flat
                label="排序"
                persistent-hint
                persistent-placeholder
                hint="分类排序会影响显示的顺序。"
                density="comfortable"
                min="0"
                step="1"
                class="mt-4"
                v-model.number="editItem.sort"
              ></v-text-field>
              <v-combobox
                placeholder="A"
                variant="solo-filled"
                flat
                class="mt-4"
                label="关键词"
                persistent-hint
                persistent-placeholder
                hint="关键词用于检索过滤分类"
                density="comfortable"
                chips
                multiple
                v-model="editItem.keywords"
              ></v-combobox>
            </v-card-text>
          </v-card>

          <v-card class="mt-4">
            <v-card-text>
              <v-textarea
                v-model="editItem.description"
                variant="solo-filled"
                flat
                rounded="lg"
                hide-details="auto"
                placeholder="输入分类描述..."
                label="关键词"
                persistent-hint
                persistent-placeholder
                hint="关键词用于检索过滤分类"
                density="comfortable"
              ></v-textarea>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="5">
          <v-card>
            <v-card-text>
              <v-select
                v-model="editItem.published"
                :items="publishedOptions"
                label="状态"
                placeholder="分类状态"
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
            <v-card-text>
              <AppLabel>图片</AppLabel>
              <v-sheet class="border rounded-lg" v-if="editItem.pic">
                <v-img :src="editItem.pic" contain />
              </v-sheet>
              <UploadImage v-else @change="onUploadPic" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { AllCategory } from "@/interfaces/category";
import { useSnackbar } from "@/composables/snackbar";

const loading = ref(false);
const defaultItem = reactive<AllCategory>({
  id: 0,
  name: "",
  parentId: 0,
  sort: 0,
  pic: "",
  level: 0,
  keywords: [],
  description: "",
  count: 0,
  published: false,
});

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

let editItem = reactive({ ...defaultItem });
const onUploadPic = (e: string) => {
  editItem.pic = e;
};

const close = () => {
  editItem = reactive({ ...defaultItem });
};

const cancel = () => {
  close();
};

const route = useRoute();
const id = (route.params as { id: number }).id;

const update = async () => {
  if (id === 0 || loading.value) return;
  loading.value = true;
  editItem.level = editItem.parentId === 0 ? 1 : 2;
  const { success } = await BFSDK.updateCategory(id, editItem);
  if (success) {
    useSnackbar("添加/更新分类成功");
    close();
  } else {
    useSnackbar("更新分类失败");
  }

  loading.value = false;
};

onMounted(async () => {
  if (!id || id === 0) return;
  const { success, data } = await BFSDK.getCategoryById(id);
  if (success) {
    Object.assign(editItem, data);
  }
});
</script>

<route lang="yaml">
meta:
  title: "新建分类"
  breadcrumb: "新建产品分类"
</route>
