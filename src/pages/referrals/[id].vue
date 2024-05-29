<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12">
        <v-toolbar color="transparent">
          <AppBackBtn />
          <v-toolbar-title class="text-body-1 font-weight-bold">
            编辑推荐人信息
          </v-toolbar-title>
          <v-spacer />
          <v-btn size="small" class="me-2" variant="tonal">取消</v-btn>
          <v-btn size="small" variant="elevated" @click="update">保存</v-btn>
        </v-toolbar>
      </v-col>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-caption mt-2">绑定信息</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                label="推荐人ID"
                placeholder="绑定的推荐人id"
                hint="绑定的推荐人id,不可变更。"
                v-model="editItem.userId"
                variant="solo-filled"
                density="comfortable"
                flat
                disabled
                persistent-hint
                persistent-placeholder
              >
              </v-text-field>
              <v-text-field
                v-model="editItem.company"
                class="mt-4"
                label="公司(可选)"
                placeholder="推荐人公司"
                hint="推荐人绑定的公司"
                variant="solo-filled"
                density="comfortable"
                flat
                persistent-hint
                persistent-placeholder
              />

              <v-text-field
                v-model="editItem.companyAddress"
                class="mt-4"
                label="公司地址(可选)"
                placeholder="推荐人公司地址"
                hint="公司地址"
                variant="solo-filled"
                density="comfortable"
                flat
                persistent-hint
                persistent-placeholder
              />

              <v-text-field
                v-model="editItem.contactPerson"
                class="mt-4"
                label="联系人姓名(可选)"
                placeholder="联系人姓名"
                hint="联系人姓名"
                variant="solo-filled"
                density="comfortable"
                flat
                persistent-hint
                persistent-placeholder
              />

              <v-text-field
                v-model="editItem.phoneNumber"
                class="mt-4"
                label="联系人手机号(可选)"
                placeholder="联系人手机号"
                hint="联系人手机号"
                variant="solo-filled"
                density="comfortable"
                flat
                persistent-hint
                persistent-placeholder
              />

              <v-text-field
                v-model="editItem.website"
                class="mt-4"
                label="网站(可选)"
                placeholder="网站"
                hint="网站"
                variant="solo-filled"
                density="comfortable"
                flat
                persistent-hint
                persistent-placeholder
              />
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <UploadQrcode
          ref="codeRef"
          :code="editItem.referralCode ? editItem.referralCode : ''"
          :url="editItem.qrcodeUrl ? editItem.qrcodeUrl : ''"
          :uid="uid ? uid : ''"
        /> 
      </v-col>
      <v-col cols="12">
        <v-btn size="small" color="red">删除推荐人</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { UserReferral } from "@/interfaces/userReferral";
import { UserProfile } from "@/store/user";
import { API } from "@/services";

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
const uid = ref("");

const route = useRoute();
const id = (route.params as { id: number }).id;
const codeRef = ref();

const update = async () => {
  if (!editItem.referralCode) return;
  await uploadQrcode();
  const { success } = await BFSDK.updateReferralById(id, editItem);
  if (!success) {
    useSnackbar("推荐人信息更新失败");
  } else {
    useSnackbar("推荐人信息更新成功");
  }
};

const uploadQrcode = async () => {
  const { success, data } = await codeRef.value.UploadQrcode();
  if (!success) return;
  editItem.qrcodeUrl = data.url;
};

onMounted(async () => {
  if (!id) return;
  const { data, success } = await BFSDK.getReferralById(id);
  if (!success) return;
  Object.assign(editItem, data);
  const res = await API.bugfreed.getByURL<UserProfile>("/users/profile");
  if (res.status === 200) {
    uid.value = res.data.data.uid
  }
});
</script>
