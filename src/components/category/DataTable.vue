<template>
  <v-card class="mt-4">
    <v-toolbar color="transparent">
      <v-btn
        variant="flat"
        size="small"
        color="orange-accent-2"
        @click="viewAll"
        >所有</v-btn
      >
      <v-btn variant="tonal" size="small" class="mx-2" @click="viewFirstLevel"
        >一级</v-btn
      >
      <v-spacer />
      <v-responsive max-width="344">
        <v-text-field
          flat
          density="compact"
          variant="solo-filled"
          placeholder="检索"
          class="me-2 text-caption"
          prepend-inner-icon="mdi-magnify"
          v-model="search"
        >
        </v-text-field>
      </v-responsive>
    </v-toolbar>
    <v-divider />
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
              <v-img :src="item.icon" v-if="item.icon" />
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
          variant="flat"
          color="orange-accent-1"
          size="small"
          rounded="pill"
          prepend-icon="mdi-eye-outline"
          v-if="item.items"
          @click="viewChildren(item)"
          >{{ item.items?.length }}</v-btn
        >
      </template>
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-menu close-on-content-click>
          <template v-slot:activator="{ props }">
            <v-icon icon="mdi-dots-vertical" size="x-large" v-bind="props">
            </v-icon>
          </template>
          <v-list>
            <v-list-item>
              <CategoryUpsertDialog
                edit
                :item="toRaw(item)"
              ></CategoryUpsertDialog>
            </v-list-item>
            <v-list-item>
              <v-btn
                prepend-icon="mdi-delete"
                size="small"
                @click="remove(item)"
              >
                删除
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-card>
  <AppConfirmDialog ref="confirm"> </AppConfirmDialog>
</template>

<script setup lang="ts">
import { toRaw } from "vue";

const headers: TableHeader[] = [
  { title: "名称", key: "name" },
  { title: "等级", key: "level" },
  { title: "商品数量", key: "count" },
  { title: "单位", key: "unit" },
  { title: "子分类数量", key: "child" },
  { title: "操作", key: "actions", align: "end" },
];

const search = ref();
const confirm = ref();
const items = ref<AllCategory[]>([]);
const loading = ref(false);

const remove = (item: any) => {
  if (!item) return;
  confirm.value
    .open(
      `删除分类 ${item.name} ?`,
      "删除之后则会将永久永久抹除。请确认后再删除！",
      { color: "red" }
    )
    .then((ok: boolean) => {
      if (ok) {
        alert(ok);
      }
    });
};

const fetch = async (level?: number) => {
  let res = null;
  if (level && level === 1) {
    res = await BFSDK.getCategories(1);
  } else {
    res = await BFSDK.getCategories();
  }

  return res;
};

const viewFirstLevel = () => {
  // Filter items array to include only items with level equal to 1
  items.value = items.value.filter((item) => item.level === 1);
};

const viewAll = async () => {
  loading.value = true;
  const { success, data } = await fetch();
  if (success) {
    items.value = data.flatMap((obj) => {
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

const viewChildren = (item: AllCategory) => {
  if (item.items && item.items.length) {
    items.value = item.items;
  }
};

onMounted(async () => {
  viewAll();
});

defineExpose({
  items,
});
</script>
