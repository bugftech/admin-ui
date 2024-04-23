<template>
  <v-card flat>
    <v-toolbar color="transparent" :loading="true" density="compact">
      <v-toolbar-title class="text-subtitle-2 font-weight-medium"
        >配置信息</v-toolbar-title
      >
      <v-spacer />
      <v-btn
        :icon="!canEdit ? 'mdi-pencil' : 'mdi-pencil-off'"
        size="small"
        @click="canEdit = !canEdit"
      ></v-btn>
    </v-toolbar>
    <v-divider />
    <v-card-text>
      <AppsPayWechatForm
        :readonly="!canEdit"
        :config="localPay"
        ref="formRef"
      />
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
        @click="deletePay"
        prepend-icon="mdi-delete"
        >删除此支付</v-btn
      >
    </div>
  </v-card>
  <AppConfirmDialog ref="confirm" />
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { WechatPay } from "@/interfaces/pay";

const props = defineProps<{
  pay: WechatPay | undefined;
}>();

const canEdit = ref(false);
const localPay = ref<WechatPay | undefined>(undefined);

watchEffect(() => {
  localPay.value = props.pay ? { ...props.pay } : undefined;
});

// 确认删除
const confirm = ref();
// 表单
const formRef = ref();

const deletePay = async () => {
  if (!localPay.value) return;
  const res = await confirm.value
    .open(
      `确定删除支付 ${localPay.value.mchId} 吗？`,
      "删除应用则无法在APP端继续使用绑定的支付方式，请确认好再操作！"
    )
    .then(() => {
      console.log("app pay");
    });
};

const cancel = () => {
  if (!localPay.value) return;
  localPay.value = props.pay ? { ...props.pay } : undefined; // 恢复原始值
  canEdit.value = false;
};

const save = async () => {
  if (!localPay.value) return;
  const res = await formRef.value.form.validate();
  if (!res.valid || !localPay.value.id) return;
  const copyPay = toRaw(formRef.value.pay);
  const { success } = await BFSDK.updateAppPay(
    localPay.value.bfAppId,
    localPay.value.id,
    copyPay
  );
  if (success) {
    useSnackbar("更新支付信息成功");
  } else {
    useSnackbar("更新支付信息失败");
  }

  canEdit.value = false;
};
</script>
