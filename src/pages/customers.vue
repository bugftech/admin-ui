<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb></AppBreadcrumb>
        <v-card class="mt-2">
          <v-toolbar density="compact" color="transparent">
            <v-responsive max-width="344">
              <v-text-field
                flat
                density="compact"
                variant="solo-filled"
                placeholder="检索"
                class="ms-2"
                prepend-inner-icon="mdi-magnify"
                v-model="search"
              >
              </v-text-field>
            </v-responsive>
            <v-spacer />
            <v-toolbar-items>
              <v-btn icon="mdi-download"></v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-divider />
          <v-data-table
            :seach="search"
            class="text-caption"
            :items="users"
            :headers="headers"
          >
            <template v-slot:[`item.createdAt`]="{ item }">
              {{ formatDateTime(item.createdAt) }}
            </template>

            <template v-slot:[`item.isDisabled`]="{ item }">
              <v-icon v-if="item.isDisabled" color="grey">mdi-wifi-off</v-icon>
              <v-icon v-else>mdi-wifi</v-icon>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                size="x-small"
                prepend-icon="mdi-send"
                variant="flat"
                color="orange-accent-2"
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

const users = ref([]);
const search = ref("");

const headers = [
  {
    title: "昵称",
    key: "nickName",
  },
  {
    title: "手机号",
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

onMounted(async () => {
  const { data, success } = await BFSDK.getUsers();
  if (success) {
    users.value = data;
  }
});
</script>

<route lang="yaml">
meta:
  breadcrumb: 客户
</route>
