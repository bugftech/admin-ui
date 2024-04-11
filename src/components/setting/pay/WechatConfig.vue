<template>
  <v-toolbar color="transparent" :loading="true">
    <div class="text-subtitle-2 font-weight-medium">配置信息</div>
    <v-spacer />
    <v-btn
      :icon="!canEdit ? 'mdi-lock' : 'mdi-lock-open'"
      size="small"
      @click="canEdit = !canEdit"
    ></v-btn>
  </v-toolbar>
  <SettingPayWechatForm
    :readonly="!canEdit"
    :config="localPay"
    ref="formRef"
  />
  <div class="mt-8 text-center" v-if="canEdit">
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
  <v-divider class="my-8" />
  <div class="text-center pb-4 mt-12">
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

  <AppConfirmDialog ref="confirm" />
</template>

<script setup lang="ts">
import { wechatPay } from "@/store/pay";
import { usePayStore } from "@/store/pay";

const props = defineProps<{
  pay: wechatPay | undefined;
}>();

const canEdit = ref(false);
const payStore = usePayStore();
const localPay = ref<wechatPay | undefined>(undefined);

watchEffect(() => {
  localPay.value = props.pay ? { ...props.pay } : undefined;
});

// 确认删除
const confirm = ref();
// 表单
const formRef = ref();

const deletePay = async () => {
  if (!localPay.value) return;
  const res = await confirm.value.open(
    `确定删除支付 ${localPay.value.mchId} 吗？`,
    "删除应用则无法在APP端继续使用绑定的支付方式，请确认好再操作！"
  );
};

const cancel = () => {
  if (!localPay.value) return;
  localPay.value = props.pay ? { ...props.pay } : undefined; // 恢复原始值
  canEdit.value = false;
};

const save = async () => {
  const res = await formRef.value.form.validate();
  if (!res.valid) return;

  const copyPay = toRaw(formRef.value.pay);
  payStore.updateWxPay(copyPay);
  canEdit.value = false;
};
</script>
