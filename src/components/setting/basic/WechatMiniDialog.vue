<template>
  <v-dialog max-width="800" v-model="dialog" persistent>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-wechat" v-bind="props" variant="text" class="border" />
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
        <v-form ref="form">
          <AppLabel>名称</AppLabel>
          <v-text-field
            variant="solo-filled"
            flat
            :rules="nonEmptyRules"
            v-model="state.name"
          ></v-text-field>

          <AppLabel class="mt-4">微信小程序App ID</AppLabel>
          <v-text-field
            variant="solo-filled"
            flat
            :rules="nonEmptyRules"
            v-model="state.appId"
          ></v-text-field>
          <AppLabel class="mt-4">微信小程序App Secret</AppLabel>
          <v-text-field
            variant="solo-filled"
            flat
            :rules="nonEmptyRules"
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
          :loading="loading"
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
import { AppType, WechatApp } from "@/interfaces/apps";
import { nonEmptyRules } from "@/composables/formRules";

const store = useApplicationStore();
const dialog = ref(false);
const loading = ref(false);
const form = ref();

const state = reactive<WechatApp>({
  name: "",
  appId: "",
  appSecret: "",
});

const onClose = () => {
  Object.assign(state, { name: "", appId: "", appSecret: "" });
  dialog.value = false;
};

const onSubmit = async () => {
  const res = await form.value.validate();
  if (!res.valid) return;

  loading.value = true;
  store.addApp(AppType.Wechat, { ...state });
  setTimeout(() => {
    loading.value = false;
    onClose();
  }, 2000);
};
</script>
