<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <CollectionNewBtn />
        </AppBreadcrumb>

        <v-card class="mt-4">
          <v-toolbar density="compact" color="transparent"> </v-toolbar>
          <v-divider />
          <v-text-field
            flat
            density="compact"
            variant="solo"
            placeholder="检索"
            prepend-inner-icon="mdi-magnify"
            v-model="search"
          >
          </v-text-field>
          <v-divider />
          <v-data-table
            :search="search"
            class="text-caption"
            :items="items"
            :headers="headers"
            :loading="loading"
            @click:row="onClickRow"
            hover
            show-select
            return-object
            density="comfortable"
          >
            <template v-slot:[`item.name`]="{ item }">
              <v-list-item slim class="pa-0">
                <template v-slot:prepend>
                  <v-avatar class="rounded-lg border">
                    <v-img :src="item.pic" v-if="item.pic" />
                    <v-icon icon="mdi-image" v-else />
                  </v-avatar>
                </template>
                <v-list-item-title class="text-caption font-weight-bold">
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item>
            </template>
            <template v-slot:[`item.published`]="{ item }">
              <v-checkbox-btn
                readonly
                v-model="item.published"
              ></v-checkbox-btn>
            </template>
            <template v-slot:loading>
              <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template v-slot:[`no-data`]>
              <v-sheet>
                <v-img src="@/assets/collection.svg" height="200px" class="my-8">
                </v-img>
                <div class="v-card-title text-subtitle-2">
                  商品系列
                </div>
                <div class="text-caption v-card-subtitle ">
                  商品系列,可临时管理商品集合。适用于特定的场景。
                </div>
                <v-btn
                  size="small"
                  class="ma-4"
                  color="orange-accent-2"
                  variant="flat"
                  to="/pms/collections/new"
                  >添加系列</v-btn
                >
              </v-sheet>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { Collection } from "@/interfaces/collection";

const loading = ref(false);
const search = ref("");
const router = useRouter();

const headers = [
  {
    title: "系列名",
    key: "name",
  },
  {
    title: "标识符",
    key: "handle",
  },
  {
    title: "发布",
    key: "published",
  },
  {
    title: "排序",
    key: "sort",
  },
];

const items = ref<Collection[]>([]);

onMounted(async () => {
  if (loading.value) return;
  loading.value = true;
  const { success, data } = await BFSDK.getAllCollections();
  if (!success) {
    loading.value = false;
    return;
  }
  items.value = data;
  loading.value = false;
});

const onClickRow = (e: any, selected: any) => {
  const id = items.value[selected.index].id;
  router.push(`/pms/collections/${id}`);
};
</script>

<route lang="yaml">
meta:
  title: "商品系列"
  breadcrumb: "系列"
</route>
