<template>
  <v-card>
    <v-toolbar color="transparent">
      <v-toolbar-title class="text-subtitle-2 font-weight-bold">配置信息</v-toolbar-title>
      <v-spacer />
      <v-btn
        :icon="!canEdit ? 'mdi-pencil' : 'mdi-pencil-off'"
        size="small"
        @click="canEdit = !canEdit"
      ></v-btn>
    </v-toolbar>
    <v-divider />
    <v-card-text>
      <v-form :readonly="!canEdit" ref="form">
        <AppLabel class="mt-4">App名称</AppLabel>
        <v-text-field
          variant="solo-filled"
          flat
          :focused="canEdit"
          density="compact"
          v-model="localConfig.name"
          :rules="nonEmptyRules"
        ></v-text-field>

        <AppLabel class="mt-4">UUID</AppLabel>
        <v-text-field
          variant="solo-filled"
          flat
          density="compact"
          readonly
          persistent-hint
          hint="UUID由系统生成，不可变更"
          append-icon="mdi-content-copy"
          v-model="localConfig.uid"
          @click:append="copy"
        ></v-text-field>

        <AppLabel class="mt-4">App ID</AppLabel>
        <v-text-field
          variant="solo-filled"
          flat
          :focused="canEdit"
          density="compact"
          :rules="nonEmptyRules"
          v-model="localConfig.appId"
        ></v-text-field>

        <AppLabel class="mt-4">App Secret</AppLabel>
        <v-text-field
          variant="solo-filled"
          flat
          :focused="canEdit"
          density="compact"
          :rules="nonEmptyRules"
          v-model="localConfig.appSecret"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <div class="my-4 text-center" v-if="canEdit">
      <v-btn
        size="small"
        variant="tonal"
        @click="cancel"
        class="me-2"
        prepend-icon="mdi-close"
        >取消</v-btn
      >
      <v-btn
        size="small"
        variant="flat"
        @click="save"
        color="indigo"
        prepend-icon="mdi-check"
      >
        保存
      </v-btn>
    </div>
    <v-divider />
    <div class="text-center py-4" v-if="!canEdit">
      <v-btn
        variant="tonal"
        color="red"
        rounded
        size="small"
        @click="deleteApp"
        prepend-icon="mdi-delete"
        >删除此应用</v-btn
      >
    </div>
  </v-card>
  <AppConfirmDialog ref="confirm" />
</template>

<script setup>
import { ref, toRefs } from "vue";
import { copyToClipboardFormatted } from "@/composables/copy";
import { useApplicationStore } from "@/store/applications";

const appStore = useApplicationStore();
const props = defineProps({
  config: {
    type: Object,
    default: () => ({}),
  },
});

const canEdit = ref(false);
const { config } = toRefs(props);
const localConfig = ref({ ...props.config });

watchEffect(() => {
  localConfig.value = { ...props.config };
});

// 确认删除
const confirm = ref();
const form = ref();

const copy = () => {
  let str = localConfig.value.uuid ? localConfig.value.uuid : "";
  return copyToClipboardFormatted(str);
};

const deleteApp = async () => {
  const res = await confirm.value.open(
    `确定删除应用 ${localConfig.value.name} 吗？`,
    "删除应用则无法在APP端继续使用绑定的数据，请确认好再操作！"
  );

  if (!res) return;
  appStore.deleteApp(localConfig.value.id);
};

const cancel = () => {
  localConfig.value = { ...config.value };
  canEdit.value = false;
};

const save = async () => {
  const valid = await form.value.validate();
  if (!valid) return;
  // 修改App
  appStore.updateApp(localConfig.value.id, localConfig.value);
  canEdit.value = false;
};
</script>
