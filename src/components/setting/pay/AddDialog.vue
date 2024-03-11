<template>
  <!--eager 强制内容渲染。要不然无法引入ref获取子组件的状态-->
  <v-dialog max-width="800" v-model="dialog" eager scrollable>
    <template v-slot:activator="{ props }">
      <v-btn
        :icon="method === 'alipay' ? 'fa:fab fa-alipay' : 'mdi-wechat'"
        v-bind="props"
        variant="outlined"
      />
    </template>
    <v-card>
      <v-toolbar>
        <v-toolbar-title class="text-body-1 font-weight-bold">
          添加{{ method === "wechat" ? "微信支付" : "支付宝支付" }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-close" @click="onClose" />
      </v-toolbar>
      <v-card-text>
        <component
          :is="method === 'wechat' ? WechatForm : AlipayForm"
          ref="child"
        />
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn variant="tonal" size="small">取消</v-btn>
        <v-btn variant="flat" size="small" color="indigo" @click="save"
          >确认</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, toRaw } from "vue";
import { usePayStore, PayType } from "@/store/pay";
import WechatForm from "./WechatForm.vue";
import AlipayForm from "./AlipayForm.vue";
import { storeToRefs } from "pinia";

const props = defineProps({
  // 添加支付的方式
  method: {
    type: String,
  },
});

const { method } = props;
const dialog = ref(false);
const onClose = () => {};
const child = ref(); // 获取子组件的表单引用
const payStore = usePayStore();
const { currentPayType } = storeToRefs(payStore);
const save = async () => {
  const res = await child.value.form?.validate();
  if (!res.valid) return;

  const copyPay = toRaw(child.value.pay);
  if (currentPayType.value === PayType.Wechat) {
    payStore.addWxPay(copyPay);
  }
};
</script>
