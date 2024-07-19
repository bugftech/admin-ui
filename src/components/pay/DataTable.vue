<template>
  <app-toolkit-bar>
    <PayAddDialog />
    <v-divider vertical class="mx-2 my-3" />
    <v-btn prepend-icon="mdi-sync" @click="fetch" size="small" class="border"
      >刷新数据</v-btn
    >
    <v-spacer />
    <v-text-field
      flat
      density="compact"
      variant="solo-filled"
      placeholder="检索"
      prepend-inner-icon="mdi-magnify"
      v-model="search"
    >
    </v-text-field>
  </app-toolkit-bar>
  <v-data-table
    :search="search"
    class="text-caption"
    :items="items"
    :headers="headers"
    :loading="loading"
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

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon class="me-2" @click="onEditPay(item)">mdi-pencil</v-icon>
      <v-icon :disabled="item.appRelated" @click="onDeletePay(item)"
        >mdi-trash-can</v-icon
      >
    </template>

    <template v-slot:no-data>
      <v-sheet>
        <v-img src="@/assets/mobile-pay.svg" height="200px" class="my-8">
        </v-img>
        <v-card-title class="text-subtitle-2"> 尚未添加支付配置 </v-card-title>
        <v-card-subtitle class="text-caption mb-8">
          添加支付配置并绑定到APP，即可开启APP支付功能。
        </v-card-subtitle>
      </v-sheet>
    </template>
  </v-data-table>
  <app-confirm-dialog ref="confirm" />
</template>

<script setup lang="ts">
import router from "@/router";
import bugfreed from "@/sdk";
import { Pay } from "@/sdk/pay/pay";
import { PayInfo } from "@/sdk/pay/types";

const pay = new Pay({ bugfreed });
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
  const { success, data } = await pay.list();
  if (!success) {
    useSnackbar("获取支付配置列表失败");
    loading.value = false;
    return;
  }

  items.value = data;
  loading.value = false;
};

const onEditPay = (item: PayInfo) => {
  if (item.method === "wechat") {
    router.push({
      name: "/pays/wechat/[id]",
      params: {
        id: item.id,
      },
    });
  }
};

const confirm = ref();

const onDeletePay = async (item: PayInfo) => {
  const ok = await confirm.value.open(
    "删除支付",
    "删除的数据无法恢复，确定删除支付配置吗？"
  );
  if (!ok) return;
  if (item.method === "wechat") {
    const { success } = await pay.wechat().delete(item.id);
    if (!success) {
      useSnackbar("删除支付配置列表失败");
    } else {
      useSnackbar("删除支付配置列表成功");
      await fetch();
    }
  }
};

onMounted(async () => {
  await fetch();
});
</script>
