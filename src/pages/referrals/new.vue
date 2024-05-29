<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" md="8">
        <v-toolbar color="transparent">
          <AppBackBtn />
          <v-toolbar-title class="text-body-1 font-weight-bold">
            添加推荐人
          </v-toolbar-title>
          <v-spacer />
          <v-btn size="small" class="me-2" variant="tonal" @click="cancel"
            >取消</v-btn
          >
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
                v-model="chooseUser"
                :items="users"
                item-title="phone"
                item-value="id"
                return-object
                class="text-caption"
              ></v-select>
              <AppLabel class="mt-4">公司</AppLabel>
              <v-text-field
                placeholder="推荐人所属公司"
                hide-details
                variant="solo-filled"
                class="text-caption"
                v-model="editItem.company"
                flat
              ></v-text-field>
              <AppLabel class="mt-4">公司地址</AppLabel>
              <v-text-field
                placeholder="公司地址"
                hide-details
                class="text-caption"
                variant="solo-filled"
                v-model="editItem.companyAddress"
                flat
              ></v-text-field>

              <AppLabel class="mt-4">联系人</AppLabel>
              <v-text-field
                placeholder="公司联系人"
                hide-details
                variant="solo-filled"
                v-model="editItem.contactPerson"
                flat
              ></v-text-field>

              <AppLabel class="mt-4">联系人电话</AppLabel>
              <v-text-field
                placeholder="公司联系人电话"
                hide-details
                class="text-caption"
                variant="solo-filled"
                v-model="editItem.phoneNumber"
                flat
              ></v-text-field>
              <AppLabel class="mt-4">网站</AppLabel>
              <v-text-field
                placeholder="推荐人公司网站"
                hide-details
                class="text-caption"
                variant="solo-filled"
                v-model="editItem.website"
                flat
              ></v-text-field>
            </v-form>
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

const chooseUser = ref<User>();

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
  if (data && data.length) {
    const usersWithPhone = data.filter((item: User) => item.phone !== "");
    users.value = usersWithPhone;
  }
};

const save = async () => {
  if (chooseUser === undefined || !chooseUser.value) return;

  editItem.bfAppId = chooseUser.value.bfAppId;
  editItem.userId = chooseUser.value.id;
  const { success, message } = await BFSDK.addReferralUser(editItem);
  if (!success) {
    useSnackbar("添加推荐人失败", {
      title: "添加推荐人失败",
      message: message,
    });
  } else {
    useSnackbar("添加推荐人成功");
  }
};

const router = useRouter();
const cancel = () => {
  Object.assign(editItem, defaultItem);
  router.back();
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
