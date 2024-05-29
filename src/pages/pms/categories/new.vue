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
              @click="save"
              :loading="loading"
              >确定</v-btn
            >
          </v-toolbar>
        </v-col>
        <v-col cols="12" md="7">
          <v-card>
            <v-card-text>
              <AppLabel>名称</AppLabel>
              <v-text-field
                variant="solo-filled"
                flat
                placeholder="分类名称"
                density="compact"
                :rules="nonEmptyRules"
                v-model="editItem.name"
              >
              </v-text-field>

              <AppLabel class="mt-4">父级分类</AppLabel>
              <CategorySelect
                ref="cateRef"
                :disabled="editItem.level === 1"
                v-model:parentId="editItem.parentId"
              />

              <AppLabel class="mt-4">排序</AppLabel>
              <v-text-field
                placeholder="100"
                type="number"
                variant="solo-filled"
                flat
                density="compact"
                min="0"
                step="1"
                v-model.number="editItem.sort"
              ></v-text-field>
              <AppLabel class="mt-4">关键词</AppLabel>
              <v-combobox
                placeholder="A"
                variant="solo-filled"
                flat
                chips
                multiple
                density="compact"
                hide-details
                v-model="editItem.keywords"
              ></v-combobox>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="5">
          <v-card class="mt-4">
            <v-card-text>
              <AppLabel class="mt-4">横幅（banner）</AppLabel>
              <v-sheet class="border" v-if="editItem.pic">
                <v-img :src="editItem.pic" contain />
              </v-sheet>
              <UploadImage v-else @change="onUploadPic" />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="7">
          <v-card>
            <v-card-text>
              <AppLabel>描述</AppLabel>
              <v-textarea
                variant="solo-filled"
                flat
                single-line
                rounded="lg"
                hide-details="auto"
                v-model="editItem.description"
                placeholder="输入分类描述..."
              ></v-textarea>
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

const props = defineProps({
  edit: Boolean,
  item: Object,
});

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

let editItem = reactive({ ...defaultItem });

if (props.edit) {
  editItem = reactive({ ...defaultItem, ...props.item });
}

const onUploadPic = (e: string) => {
  editItem.pic = e;
};

const close = () => {
  editItem = reactive({ ...defaultItem });
};

const cancel = () => {
  close();
};

const save = async () => {
  loading.value = true;
  editItem.level = editItem.parentId === 0 ? 1 : 2;
  let res = null;
  if (editItem.id > 0) {
    res = await BFSDK.updateCategory(editItem.id, editItem);
  } else {
    res = await BFSDK.addCategory(editItem);
  }

  const { success } = res;
  if (success) {
    useSnackbar("添加/更新分类成功");
    close();
  } else {
    useSnackbar("添加分类失败");
  }

  loading.value = false;
};
</script>

<route lang="yaml">
meta:
  title: "新建分类"
  breadcrumb: "新建产品分类"
</route>
