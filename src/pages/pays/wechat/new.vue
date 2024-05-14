<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12">
        <v-toolbar color="transparent">
          <AppBackBtn />
          <v-toolbar-title class="text-body-1 font-weight-bold">
            添加微信支付
          </v-toolbar-title>
          <v-spacer />
          <v-btn size="small" class="me-2" variant="tonal" @click="cancel"
            >取消</v-btn
          >
          <v-btn size="small" variant="elevated" @click="save">保存</v-btn>
        </v-toolbar>
      </v-col>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-caption">基础配置</v-card-title>
          <v-card-text>
            <v-form ref="form">
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

              <v-switch
                hide-details="auto"
                color="red"
                v-model="pay.isProvider"
              >
                <template v-slot:label>
                  <div class="text-overline font-weight-bold">
                    供应商
                  </div></template
                >
              </v-switch>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="text-caption">回调通知地址</v-card-title>
          <v-card-text>
            <v-text-field
              placeholder="请输入微信支付回调通知地址"
              hide-details="auto"
              density="compact"
              variant="solo-filled"
              flat
              readonly
              persistent-hint
              hint="该接口用于微信服务器端往应用服务推送订单支付信息"
              v-model="pay.notifyUrl"
            >
            </v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { nonEmptyRules } from "@/composables/formRules";
import { WechatPay } from "@/interfaces/pay";
import BFSDK from "@/api/sdk";

const router = useRouter();
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

const save = async () => {
  const res = await form.value.validate();
  if (!res || !res.valid) return;
  const { success } = await BFSDK.addWechatPay(pay);
  if (success) {
    useSnackbar("添加支付成功", { icon: "mdi-check-circle" });
  } else {
    useSnackbar("添加失败");
  }
  onClose();
};

const cancel = () => {
  onClose();
  router.back();
};

const onClose = () => {
  Object.assign(pay, defaultPay);
};
</script>
