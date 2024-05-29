<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12">
        <v-toolbar color="transparent">
          <AppBackBtn />
          <v-toolbar-title class="text-body-1 font-weight-bold">
            管理Air Table
          </v-toolbar-title>
          <v-spacer />
          <v-btn size="small" class="me-2" variant="tonal">取消</v-btn>
          <v-btn size="small" variant="elevated">下载</v-btn>
        </v-toolbar>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-toolbar density="compact" color="transparent">
            <v-btn icon="mdi-sync" @click="fetchRows"/>
            <v-spacer />
            <v-btn icon="mdi-magnify" />
          </v-toolbar>
          <v-divider />
          <v-data-table :items="rows" class="text-caption"> </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ColumnMeta } from "@/interfaces/airtable";
import BFSDK from "@/api/sdk";
const columns = ref<ColumnMeta[]>([]);
const rows = ref<any[]>([]);
const route = useRoute();
const id = (route.params as { id: number }).id;

const fetchCols = async () => {
  const { success, data } = await BFSDK.getAirTableColumns(id);
  if (!success) return;
  columns.value = data;
};

const fetchRows = async () => {
  const { success, data } = await BFSDK.getAirTableRows(id);
  if (!success) return;
  rows.value = data;
};

onMounted(() => {
  if (!id || id === 0) return;
  Promise.all([fetchCols(), fetchRows()]);
});
</script>
