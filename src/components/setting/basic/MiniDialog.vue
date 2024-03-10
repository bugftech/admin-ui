<template>
  <v-dialog max-width="800" v-model="dialog" persistent>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-wechat" size="large" v-bind="props" variant="outlined" />
    </template>
    <v-card>
      <v-toolbar>
        <v-toolbar-title class="text-body-1 font-weight-bold">
          注册微信小程序应用
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-close" @click="onClose" />
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-label class="text-caption font-weight-medium mb-2">名称</v-label>
          <v-text-field
            variant="solo-filled"
            flat
            v-model="state.name"
          ></v-text-field>

          <v-label class="text-caption font-weight-medium mb-2 mt-4"
            >微信小程序App ID</v-label
          >
          <v-text-field
            variant="solo-filled"
            flat
            v-model="state.appId"
          ></v-text-field>
          <v-label class="text-caption font-weight-medium mb-2 mt-4"
            >微信小程序App Secret</v-label
          >
          <v-text-field
            variant="solo-filled"
            flat
            v-model="state.appSecret"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          size="small"
          color="indigo"
          variant="flat"
          prepend-icon="mdi-check"
          @click="onSubmit"
        >
          注册应用
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useApplicationStore } from "@/store/applications";

const store = useApplicationStore();

const dialog = ref(false);
// 创建一个符合 MiniConfig 类型要求的对象
const state = reactive({
  name: "",
  appId: "",
  appSecret: "",
});

const onClose = () => {
  state.name = "";
  state.appId = "";
  state.appSecret = "";
  dialog.value = false;
};

const onSubmit = () => {
  store.addMiniApp({
    name: state.name,
    appId: state.appId,
    appSecret: state.appSecret,
  });
  onClose();
};
</script>
