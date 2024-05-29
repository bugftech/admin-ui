<template>
  <v-card class="mt-2">
    <v-toolbar density="compact" color="transparent">
      <v-btn icon="mdi-sync" @click="fetch" size="x-small" rounded="lg" />
      <v-spacer />
      <v-btn
        icon="mdi-filter-variant"
        variant="elevated"
        rounded="lg"
        size="x-small"
      />
    </v-toolbar>
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
      hover
      @click:row="onClickRow"
    >
      <template v-slot:[`item.method`]="{ item }">
        <v-chip size="x-small" color="green" variant="flat">{{
          item.method == "wechat" ? "微信支付" : item.method
        }}</v-chip>
      </template>

      <template v-slot:[`item.appRelated`]="{ item }">
        <v-checkbox-btn v-model="item.appRelated" readonly></v-checkbox-btn>
      </template>

      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>

      <template v-slot:no-data>
        <v-sheet>
          <v-img src="@/assets/mobile-pay.svg" height="200px" class="my-8">
          </v-img>
          <v-card-title class="text-subtitle-2">
            尚未添加支付配置
          </v-card-title>
          <v-card-subtitle class="text-caption mb-8">
            添加支付配置并绑定到APP，即可开启APP支付功能。
          </v-card-subtitle>
        </v-sheet>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { PayInfo } from "@/interfaces/pay";
import router from "@/router";

const items = ref<PayInfo[]>([]);
const search = ref("");
const loading = ref(false);

const headers: any[] = [
  {
    title: "名称",
    key: "name",
  },
  {
    title: "支付类型",
    key: "method",
  },
  {
    title: "绑定",
    key: "appRelated",
  },
  {
    title: "APP名称",
    key: "bfAppName",
  },
  {
    title: "操作",
    key: "actions",
  },
];

const fetch = async () => {
  if (loading.value) return;
  loading.value = true;
  const { success, data } = await BFSDK.getPays();
  if (!success) {
    useSnackbar("获取支付配置列表失败");
    loading.value = false;
    return;
  }

  items.value = data;
  loading.value = false;
};

const onClickRow = (e: any, selected: any) => {
  const { id, method } = selected.item;
  if (method === "wechat") {
    router.push({
      name: "/pays/wechat/[id]",
      params: {
        id: id,
      }
    });
  }
};

onMounted(async () => {
  await fetch();
});
</script>
