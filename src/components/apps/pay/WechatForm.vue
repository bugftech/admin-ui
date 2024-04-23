<template>
  <v-form :readonly="readonly" ref="form">
    <AppLabel>AppId</AppLabel>
    <v-text-field
      placeholder="请输入微信AppId"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
      :rules="nonEmptyRules"
      v-model="pay.appId"
    >
    </v-text-field>
    <AppLabel class="mt-4">商户ID(MchId)</AppLabel>
    <v-text-field
      placeholder="请输入微信商户ID"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
      :rules="nonEmptyRules"
      v-model="pay.mchId"
    >
    </v-text-field>

    <AppLabel class="mt-4">子商户ID(Sub MchId)</AppLabel>
    <v-text-field
      placeholder="请输入微信子商户ID"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
      v-model="pay.subMchId"
    >
    </v-text-field>

    <AppLabel class="mt-4">API证书</AppLabel>
    <v-text-field
      placeholder="请输入微信API证书"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
      v-model="pay.apiCert"
    >
    </v-text-field>

    <AppLabel class="mt-4">APIV2密钥</AppLabel>
    <v-text-field
      placeholder="请输入微信支付APIV2密钥"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
      :rules="nonEmptyRules"
      v-model="pay.apiV2Key"
    >
    </v-text-field>

    <AppLabel class="mt-4">APIV3密钥</AppLabel>
    <v-text-field
      placeholder="请输入微信支付APIV3密钥"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
      v-model="pay.apiV3Key"
    >
    </v-text-field>

    <v-switch hide-details="auto" color="red" v-model="pay.isProvider">
      <template v-slot:label>
        <div class="text-overline font-weight-bold">供应商</div></template
      >
    </v-switch>

    <AppLabel class="mt-4">回调通知地址</AppLabel>
    <v-text-field
      placeholder="请输入微信支付回调通知地址"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
      :rules="nonEmptyRules"
      v-model="pay.notifyUrl"
    >
    </v-text-field>
  </v-form>
</template>

<script setup lang="ts">
import { nonEmptyRules } from "@/composables/formRules";
import { WechatPay } from "@/interfaces/pay";

const props = defineProps({
  readonly: Boolean,
  edit: Boolean,
  config: Object as () => WechatPay | undefined,
});

const defaultPay: WechatPay = {
  appId: "",
  mchId: "",
  bfAppId: 0,
  subMchId: "",
  apiCert: "",
  apiV2Key: "",
  apiV3Key: "",
  isProvider: false,
  notifyUrl: "",
};

// 使用解构赋值合并默认对象和传入的 config 对象
const pay = reactive({ ...defaultPay, ...props.config });
const form = ref();

defineExpose({
  pay,
  form,
});
</script>
