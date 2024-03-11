<template>
  <v-form ref="form">
    <div class="text-caption font-weight-bold pb-2">商户ID(MchId)</div>
    <v-text-field
      placeholder="请输入微信商户ID"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
    >
    </v-text-field>

    <div class="text-caption font-weight-bold pb-2 mt-4">
      子商户ID(Sub MchId)
    </div>
    <v-text-field
      placeholder="请输入微信子商户ID"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
    >
    </v-text-field>

    <div class="text-caption font-weight-bold pb-2 mt-4">API证书</div>
    <v-text-field
      placeholder="请输入微信API证书"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
    >
    </v-text-field>

    <div class="text-caption font-weight-bold pb-2 mt-4">APIV2密钥</div>
    <v-text-field
      placeholder="请输入微信支付APIV2密钥"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
    >
    </v-text-field>

    <div class="text-caption font-weight-bold pb-2 mt-4">APIV3密钥</div>
    <v-text-field
      placeholder="请输入微信支付APIV3密钥"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
    >
    </v-text-field>

    <v-switch hide-details="auto" color="red">
      <template v-slot:label>
        <div class="text-caption font-weight-bold">供应商</div></template
      >
    </v-switch>

    <div class="text-caption font-weight-bold pb-2 mt-4">回调通知地址</div>
    <v-text-field
      placeholder="请输入微信支付回调通知地址"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
    >
    </v-text-field>
  </v-form>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  item: {
    type: Object,
  },
});

const form = ref();

defineExpose({ form });
</script>
