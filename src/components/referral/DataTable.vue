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
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template v-slot:[`item.invalid`]="{ item }">
        <v-checkbox-btn readonly v-model="item.invalid" />
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          icon="mdi-google-analytics"
          size="x-small"
          class="me-2"
          @click="onAnalytics(item)"
        ></v-btn>
        <v-btn icon="mdi-pencil" size="x-small" @click="edit(item)"></v-btn>
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
    key: "phone",
  },
  {
    title: "推荐码",
    key: "referralCode",
  },
  {
    title: "无效",
    key: "invalid",
  },
  {
    title: "操作",
    key: "actions",
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

const router = useRouter();

const edit = (item: UserReferralInfo) => {
  const { id } = item;
  router.push({ name: "/referrals/[id]", params: { id: id} });
};

const onAnalytics = (item: UserReferralInfo) => {
  const { id } = item;
  router.push({
    name: "/referrals/analytics",
    query: {
      id: id,
    },
  });
};
</script>
