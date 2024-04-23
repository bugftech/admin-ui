<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-toolbar
          color="transparent
        "
        >
          <AppBackBtn />
          <v-toolbar-title class="text-body-1 font-weight-bold">
            创建应用
          </v-toolbar-title>
          <v-spacer />
          <v-btn variant="tonal" size="small" class="me-2" @click="cancel"
            >取消</v-btn
          >
          <v-btn variant="elevated" size="small" @click="save">确定</v-btn>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-form ref="form">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-text>
              <AppLabel>应用名称</AppLabel>
              <v-text-field
                variant="solo-filled"
                flat
                :rules="nonEmptyRules"
                density="compact"
                placeholder="输入您的应用名称"
                v-model="editItem.name"
              ></v-text-field>

              <div class="mt-4">
                <AppLabel>应用类型</AppLabel>
                <div>
                  <v-btn-toggle
                    v-model.number="editItem.appType"
                    type="number"
                    density="compact"
                    class="border"
                    divided
                  >
                    <v-btn value="0" size="small">微信</v-btn>
                    <v-btn value="1" size="small">支付宝</v-btn>
                    <v-btn value="2" size="small" disabled>WEB</v-btn>
                  </v-btn-toggle>
                </div>
              </div>

              <AppLabel class="mt-4">AppId</AppLabel>
              <v-text-field
                variant="solo-filled"
                flat
                :rules="nonEmptyRules"
                density="compact"
                placeholder="输入您的应用ID"
                v-model="editItem.appId"
              ></v-text-field>

              <AppLabel class="mt-4">AppSecret</AppLabel>
              <v-text-field
                variant="solo-filled"
                flat
                :rules="nonEmptyRules"
                density="compact"
                placeholder="输入您的应用Secret"
                v-model="editItem.appSecret"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { App } from "@/interfaces/apps";
import { nonEmptyRules } from "@/composables/formRules";
import BFSDK from "@/api/sdk";

const defaultItem: App = {
  id: 0,
  name: "",
  uid: "",
  appId: "",
  appSecret: "",
  appType: 0,
};

const editItem = reactive<App>(defaultItem);
const router = useRouter();

const cancel = () => {
  Object.assign(editItem, defaultItem);
  router.back();
};

const form = ref();
const save = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;
  const { success, data } = await BFSDK.createApp(editItem);
  if (success) {
    useSnackbar("添加成功");
    router
      .push({
        name: "/apps/[id]/",
        params: {
          id: data.uid,
        },
      })
      .then(() => {
        Object.assign(editItem, defaultItem)
      });
  } else {
    useSnackbar("创建应用失败");
  }
};
</script>

<route lang="yaml">
meta:
  title: "新建应用"
  breadcrumb: "新建应用"
</route>
