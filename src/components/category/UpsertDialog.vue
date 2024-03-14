<template>
  <!--eager 强制内容渲染。要不然无法引入ref获取子组件的状态-->
  <v-dialog max-width="800" v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        :variant="meta.variant"
        rounded="lg"
        :color="meta.color"
        :prepend-icon="meta.prependIcon"
        size="small"
      >
        {{ meta.title }}
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="grey-darken-4">
        <v-toolbar-title class="text-body-1 font-weight-bold">
          {{ meta.title }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-close" @click="onClose" />
      </v-toolbar>
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
            <v-select
              hide-details
              chips
              :disabled="editItem.level === 1"
              placeholder="搜索/选择分类"
              item-title="name"
              item-value="id"
              density="compact"
              clearable
              variant="solo-filled"
              flat
              v-model="editItem.parentId"
              :items="items"
            >
              <template v-slot:no-data>
                <div class="text-center">
                  <div class="text-body-2 font-weight-bold my-2">
                    尚未添加分类
                  </div>
                </div>
              </template>
            </v-select>
          </v-col>
          <v-col cols="12" md="6">
            <AppLabel>排序</AppLabel>
            <v-text-field
              placeholder="100"
              type="number"
              variant="solo-filled"
              flat
              v-model="editItem.sort"
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
            <v-sheet height="100" class="rounded-lg dot"> </v-sheet>
          </v-col>
          <v-col cols="12" md="6">
            <AppLabel>横幅（banner）</AppLabel>
            <v-sheet height="100" class="rounded-lg dot"> </v-sheet>
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
          prepend-icon="mdi-cancel"
          class="me-2"
          >取消</v-btn
        >
        <v-btn
          variant="flat"
          size="small"
          color="grey-darken-4"
          prepend-icon="mdi-check-all"
          >确认</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useCategoryStore } from "@/store/category";
import { ref, reactive } from "vue";

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

const defaultItem = reactive({
  name: "",
  unit: "",
  parentId: null,
  sort: 0,
  icon: "",
  image: "",
  keywords: "",
  description: "",
});

let editItem = reactive({ ...defaultItem });

if (props.edit) {
  editItem = reactive({ ...defaultItem, ...props.item });
}

const store = useCategoryStore();
const { items } = storeToRefs(store);
const onClose = () => {
  editItem = reactive({ ...defaultItem });
  dialog.value = false;
};
</script>

<style>
.dot {
  border: 1px dashed #e0e0e0 !important;
}
</style>
