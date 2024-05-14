<template>
  <v-card class="mt-2">
    <v-toolbar density="compact" color="transparent">
      <v-btn icon="mdi-sync" />
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
        {{ formatDateTime(item.createdAt) }}
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
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props">
            </v-btn>
          </template>
          <v-list nav density="compact">
            <v-list-item slim link @click="upateReferral(item)">
              <template v-slot:prepend>
                <v-icon>mdi-account-star</v-icon>
              </template>
              <v-list-item-title class="text-caption">
                设置为推荐人
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
    </v-data-table>
  </v-card>

  <AppConfirmDialog ref="confirm"> </AppConfirmDialog>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { User } from "@/interfaces/user";
import { formatDateTime } from "@/composables/time";

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
    title: "创建时间",
    key: "createdAt",
  },
  {
    title: "操作",
    key: "actions",
  },
];

const confirm = ref();

onMounted(async () => {
  loading.value = true;
  const { data, success } = await BFSDK.getUsers();
  if (success) {
    items.value = data;
  }

  loading.value = false;
});

const upateReferral = (item: User) => {
  confirm.value
    .open(
      "将用户设置为推荐人",
      "推荐人可能会享有订单收益分成，具体查看推荐人设置。"
    )
    .then(async (ok: boolean) => {
      if (ok) {
        const { success, data } = await BFSDK.addReferralUser({
          id: 0,
          tenantId: item.tenantId,
          bfAppId: item.bfAppId,
          userId: item.id,
          referralCode: "",
          invalid: false,
          qrcodeUrl: "",
        });

        if (success) {
          useSnackbar("设置为推荐成功");
        } else {
          useSnackbar("设置为推荐失败");
        }
      }
    });
};

defineExpose({
  items,
});
</script>
