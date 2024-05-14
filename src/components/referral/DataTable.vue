<template>
  <v-card class="mt-2">
    <v-toolbar density="compact" color="transparent">
      <v-btn icon="mdi-sync" size="small" @click="fetch" />
      <v-spacer />
      <v-btn icon="mdi-magnify" />
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
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { UserReferralInfo } from "@/interfaces/userReferral";

const items = ref<UserReferralInfo[]>([]);
const search = ref("");
const loading = ref(false);
const headers: any[] = [
  {
    title: "应用",
    key: "bfAppName",
  },
  {
    title: "用户名",
    key: "userName",
  },
  {
    title: "用户手机号",
    key: "userPhone",
  },
  {
    title: "推荐码",
    key: "referralCode",
  },
  {
    title: "二维码",
    key: "qrcodeUrl",
  },
];

const fetch = async () => {
  if (loading.value) return;
  loading.value = true;
  const { data, success } = await BFSDK.getReferrals();
  if (!success) {
    useSnackbar("获取数据失败");
    loading.value = false;
    return;
  }

  items.value = data;
  loading.value = false;
};

onMounted(async () => {
  await fetch();
});

const router = useRouter()

const onClickRow = (e: any, selected: any) => {
  const { id } = selected.item;
  router.push({ name: "/referrals/[id]", params: {id: id} });
};
</script>
