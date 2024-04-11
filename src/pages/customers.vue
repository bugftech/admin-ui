<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-btn icon="mdi-download"></v-btn>
        </AppBreadcrumb>
        <v-card class="mt-2">
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
          >
            <template v-slot:[`item.nickName`]="{ item }">
              <v-list-item slim class="pa-0">
                <template v-slot:prepend>
                  <v-avatar class="rounded-lg border">
                    <v-img :src="item.avatar" v-if="item.avatar" />
                    <v-icon icon="mdi-image" v-else />
                  </v-avatar>
                </template>
                <v-list-item-title class="text-caption font-weight-bold">
                  {{ item.nickName }}
                </v-list-item-title>
              </v-list-item>
            </template>
            <template v-slot:[`item.createdAt`]="{ item }">
              {{ formatDateTime(item.createdAt) }}
            </template>

            <template v-slot:[`item.isDisabled`]="{ item }">
              <v-icon :color="item.isDisabled ? 'grey' : 'indigo'"
                >mdi-account-badge-outline</v-icon
              >
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                size="x-small"
                prepend-icon="mdi-send"
                variant="flat"
                color="orange-accent-1"
                @click="sendEmail(item)"
                >消息</v-btn
              >
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import BFSDK from "@/api/sdk";
import { formatDateTime } from "@/composables/time";

const items = ref([]);
const search = ref("");
const loading = ref(false);

const headers = [
  {
    title: "昵称",
    key: "nickName",
  },
  {
    title: "UID",
    key: "login",
  },
  {
    title: "手机号",
    key: "phone",
  },
  {
    title: "邮件地址",
    key: "email",
  },
  {
    title: "状态",
    key: "isDisabled",
  },
  {
    title: "创建时间",
    key: "createdAt",
  },
  {
    title: "操作",
    key: "actions",
  },
];

const sendEmail = (item) => {
  console.log(item);
};

onMounted(async () => {
  loading.value = true
  const { data, success } = await BFSDK.getUsers();
  if (success) {
    items.value = data;
  }

  loading.value =false
});

defineExpose({
  items,
});
</script>

<route lang="yaml">
meta:
  title: "客户中心"
  breadcrumb: 客户
</route>
