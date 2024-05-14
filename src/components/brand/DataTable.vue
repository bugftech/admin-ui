<template>
  <v-card>
    <v-toolbar color="transparent">
      <v-btn icon="mdi-sync" size="small" />
      <v-spacer />
      <v-btn
        icon="mdi-filter-variant"
        size="x-small"
        variant="tonal"
        rounded="lg"
        @click="filter = !filter"
      ></v-btn>
    </v-toolbar>
    <v-divider />
    <v-toolbar color="transparent" v-if="filter"> </v-toolbar>
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

    <v-data-table :items="items" :headers="headers" class="text-caption">
      <template v-slot:[`no-data`]>
        <v-sheet>
          <v-img src="@/assets/404.svg" height="200px" class="my-8"> </v-img>
          <div class="text-caption">品牌用于整理产品的类别。在程序中可帮助用户快速过滤品牌的归属商品</div>
          <v-btn size="small" class="ma-4" color="orange-accent-2" variant="flat">添加品牌</v-btn>
        </v-sheet>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
const filter = ref(false);
const search = ref("");

import BFSDK from "@/api/sdk";
import { Brand } from "@/interfaces/brand";
const items = ref<Brand[]>([]);
const loading = ref(false)

const headers: any[] = [
  { title: "名称", key: "name" },
  { title: "首字母", key: "firstLetter" },
  { title: "工厂制造", key: "factoryMade" },
  { title: "品牌LOGO", key: "logo" },
  { title: "专区大图", key: "banner" },
  { title: "操作", key: "actions", align: "end" },
];


const fetch = async () => {
  if (loading.value) return;
  loading.value = true;
  const { success, data } = await BFSDK.getBrands();
  if (!success) {
    loading.value = false;
    return;
  }

  items.value = data
  loading.value = false;
}


onMounted(async ()=>{
  await fetch()
})
</script>
