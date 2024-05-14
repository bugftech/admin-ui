<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12">
        <v-toolbar color="transparent">
          <AppBackBtn />
          <v-toolbar-title class="text-body-1 font-weight-bold">
            添加推荐人
          </v-toolbar-title>
          <v-spacer />
          <v-btn size="small" class="me-2" variant="tonal">取消</v-btn>
          <v-btn size="small" variant="elevated" @click="save">保存</v-btn>
        </v-toolbar>
      </v-col>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-caption">绑定信息</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <AppLabel>推荐人</AppLabel>
              <v-select
                placeholder="选择推荐人"
                hide-details="auto"
                variant="solo-filled"
                flat
                :rules="nonEmptyRules"
                v-model="editItem.userId"
                :items="users"
                item-title="email"
                item-value="id"
                class="text-caption"
              ></v-select>
              <AppLabel class="mt-4">公司</AppLabel>
              <v-text-field
                placeholder="推荐人所属公司"
                hide-details
                variant="solo-filled"
                class="text-caption"
                flat
              ></v-text-field>
              <AppLabel class="mt-4">公司地址</AppLabel>
              <v-text-field
                placeholder="公司地址"
                hide-details
                class="text-caption"
                variant="solo-filled"
                flat
              ></v-text-field>

              <AppLabel class="mt-4">联系人</AppLabel>
              <v-text-field
                placeholder="公司联系人"
                hide-details
                variant="solo-filled"
                flat
              ></v-text-field>

              <AppLabel class="mt-4">联系人电话</AppLabel>
              <v-text-field
                placeholder="公司联系人电话"
                hide-details
                class="text-caption"
                variant="solo-filled"
                flat
              ></v-text-field>
              <AppLabel class="mt-4">网站</AppLabel>
              <v-text-field
                placeholder="推荐人公司网站"
                hide-details
                class="text-caption"
                variant="solo-filled"
                flat
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-text class="dot text-center rounded-lg ma-2">
            <div>
              <v-img
                class="rounded-lg"
                src="@/assets/fingerprint.svg"
                max-width="60%"
              >
              </v-img>
            </div>
            <v-btn size="small" color="indigo">点击生成</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { User } from "@/interfaces/user";
import { UserReferral } from "@/interfaces/userReferral";

const defaultItem: UserReferral = {
  id: 0,
  tenantId: 0,
  bfAppId: 0,
  userId: null,
  referralCode: "",
  qrcodeUrl: "",
  company: "",
  companyAddress: "",
  contactPerson: "",
  phoneNumber: "",
  website: "",
  invalid: false,
};

const editItem = reactive<UserReferral>(defaultItem);
const users = ref<User[]>([]);

const fetchUsers = async () => {
  const { success, data } = await BFSDK.getUsers();
  if (!success) return;
  users.value = data;
};

const save = async () => {
  if (!editItem.userId) return;
  const { success, data, message } = await BFSDK.addReferralUser(editItem);
  if (!success) {
    useSnackbar("添加推荐人失败", {
      title: "添加推荐人失败",
      message: message,
    });
  } else {
    useSnackbar("添加推荐人成功");
  }
};

onMounted(() => {
  Promise.all([fetchUsers()]);
});
</script>

<style>
.dot {
  border-style: dotted;
}
</style>
