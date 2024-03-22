<template>
  <v-card class="mt-4">
    <v-toolbar color="transparent">
      <v-btn variant="tonal" size="small">所有</v-btn>

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
      :items="computedItems"
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
      <template v-slot:[`item.actions`]="{ item }">
        <v-menu close-on-content-click>
          <template v-slot:activator="{ props }">
            <v-icon
              icon="mdi-dots-vertical-circle"
              size="x-large"
              v-bind="props"
            >
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
      <template v-slot:[`item.child`]="{ item }">
        <v-btn
          variant="flat"
          color="orange-accent-1"
          size="small"
          rounded="pill"
          prepend-icon="mdi-eye-outline"
          v-if="item.items"
          >{{ item.items?.length }}</v-btn
        >
      </template>
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
    </v-data-table>
  </v-card>
  <AppConfirmDialog ref="confirm"> </AppConfirmDialog>
</template>

<script setup>
import { toRaw } from "vue";
import { useCategoryStore } from "@/store/category";

const headers = [
  { title: "名称", value: "name" },
  { title: "等级", key: "level" },
  { title: "商品数量", key: "count" },
  { title: "单位", key: "unit" },
  { title: "子分类数量", key: "child" },
  { title: "操作", key: "actions", align: "end" },
];

const search = ref();
const confirm = ref();
const store = useCategoryStore();
const { items, loading } = storeToRefs(store);

const childMode = ref(false);
const computedItems = items.value.flatMap((obj) => [obj, ...obj.items])

const viewChild = (item) =>  {
}

const remove = (item) => {
  if (!item) return;
  confirm.value
    .open(
      `删除分类 ${item.name} ?`,
      "删除之后则会将永久永久抹除。请确认后再删除！",
      { color: "red" }
    )
    .then((ok) => {
      if (ok) {
        alert(ok);
      }
    });
};
</script>
