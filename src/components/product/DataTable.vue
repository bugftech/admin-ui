<template>
  <v-card>
    <v-toolbar color="transparent">
      <AppDatePicker />
      <v-tooltip text="刷新" class="text-caption" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-sync" size="small" v-bind="props" />
        </template>
      </v-tooltip>
      <v-spacer />
      <v-responsive max-width="344">
        <v-text-field
          flat
          density="compact"
          variant="solo-filled"
          placeholder="检索"
          class="me-2"
          prepend-inner-icon="mdi-magnify"
          v-model="search"
        >
        </v-text-field>
      </v-responsive>
    </v-toolbar>
    <v-divider />
    <v-data-table
      density="comfortable"
      show-select
      return-object
      class="text-caption"
      hover
      :loading="loading"
      :search="search"
      :headers="headers"
      :items="items"
      @click:row="onClickRow"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        <v-list-item class="pa-0" slim>
          <template v-slot:prepend>
            <v-avatar class="rounded-lg border">
              <v-img :src="item.banner" v-if="item.banner" />
              <v-icon icon="mdi-image" v-else />
            </v-avatar>
          </template>
          <v-list-item-title class="text-caption font-weight-medium ms-2">
            {{ item.name }}
          </v-list-item-title>
        </v-list-item>
      </template>
      <template v-slot:[`item.price`]="{ item }">
        <div>{{ usePriceYuan(item.price) }}</div>
      </template>
      <template v-slot:[`item.originalPrice`]="{ item }">
        <div>{{ usePriceYuan(item.originalPrice) }}</div>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <div class="d-flex">
          <v-chip
            size="x-small"
            label
            color="orange-accent-3"
            class="mr-2"
            v-if="item.isNew"
            prepend-icon="mdi-new-box"
            >新品</v-chip
          >
          <v-chip
            size="x-small"
            label
            class="mr-2"
            color="green-darken-1"
            v-if="item.isRecommand"
            prepend-icon="mdi-star"
            >推荐</v-chip
          >
          <v-chip
            size="x-small"
            label
            v-if="item.isPreview"
            prepend-icon="mdi-cloud-off-outline"
            >预告</v-chip
          >
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/store/product";
import BFSDK from "@/api/sdk";
import { Product } from "@/interfaces/product";

// Utilities
import { usePriceYuan } from "@/composables/price";
import { formatDateTime } from "@/composables/time";

const productStore = useProductStore();
const search = ref();
const router = useRouter();

const onClickRow = (e: any, selected: any) => {
  const id = items.value[selected.index].id
  router.push(`/pms/products/${id}`);
};

const { headers, items, loading } = storeToRefs(productStore);

onMounted(async () => {
  const { success, data } = await BFSDK.getProducts();
  if (!success) return;
  items.value = data;
});
</script>
