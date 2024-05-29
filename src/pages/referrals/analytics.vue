<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <AppBreadcrumb>
          <v-dialog width="auto">
            <template v-slot:activator="{ props }">
              <v-btn
                size="small"
                prepend-icon="mdi-link"
                variant="elevated"
                class="me-2 rounded-lg"
                v-bind="props"
                >绑定用户</v-btn
              >
            </template>
            <v-card min-width="400">
              <v-card-item>
                <v-card-title class="text-subtitle-2"> 绑定用户 </v-card-title>
                <v-card-subtitle class="text-caption">
                  将用户绑定到推荐人
                </v-card-subtitle>
              </v-card-item>
              <v-text-field
                placeholder="输入用户手机号"
                hide-details
                class="mx-4"
                flat
                v-model="phone"
                variant="solo-filled"
              >
                <template v-slot:append>
                  <v-btn
                    size="small"
                    color="indigo"
                    flat
                    :disabled="phone.length !== 11"
                    :loading="searchLoading"
                    @click="getUserByPhone"
                    >搜索</v-btn
                  >
                </template>
              </v-text-field>
              <v-divider class="mt-4" />
              <v-card-text v-if="bindUser">
                <v-list-item slim class="pa-0">
                  <template v-slot:prepend>
                    <v-avatar class="rounded-lg border">
                      <v-img :src="bindUser.avatar" v-if="bindUser.avatar" />
                      <v-icon icon="mdi-image" v-else />
                    </v-avatar>
                  </template>
                  <v-list-item-title class="text-caption font-weight-bold">
                    {{ bindUser.nickName ? bindUser.nickName : "昵称为设置" }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    {{ bindUser.phone }}
                  </v-list-item-subtitle>

                  <template v-slot:append>
                    <v-btn flat size="small" color="orange-accent-1" readonly>{{
                      bindUser.tenantId + "-" + bindUser.bfAppId
                    }}</v-btn>
                  </template>
                </v-list-item>
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-spacer />
                <v-btn size="small" color="indigo" @click="onCancelBind"
                  >取消</v-btn
                >
                <v-btn size="small" color="indigo" @click="onBindUser"
                  >提交</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-select
            variant="solo"
            label="2024/04/01 - 2024/05/01"
            value="过去一个月"
            hide-details
            width="200"
            persistent-placeholder
          ></v-select>
        </AppBreadcrumb>
      </v-col>
      <v-col cols="12" md="12">
        <v-card>
          <v-item-group v-model="tab">
            <v-row no-gutters>
              <v-col cols="12" md="6">
                <v-item v-slot="{ isSelected, toggle }">
                  <v-card
                    :class="isSelected ? 'active-border border' : ''"
                    height="100"
                    flat
                    rounded="0"
                    @click="toggle"
                  >
                    <div
                      class="d-flex align-center justify-center h-100 flex-column"
                    >
                      <div class="text-caption font-weight-bold v-label">
                        订单数据
                      </div>
                      <div class="text-subtitle-1 font-weight-bold">-</div>
                    </div>
                  </v-card>
                </v-item>
              </v-col>
              <v-col cols="12" md="6">
                <v-item v-slot="{ isSelected, toggle }">
                  <v-card
                    :class="isSelected ? 'active-border border' : ''"
                    height="100"
                    flat
                    rounded="0"
                    @click="toggle"
                  >
                    <div
                      class="d-flex align-center justify-center h-100 flex-column"
                    >
                      <div class="text-caption v-label">新推用户</div>
                      <div class="text-subtitle-1 font-weight-bold">
                        {{ users ? users.length : "-" }}
                      </div>
                    </div>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-item-group>
          <v-divider />
          <v-toolbar color="transparent">
            <v-row>
              <v-col cols="12" md="12" class="flex-row d-flex">
                <v-text-field
                  rounded="0"
                  variant="solo"
                  flat
                  hide-details
                  width="200"
                  placeholder="搜索"
                  prepend-inner-icon="mdi-magnify"
                >
                </v-text-field>
                <v-spacer />
                <v-btn
                  icon="mdi-cloud-download"
                  size="small"
                  variant="elevated"
                  class="me-2"
                ></v-btn>
              </v-col>
            </v-row>
          </v-toolbar>
          <v-divider />
          <v-data-table
            v-if="tab === 0"
            :items="orders"
            :headers="orderHeaders"
            class="text-caption"
          >
            <template v-slot:no-data>
              <v-img
                src="@/assets/online_transactions.svg"
                height="200"
                class="ma-4"
              />
              <div class="v-card-title text-subtitle-2">尚未发生交易订单</div>
              <div class="v-card-subtitle text-caption mb-8">
                快去邀请用户吧
              </div>
            </template>
          </v-data-table>
          <v-data-table
            v-if="tab === 1"
            :items="users"
            class="text-caption"
            :headers="userHeaders"
          >
            <template v-slot:no-data>
              <v-img src="@/assets/referral.svg" height="200" class="ma-4" />
              <div class="v-card-title text-subtitle-2">尚未邀请用户</div>
              <div class="v-card-subtitle text-caption mb-8">
                快去邀请用户吧
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { User } from "@/interfaces/user";
import { UserReferralInfo } from "@/interfaces/userReferral";
import { OrderInfo } from "@/services/types";

const tab = ref(0);
const route = useRoute();
const orders = ref<OrderInfo[]>([]);
const users = ref<User[]>([]);

const bindUser = ref<User>();
const phone = ref("");
const searchLoading = ref(false);

const id = (route.query as { id?: number }).id;
const fetchOrders = async () => {
  if (!id) return;
  const { data, success } = await BFSDK.getOrdersByReferralId(id);
  if (!success) return;
  orders.value = data;
};

const fetchUsers = async () => {
  if (!id) return;
  const { data, success } = await BFSDK.getUsersByReferralId(id);
  if (success) {
    users.value = data;
  }
};

const getUserByPhone = async () => {
  if (searchLoading.value) return;
  searchLoading.value = true;
  const { data, success } = await BFSDK.getUserByPhone(phone.value);
  if (success) {
    bindUser.value = data;
  } else {
    useSnackbar("获取用户失败");
  }

  searchLoading.value = false;
};

const orderHeaders: any[] = [
  {
    title: "订单编号",
    key: "id",
  },
  {
    title: "订单总金额",
    key: "totalAmount",
  },
  {
    title: "实付金额",
    key: "payAmount",
  },
  {
    title: "客户",
    key: "memberUsername",
  },
  {
    title: "订单状态",
    key: "status",
  },
  {
    title: "创建时间",
    key: "createTime",
  },
];

const userHeaders: any[] = [
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

const onCancelBind = () => {
  bindUser.value = undefined;
  phone.value = "";
};

const onBindUser = async () => {
  if (!bindUser.value || !referral.value || !id) return;
  const { success } = await BFSDK.addReferredUser(id, {
    id: 0,
    tenantId: referral.value.tenantId,
    bfAppId: referral.value.bfAppId,
    referreId: referral.value.id,
    referredId: bindUser.value.id,
    expired: false,
  });

  if (!success) {
    useSnackbar("给推荐人绑定用户失败");
  } else {
    useSnackbar("绑定用户成功");
    Promise.all([fetchOrders(), fetchUsers()]);
  }
};

const referral = ref<UserReferralInfo>();

const fetchReferral = async () => {
  if (!id) return;
  const { success, data } = await BFSDK.getReferralById(id);
  if (success) {
    referral.value = data;
  }
};

onMounted(() => {
  if (!id) return;
  Promise.all([fetchReferral(), fetchOrders(), fetchUsers()]);
});
</script>

<route lang="yaml">
meta:
  title: "推荐人管理"
  breadcrumb: "推荐人管理"
</route>

<style>
.active-border {
  border-top: 4px solid #3f51b5 !important;
}
</style>
