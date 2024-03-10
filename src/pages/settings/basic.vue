<template>
  <SettingBasicProfile />
  <v-card class="mt-6">
    <v-card-text class="py-12">
      <v-row>
        <v-col cols="12" md="6">
          <div class="text-h6">您的项目中没有任何应用</div>
          <div class="text-caption v-label mt-4">
            要开始使用，请先选择一个平台
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="d-flex justify-center ga-4">
            <SettingBasicMiniDialog />
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <v-card class="mt-6">
    <v-toolbar color="transparent">
      <v-toolbar-title class="text-caption font-weight-bold"
        >应用</v-toolbar-title
      >
      <v-spacer />
      <v-btn variant="flat" size="small" color="indigo">
        添加一个新的应用
      </v-btn>
    </v-toolbar>
    <v-divider />
    <v-card-text class="pa-0">
      <v-row no-gutters>
        <v-col cols="12" md="4">
          <v-list>
            <v-list-subheader class="text-caption font-weight-regular"
              >微信小程序</v-list-subheader
            >
            <v-list-item
              v-for="(mini, i) in miniprograms"
              :key="i"
              @click="onViewMini(i)"
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
        </v-col>
        <v-divider vertical />
        <v-col cols="12" md="8">
          {{ viewItem }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useApplicationStore } from "@/store/applications";
import { toRaw, reactive } from "vue";
const store = useApplicationStore();
const { miniprograms } = storeToRefs(store);

const viewItem = reactive({});
const onViewMini = (idx) => {
  viewItem.type = "wechat";
  viewItem.data = toRaw(store.viewMiniApp(idx));
  console.log("viewItem", viewItem);
};
</script>

<route lang="yaml">
meta:
  breadcrumb: "基础信息"
</route>
