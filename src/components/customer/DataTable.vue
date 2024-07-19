<template>
  <AppToolkitBar>
    <v-btn append-icon="mdi-link" theme="dark" variant="flat" size="small"
      >邀请用户</v-btn
    >
    <v-divider class="mx-2 my-3" vertical />

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
  </AppToolkitBar>

  <v-data-table
    :search="search"
    class="text-caption"
    :items="items"
    :headers="headers"
    :loading="loading"
    @click:row="onClickRow"
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
          {{ item.nickName ? item.nickName : "昵称为设置" }}
        </v-list-item-title>
      </v-list-item>
    </template>
    <template v-slot:[`item.createdAt`]="{ item }">
      {{ item.createdAt ? formatDateTime(item.createdAt) : "" }}
    </template>
    <template v-slot:[`item.phone`]="{ item }">
      {{ item.phone ? item.phone : "尚未绑定手机号" }}
    </template>
    <template v-slot:[`item.email`]="{ item }">
      <div>
        {{ item.email
        }}<v-icon class="ms-2">{{
          item.emailVerified ? "mdi-email-check" : "mdi-email-alert-outline"
        }}</v-icon>
      </div>
    </template>

    <template v-slot:[`item.bfAppId`]="{ item }">
      <v-chip size="x-small" color="red">{{
        item.bfAppId === 0 ? "管理员" : item.bfAppId
      }}</v-chip>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon class="me-2" @click="disableUser(item)">mdi-cancel</v-icon>
      <v-icon @click="deleteUser(item)">mdi-trash-can</v-icon>
    </template>
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
  </v-data-table>

  <AppConfirmDialog ref="confirm"> </AppConfirmDialog>
</template>

<script setup lang="ts">
import { User } from "@/sdk/user/types";
import { formatDateTime } from "@/composables/time";
import router from "@/router";
import bugfreed from "@/sdk";
import { UserService } from "@/sdk/user/user";

const user = new UserService({ bugfreed });
const items = ref<User[]>([]);
const search = ref("");
const loading = ref(false);

const headers: any[] = [
  {
    title: "昵称",
    key: "nickName",
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
    title: "应用ID",
    key: "bfAppId",
  },
  {
    title: "来源",
    key: "source",
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

const confirm = ref();
const fetch = async () => {
  loading.value = true;
  const { data, success } = await user.list();
  if (success) {
    items.value = data;
  }

  loading.value = false;
};

onMounted(async () => {
  await fetch();
});

const onClickRow = (e: any, selected: any) => {
  const { id } = selected.item;
  if (!id) return;

  router.push({
    name: "/customers/[id]",
    params: {
      id: id,
    },
  });
};

const disableUser = async (item: User) => {};

const deleteUser =(item: User) => {
  alert("暂不支持删除客户")
};

defineExpose({
  items,
});
</script>
