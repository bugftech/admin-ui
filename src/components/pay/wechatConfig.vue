<template>
  <v-form>
    <div class="text-overline">商户ID(MchId)</div>
    <v-text-field
      placeholder="请输入微信商户ID"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
    >
    </v-text-field>

    <div class="text-overline mt-2">子商户ID(Sub MchId)</div>
    <v-text-field
      placeholder="请输入微信子商户ID"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
    >
    </v-text-field>

    <div class="text-overline mt-2">API证书</div>
    <v-text-field
      placeholder="请输入微信API证书"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
    >
    </v-text-field>

    <div class="text-overline mt-2">APIV2密钥</div>
    <v-text-field
      placeholder="请输入微信支付APIV2密钥"
      hide-details="auto"
      density="compact"
      variant="solo-filled"
      flat
    >
    </v-text-field>

    <div class="text-overline mt-2">APIV3密钥</div>
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
        <div class="text-overline font-weight-bold">供应商</div></template
      >
    </v-switch>

    <div class="text-overline">回调通知地址</div>
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

<script setup lang="ts">
</script>
