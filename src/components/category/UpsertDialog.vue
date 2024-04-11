<template>
  <!--eager 强制内容渲染。要不然无法引入ref获取子组件的状态-->
  <v-dialog max-width="800" v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        :variant="edit ? 'text' : 'elevated'"
        rounded="lg"
        :prepend-icon="meta.prependIcon"
        size="small"
      >
        {{ meta.title }}
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="transparent" density="compact">
        <v-toolbar-title class="text-body-1 font-weight-bold">
          {{ meta.title }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-close" @click="close" />
      </v-toolbar>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <AppLabel>名称</AppLabel>
            <v-text-field
              variant="solo-filled"
              flat
              placeholder="分类名称"
              v-model="editItem.name"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <AppLabel>父级分类</AppLabel>
            <CategorySelect
              ref="cateRef"
              :disabled="editItem.level === 1"
              v-model:parentId="editItem.parentId"
            />
          </v-col>
          <v-col cols="12" md="6">
            <AppLabel>排序</AppLabel>
            <v-text-field
              placeholder="100"
              type="number"
              variant="solo-filled"
              flat
              density="compact"
              min="0"
              step="1"
              v-model.number="editItem.sort"
            ></v-text-field
          ></v-col>
          <v-col cols="12" md="6">
            <AppLabel>关键词</AppLabel>
            <v-text-field
              placeholder="A"
              variant="solo-filled"
              flat
              v-model="editItem.keywords"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <AppLabel>图标（icon）</AppLabel>
            <v-sheet class="border" v-if="editItem.icon">
              <v-img :src="editItem.icon" contain />
            </v-sheet>
            <UploadImage v-else @change="onUploadIcon" />
          </v-col>
          <v-col cols="12" md="6">
            <AppLabel>横幅（banner）</AppLabel>
            <v-sheet class="border" v-if="editItem.image">
              <v-img :src="editItem.image" contain />
            </v-sheet>
            <UploadImage v-else @change="onUploadImage" />
          </v-col>
          <v-col cols="12" md="12">
            <AppLabel>描述</AppLabel>
            <v-textarea
              variant="solo-filled"
              flat
              single-line
              rounded="lg"
              v-model="editItem.description"
              placeholder="输入分类描述..."
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          variant="tonal"
          size="small"
          prepend-icon="mdi-check-all"
          @click="save"
          width="70"
          >确认</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { AllCategory } from "@/interfaces/category";
import { useSnackbar } from "@/composables/snackbar";

const props = defineProps({
  edit: Boolean,
  item: Object,
});

const dialog = ref(false);
const meta = computed(() => {
  return props.edit
    ? { title: "编辑", prependIcon: "mdi-pencil", variant: "text" }
    : {
        title: "新增分类",
        prependIcon: "mdi-plus",
        variant: "elevated",
        color: "grey-darken-4",
      };
});

const defaultItem = reactive<AllCategory>({
  id: 0,
  name: "",
  unit: "",
  parentId: 0,
  sort: 0,
  icon: "",
  image: "",
  level: 0,
  keywords: "",
  description: "",
  count: 0,
});

let editItem = reactive({ ...defaultItem });

if (props.edit) {
  editItem = reactive({ ...defaultItem, ...props.item });
}

const onUploadIcon = (e: string) => {
  editItem.icon = e;
};

const onUploadImage = (e: string) => {
  editItem.image = e;
};

const close = () => {
  editItem = reactive({ ...defaultItem });
  dialog.value = false;
};


const save = async () => {
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
};
</script>

<style>
.dot {
  border: 1px dashed #e0e0e0 !important;
}
</style>
