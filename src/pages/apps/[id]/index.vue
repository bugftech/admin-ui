<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <!--面包屑-->
        <v-toolbar extended color="transparent">
          <AppBackBtn></AppBackBtn>
          <v-toolbar-title class="text-body-1 font-weight-bold">
            应用
            <v-chip size="x-small" variant="flat" color="orange-accent-2">{{
              uid
            }}</v-chip>
          </v-toolbar-title>
          <template v-slot:extension>
            <v-tabs v-model="tab" density="compact" class="text-caption">
              <v-tab value="one" class="text-caption">基础信息</v-tab>
              <v-tab value="two" class="text-caption">支付</v-tab>
              <v-tab value="three" class="text-caption">服务账号</v-tab>
              <v-tab value="four" class="text-caption">APIKeys</v-tab>
            </v-tabs>
          </template>

          <v-spacer />
          <v-btn
            variant="elevated"
            size="small"
            prepend-icon="mdi-pencil-ruler"
            color="indigo"
            >设计应用</v-btn
          >
        </v-toolbar>
        <v-divider />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card>
          <v-window v-model="tab" color="transparent">
            <v-window-item value="one" color="transparent">
              <AppsBasicInfo :config="appConfig" />
            </v-window-item>
            <v-window-item value="two">
              <AppsPay :id="appConfig.id" :appId="appConfig.appId"></AppsPay>
            </v-window-item>
            <v-window-item value="three">
              <AppsServiceAccounts />
            </v-window-item>
            <v-window-item value="four">
              <AppsServiceAccounts />
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { App } from "@/interfaces/apps";

const tab = ref();

const route = useRoute();
const uid = (route.params as { id: string }).id;

const appConfig = reactive<App>({
  id: 0,
  name: "",
  uid: "",
  appId: "",
  appSecret: "",
  appType: 0,
});

const fetchApp = async () => {
  const { success, data } = await BFSDK.getAppByUid(uid);
  if (success) Object.assign(appConfig, data);
};

onMounted(async () => {
  await Promise.all([fetchApp()]);
});
</script>

<route lang="yaml">
meta:
  title: "应用设置"
  breadcrumb: 应用设置
</route>
