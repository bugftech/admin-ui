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
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <AppLabel>选择微信应用</AppLabel>
            <v-select
              :items="apps"
              v-model="selectedApp"
              item-value="appId"
              item-title="name"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :subtitle="item.raw.appId"
                ></v-list-item>
              </template>
            </v-select>
          </v-card-text>
        </v-window-item>
        <v-window-item :value="2">
          <v-card-text>
            <component
              :is="method === 'wechat' ? WechatForm : AlipayForm"
              ref="child"
              :config="{ appId: selectedApp }"
            />
          </v-card-text>
        </v-window-item>
      </v-window>
      <v-divider />
      <v-card-actions>
        <v-btn variant="text" size="small" v-if="step > 1" @click="step--"
          >上一步</v-btn
        >
        <v-spacer />
        <v-btn
          variant="flat"
          size="small"
          color="indigo"
          @click="nextOrSave"
          :disabled="!selectedApp"
        >
          {{ step === 2 ? "提交" : "下一步" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { usePayStore } from "@/store/pay";
import WechatForm from "./WechatForm.vue";
import AlipayForm from "./AlipayForm.vue";
import BFSDK from "@/api/sdk";
import { WechatApp } from "@/interfaces/apps";
import { useSnackbar } from "@/composables/snackbar";

const payStore = usePayStore();
const props = defineProps({
  // 添加支付的方式
  method: {
    type: String,
  },
});

const dialog = ref(false);
const child = ref(); // 获取子组件的表单引用
const step = ref<number>(1);
const { currentPayType } = storeToRefs(payStore);
const apps = ref<WechatApp[]>([]); //可选的applications
const selectedApp = ref();

const onClose = () => {
  dialog.value = false;
  selectedApp.value = null;
  step.value = 1;
};

const save = async () => {
  const res = await child.value.form?.validate();
  if (!res || !res.valid) return;

  const copyPay = toRaw(child.value.pay);
  if (props.method === "wechat") {
    await payStore.addWxPay(copyPay);
  }

  onClose();
  useSnackbar("添加支付成功", { icon: "mdi-check-circle" });
};

const nextOrSave = async () => {
  if (step.value < 2) {
    step.value = step.value + 1;
  } else {
    await save();
  }
};

onMounted(async () => {
  const { success, data } = await BFSDK.getApps();
  if (success) {
    apps.value = data;
  }
});
</script>
