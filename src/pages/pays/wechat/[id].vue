<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12">
        <v-toolbar color="transparent">
          <AppBackBtn />
          <v-toolbar-title class="text-body-1 font-weight-bold">
            编辑微信支付
          </v-toolbar-title>
          <v-spacer />
          <v-btn size="small" class="me-2" variant="tonal" @click="cancel"
            >取消</v-btn
          >
          <v-btn size="small" variant="elevated" @click="update">保存</v-btn>
        </v-toolbar>
      </v-col>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-subtitle-2 my-2">基础配置</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                placeholder="请输入微信AppId"
                hide-details="auto"
                density="comfortable"
                variant="solo-filled"
                flat
                label="AppId"
                persistent-hint
                persistent-placeholder
                hint="微信支付绑定的APP ID"
                :rules="nonEmptyRules"
                v-model="pay.appId"
                append-icon="mdi-content-copy"
                @click:append="copyAppId"
              >
              </v-text-field>
              <v-text-field
                placeholder="请输入微信商户ID"
                hide-details="auto"
                density="comfortable"
                variant="solo-filled"
                flat
                class="mt-4"
                label="商户ID(MchId)"
                hint="微信支付绑定的商户ID(MchId)"
                persistent-hint
                persistent-placeholder
                :rules="nonEmptyRules"
                v-model="pay.mchId"
              >
              </v-text-field>

              <div class="v-card-title text-subtitle-2 mt-4">高级设置</div>
              <div class="v-card-subtitle text-caption">
                供应商模式下，需要制定子商户ID，详情查看微信支付文档。
              </div>
              <v-switch
                hide-details="auto"
                color="indigo"
                class="ml-2 mt-2"
                density="comfortable"
                v-model="pay.isProvider"
              >
                <template v-slot:label>
                  <div class="text-overline font-weight-bold">
                    供应商
                  </div></template
                >
              </v-switch>

              <v-text-field
                placeholder="请输入微信子商户ID"
                hide-details="auto"
                density="comfortable"
                variant="solo-filled"
                flat
                v-if="pay.isProvider"
                v-model="pay.subMchId"
                class="mt-2"
                label="子商户ID(Sub MchId)"
                hint="微信支付绑定的子商户ID(Sub MchId)"
                persistent-hint
                persistent-placeholder
              >
              </v-text-field>

              <v-text-field
                placeholder="请输入微信API证书"
                hide-details="auto"
                density="comfortable"
                variant="solo-filled"
                flat
                v-model="pay.apiCert"
                class="mt-4"
                label="API证书"
                hint="微信支付绑定的API证书"
                persistent-hint
                persistent-placeholder
              >
              </v-text-field>
              <v-text-field
                placeholder="请输入微信支付APIV2密钥"
                hide-details="auto"
                density="comfortable"
                variant="solo-filled"
                flat
                :rules="nonEmptyRules"
                v-model="pay.apiV2Key"
                class="mt-4"
                label="APIV2密钥"
                hint="微信支付绑定的APIV2密钥"
                persistent-hint
                persistent-placeholder
              >
              </v-text-field>

              <v-text-field
                placeholder="请输入微信支付APIV3密钥"
                hide-details="auto"
                density="comfortable"
                variant="solo-filled"
                flat
                v-model="pay.apiV3Key"
                class="mt-4"
                label="APIV3密钥"
                hint="微信支付绑定的APIV3密钥"
                persistent-hint
                persistent-placeholder
              >
              </v-text-field>

              <v-text-field
                placeholder="请输入微信支付回调通知地址"
                hide-details="auto"
                density="comfortable"
                variant="solo-filled"
                flat
                readonly
                persistent-hint
                hint="该接口用于微信服务器端往应用服务推送订单支付信息"
                v-model="pay.notifyUrl"
                class="mt-4"
                label="notifyURL"
                persistent-placeholder
              >
              </v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-btn size="small" color="red">删除此支付</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { nonEmptyRules } from "@/composables/formRules";
import { WechatPay } from "@/interfaces/pay";
import BFSDK from "@/api/sdk";

const router = useRouter();
const route = useRoute();
const defaultPay: WechatPay = {
  appId: "",
  mchId: "",
  bfAppId: 0,
  subMchId: "",
  apiCert: "",
  apiV2Key: "",
  apiV3Key: "",
  isProvider: false,
  notifyUrl: "https://apiv3.bugfreed.com/pays/wechat/callback",
};

// 使用解构赋值合并默认对象和传入的 config 对象
const pay = reactive({ ...defaultPay });
const form = ref();

const update = async () => {
  const res = await form.value.validate();
  if (!res || !res.valid) return;
  const { success } = await BFSDK.updateWechatPay(id, pay);
  if (success) {
    useSnackbar("更新支付成功", { icon: "mdi-check-circle" });
  } else {
    useSnackbar("更新支付失败");
  }
};

const id = (route.params as { id: number }).id;
const copyAppId = () => {
  copyToClipboardFormatted(pay.appId)
}

const cancel = () => {
  router.back();
};

onMounted(async () => {
  if (!id) return;
  const { success, data } = await BFSDK.getWechatPay(id);
  if (!success) return;
  Object.assign(pay, data);
});
</script>
