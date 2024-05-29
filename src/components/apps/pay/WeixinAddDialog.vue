<template>
  <!--eager 强制内容渲染。要不然无法引入ref获取子组件的状态-->
  <v-dialog max-width="800" v-model="dialog" eager scrollable>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-wechat" v-bind="props" variant="outlined" />
    </template>
    <v-card>
      <v-toolbar color="transparent" density="compact">
        <v-toolbar-title class="text-subtitle-2 font-weight-bold">
          添加微信支付
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-close" @click="onClose" />
      </v-toolbar>
      <v-divider />
      <v-card-text>
        <AppsPayWechatForm ref="child" />
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn variant="flat" size="small" color="indigo" @click="save">
          提交
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { useSnackbar } from "@/composables/snackbar";

const props = defineProps({
  id: Number, // bfAppId
});

const localId = ref();

watchEffect(() => {
  localId.value = props.id;
});

const route = useRoute()

const dialog = ref(false);
const child = ref(); // 获取子组件的表单引用

const onClose = () => {
  dialog.value = false;
};


const emit = defineEmits(['refresh'])

const save = async () => {
  if (!localId.value || localId.value === 0) return;
  /*
  const res = await child.value.form?.validate();
  if (!res || !res.valid) return;
  const copyPay = toRaw(child.value.pay);
  const { success } = await BFSDK.addPay(localId.value,copyPay);
  if (success) {
    useSnackbar("添加支付成功", { icon: "mdi-check-circle" });
    emit("refresh")
  } else {
    useSnackbar("添加失败");
  }
  */
  onClose();
};

onMounted(() => {});
</script>
