<template>
  <v-card>
    <v-toolbar color="transparent">
      <AppDatePicker />
      <v-tooltip text="刷新" class="text-caption" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-sync"
            size="small"
            v-bind="props"
          />
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
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/store/product";

// Utilities
import { usePriceYuan } from "@/composables/price";
import { formatDateTime } from "@/composables/time";

const productStore = useProductStore();
const search = ref();
const router = useRouter();

const onClickRow = (e: any, selected: any) => {
  //productStore.setCurrentIndex(selected.index);
  // router.push({ name: "/orders/[id]/", params: { id: selected.index } });
};

const { headers, items, loading } = storeToRefs(productStore);
</script>
