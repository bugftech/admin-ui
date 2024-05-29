<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-btn size="small" variant="elevated" to="/wireless/new"
            >添加一个表</v-btn
          >
        </AppBreadcrumb>
      </v-col>
      <v-col cols="12" md="3" v-for="(tab, i) in tables" :key="i">
        <v-card>
          <v-img height="100" :src="tab.pic" color="indigo-lighten-1"> </v-img>
          <v-card-item>
            <v-card-title class="text-subtitle-2">
              {{ tab.name }}
            </v-card-title>
            <v-card-subtitle class="text-caption">
              {{ tab.description }}
            </v-card-subtitle>
            <template v-slot:append>
              <v-btn
                size="small"
                variant="tonal"
                color="indigo"
                @click="viewTable(tab)"
                >查询</v-btn
              >
            </template>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { TableMeta } from "@/interfaces/airtable";

const tables = ref<TableMeta[]>([]);
const fetchTables = async () => {
  const { success, data } = await BFSDK.getAirTables();
  if (!success) return;
  tables.value = data;
};


const router = useRouter()
const viewTable = (item: TableMeta) => {
  router.push({
    name: "/wireless/[id]",
    params: {
      id: item.id
    }
  })
}
onMounted(async () => {
  await fetchTables();
});
</script>

<route lang="yaml">
meta:
  title: "Headless"
  breadcrumb: "CMS"
</route>
