<template>
  <AppToolkitBar>
    <v-btn
      append-icon="mdi-plus"
      to="/pms/categories/new"
      theme="dark"
      variant="flat"
      size="small"
    >
      添加分类
    </v-btn>
    <v-divider vertical class="mx-2 my-3"> </v-divider>
    <v-select
      density="compact"
      hide-details
      max-width="100"
      variant="solo-filled"
      flat
      color="indigo"
      :items="levels"
      item-value="level"
      item-title="title"
      class="text-caption"
      v-model="defaultFilterLevel"
      return-object
      @update:model-value="filterByLevel"
    >
      <template v-slot:selection="{ item }">
        <div class="text-caption font-weight-bold">{{ item.title }}</div>
      </template>
    </v-select>

    <v-spacer />
    <v-text-field
      flat
      density="compact"
      variant="solo-filled"
      placeholder="检索"
      class="text-caption"
      prepend-inner-icon="mdi-magnify"
      v-model="search"
    >
    </v-text-field>
  </AppToolkitBar>
  <v-data-table
    :loading="loading"
    :headers="headers"
    class="text-caption"
    hover
    :search="search"
    :items="items"
  >
    <template v-slot:[`item.name`]="{ item }">
      <v-list-item class="pa-0">
        <template v-slot:prepend>
          <v-avatar class="rounded-lg border">
            <v-img :src="item.pic" v-if="item.pic" />
            <v-icon icon="mdi-image" v-else />
          </v-avatar>

          <v-list-item-title class="text-caption font-weight-medium ms-2">
            {{ item.name }}
          </v-list-item-title>
        </template>
      </v-list-item>
    </template>

    <template v-slot:[`item.child`]="{ item }">
      <v-btn
        variant="outlined"
        size="x-small"
        prepend-icon="mdi-eye-outline"
        v-if="item.level === 1"
        @click="viewChildren(item)"
        >查看</v-btn
      >
    </template>
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon class="me-2" @click="updateCategory(item)">mdi-pencil</v-icon>
      <v-icon @click="remove(item)">mdi-trash-can</v-icon>
    </template>
    <template v-slot:[`item.published`]="{ item }">
      <v-checkbox-btn v-model="item.published" readonly></v-checkbox-btn>
    </template>
    <template v-slot:[`no-data`]>
      <v-sheet>
        <v-img src="@/assets/category.svg" height="200px" class="my-8"> </v-img>
        <div class="v-card-title text-subtitle-2">商品分类</div>
        <div class="text-caption v-card-subtitle">
          商品分类将商品归纳为一个长期标记的状态。适合长期的管理。
        </div>
        <v-btn size="small" class="ma-4" color="orange-accent-2" variant="flat"
          >添加商品</v-btn
        >
      </v-sheet>
    </template>
  </v-data-table>
  <AppConfirmDialog ref="confirm" />
</template>

<script setup lang="ts">
import { AllCategory, Category } from "@/interfaces/category";
import BFSDK from "@/api/sdk";
import bugfreed from "@/sdk";
import { PMS } from "@/sdk/pms/pms";

const headers: any[] = [
  { title: "名称", key: "name" },
  { title: "等级", key: "level" },
  { title: "商品数量", key: "count" },
  { title: "发布", key: "published" },
  { title: "下一级", key: "child" },
  { title: "操作", key: "actions", align: "end" },
];

const pms = new PMS({ bugfreed });

const search = ref();
const confirm = ref();
const items = ref<AllCategory[]>([]);
const loading = ref(false);
const router = useRouter();

// 过滤分类
interface Level {
  level: number;
  title: string;
}

const levels: Level[] = [
  {
    level: 0,
    title: "所有",
  },
  {
    level: 1,
    title: "一级",
  },
];

const defaultFilterLevel = reactive<Level>({ level: 0, title: "所有" });

const filterByLevel = async (item: Level) => {
  defaultFilterLevel.level = item.level;
  defaultFilterLevel.title = item.title;
  if (loading.value) return;
  loading.value = true;
  const { success, data } = await fetch(defaultFilterLevel.level);
  if (!success) {
    useSnackbar("获取分类失败");
  } else {
    items.value = data.flatMap((obj: any) => {
      if (obj.items && obj.items.length > 0) {
        // If obj has items property, flatten obj and its items
        return [obj, ...obj.items];
      } else {
        // If obj doesn't have items property, return obj itself
        return obj;
      }
    });
  }

  loading.value = false;
};

const remove = (item: Category) => {
  if (!item) return;
  confirm.value
    .open(
      `删除分类 ${item.name} ?`,
      "删除之后则会将永久永久抹除。请确认后再删除！"
    )
    .then(async (ok: boolean) => {
      if (ok) {
        const { success } = await pms.category().delete(item.id);
        if (success) {
          useSnackbar("删除分类成功")
        } else {
          useSnackbar("删除分类成功")
          await viewAll()
        }
      }
    });
};

const fetch = async (level?: number) => {
  let res = null;
  if (level && level === 1) {
    res = await BFSDK.filterCategories(1);
  } else {
    res = await BFSDK.getCategories();
  }

  return res;
};

const viewAll = async () => {
  loading.value = true;
  const { success, data } = await fetch();
  if (success) {
    items.value = data.flatMap((obj: any) => {
      if (obj.items && obj.items.length > 0) {
        // If obj has items property, flatten obj and its items
        return [obj, ...obj.items];
      } else {
        // If obj doesn't have items property, return obj itself
        return obj;
      }
    });
  }

  loading.value = false;
};

const viewChildren = async (item: AllCategory) => {
  if (loading.value) return;
  loading.value = true;
  const { success, data } = await BFSDK.getCategoriesByParentId(item.id);
  if (!success) {
    useSnackbar("获取分类失败");
  } else {
    items.value = data;
  }

  loading.value = false;
};

const updateCategory = async (item: AllCategory) => {
  router.push({
    name: "/pms/categories/[id]",
    params: {
      id: item.id,
    },
  });
};

onMounted(async () => {
  viewAll();
});

defineExpose({
  items,
});
</script>
