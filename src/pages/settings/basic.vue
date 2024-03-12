<template>
  <SettingBasicProfile />
  <v-card class="mt-6">
    <v-card-text class="py-2">
      <v-row>
        <v-col cols="12" md="6">
          <div class="text-subtitle-1 font-weight-bold">为您的项目添加应用</div>
          <div class="text-caption v-label mt-2">
            要开始使用，请先从右侧选择一个平台。
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="d-flex justify-center ga-4">
            <v-spacer />
            <SettingBasicWechatMiniDialog />
            <v-divider class="my-4" vertical />
            <SettingBasicAlipayMiniDialog />
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider />
    <v-card-text class="pa-0">
      <v-row no-gutters>
        <v-col cols="12" md="4">
          <v-list v-if="miniprograms.length">
            <v-list-subheader class="text-caption font-weight-regular"
              >微信小程序</v-list-subheader
            >
            <v-list-item
              v-for="(mini, i) in miniprograms"
              :key="i"
              color="indigo"
              :active="i === currentAppIndex && currentAppType === 'wechat'"
              @click="onView('wechat', i)"
            >
              <template v-slot:prepend>
                <v-btn icon="mdi-wechat" variant="outlined" class="me-2">
                </v-btn>
              </template>
              <v-list-item-title class="text-subtitle-2">{{
                mini.name
              }}</v-list-item-title>
              <v-list-item-subtitle class="text-caption">
                {{ mini.appId }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <v-list v-if="alipays.length" density="compact">
            <v-list-subheader class="text-caption font-weight-regular"
              >支付宝小程序</v-list-subheader
            >
            <v-list-item
              v-for="(ali, i) in alipays"
              :key="i"
              color="indigo"
              :active="i === currentAppIndex && currentAppType === 'alipay'"
              @click="onView('alipay', i)"
            >
              <template v-slot:prepend>
                <v-btn icon="fa:fab fa-alipay" variant="outlined" class="me-2">
                </v-btn>
              </template>
              <v-list-item-title class="text-subtitle-2">{{
                ali.name
              }}</v-list-item-title>
              <v-list-item-subtitle class="text-caption">
                {{ ali.appId }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>
        <v-divider vertical />
        <v-col cols="12" md="8" class="px-4">
          <SettingBasicAppConfig :config="currentAppForm" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useApplicationStore } from "@/store/applications";
import { computed } from "vue";
import { storeToRefs } from "pinia";

const store = useApplicationStore();
const { miniprograms, alipays, currentAppIndex, currentAppType } =
  storeToRefs(store);

const onView = (appType, idx) => {
  store.viewApp(appType, idx);
};

const currentAppForm = computed(() => {
  const apps = currentAppType.value === "wechat" ? miniprograms.value : alipays.value;
  console.log("apps:", apps);
  return apps[currentAppIndex.value];
});


onMounted(()=>{
  
})
</script>

<route lang="yaml">
meta:
  breadcrumb: "基础信息"
</route>
