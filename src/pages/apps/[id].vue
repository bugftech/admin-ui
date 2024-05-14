<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <!--面包屑-->
        <v-toolbar color="transparent">
          <AppBackBtn></AppBackBtn>
          <v-toolbar-title class="text-body-1 font-weight-bold">
            应用
            <v-chip size="x-small" variant="flat" color="orange-accent-2">{{
              appConfig.appType
            }}</v-chip>
          </v-toolbar-title>
          <!--
          <template v-slot:extension>
            <v-tabs v-model="tab" density="compact" class="text-caption">
              <v-tab value="one" class="text-caption">基础信息</v-tab>
              <v-tab value="two" class="text-caption">支付</v-tab>
              <v-tab value="three" class="text-caption">服务账号</v-tab>
              <v-tab value="four" class="text-caption">APIKeys</v-tab>
            </v-tabs>
          </template>
          -->
          <v-spacer />
          <v-btn
            variant="elevated"
            size="small"
            prepend-icon="mdi-pencil-ruler"
            color="indigo"
            >设计应用</v-btn
          >
        </v-toolbar>
      </v-col>

      <v-col cols="12" md="12">
        <v-card>
          <v-toolbar color="transparent" density="compact">
            <v-toolbar-title class="text-subtitle-2 font-weight-bold"
              >APP配置</v-toolbar-title
            >
            <v-spacer />
          </v-toolbar>
          <v-divider />
          <div class="d-flex flex-row">
            <v-tabs
              v-model="tab"
              density="compact"
              class="text-caption"
              direction="vertical"
            >
              <v-tab value="one" class="text-caption">基础信息</v-tab>
              <v-tab value="two" class="text-caption">支付</v-tab>
              <v-tab value="three" class="text-caption">客服</v-tab>
              <v-tab value="four" class="text-caption">订单通知</v-tab>
            </v-tabs>
            <v-tabs-window v-model="tab" class="flex-fill elevation-1">
              <v-tabs-window-item value="one">
                <v-card flat rounded="0">
                  <v-card-text>
                    <v-form ref="form">
                      <v-text-field
                        variant="solo-filled"
                        flat
                        class="mt-4"
                        label="名称"
                        placeholder="请输入名称名称"
                        hint="APP应用名称"
                        persistent-hint
                        persistent-placeholder
                        density="comfortable"
                        v-model="appConfig.name"
                        :rules="nonEmptyRules"
                      ></v-text-field>

                      <v-text-field
                        variant="solo-filled"
                        flat
                        density="comfortable"
                        readonly
                        label="UUID"
                        class="mt-4"
                        placeholder="UUID不可手动输入"
                        persistent-hint
                        persistent-placeholder
                        max-width="300"
                        hint="UUID由系统生成，不可变更"
                        append-icon="mdi-content-copy"
                        v-model="appConfig.uid"
                        @click:append="copy"
                      ></v-text-field>

                      <div class="v-card-title text-subtitle-2 mt-4">环境</div>
                      <div class="v-card-subtitle text-caption">
                        如果使用此设置，系统会针对应用生命周期的不同阶段自定义您的项目
                      </div>

                      <v-row dense class="mt-2">
                        <v-col cols="12">
                          <v-radio-group v-model="appConfig.env" hide-details>
                            <v-radio value="dev">
                              <template v-slot:label>
                                <div class="text-caption font-weight-bold">
                                  开发环境(DEV)<v-icon end
                                    >mdi-ab-testing</v-icon
                                  >
                                </div>
                              </template>
                            </v-radio>
                            <v-radio value="prod">
                              <template v-slot:label>
                                <div class="text-caption font-weight-bold">
                                  生产环境(PROD)<v-icon
                                    size="24"
                                    end
                                    color="red"
                                    >mdi-fire-circle</v-icon
                                  >
                                </div>
                              </template>
                            </v-radio>
                          </v-radio-group>

                          <v-alert
                            color="red"
                            variant="tonal"
                            density="compact"
                            icon="mdi-alert-decagram-outline"
                            class="text-caption mt-2"
                          >
                            <v-alert-title class="text-subtitle-2">
                              注意
                            </v-alert-title>
                            将您的项目标记为生产环境后，系统会在控制台中为此项目添加可视的
                            Prod 标记，以提醒您做出的更改可能会影响您的生产应用
                          </v-alert>
                        </v-col>
                      </v-row>

                      <div class="v-card-title text-subtitle-2 mt-4">
                        <v-icon icon="mdi-cloud-key" start />APP身份验证密钥
                      </div>

                      <div class="text-caption v-card-subtitle"
                      >
                        第三方APP身份验证密钥配置，只有正确配置ID和密钥，才可唤起第三APP接口能力。无需对应平台的能力，可跳过此选项。
                      </div>

                      <v-text-field
                        variant="solo-filled"
                        flat
                        density="comfortable"
                        label="App ID"
                        class="mt-4"
                        placeholder="请输入APP ID"
                        hint="App ID为APP注册的凭据"
                        persistent-placeholder
                        persistent-hint
                        :rules="nonEmptyRules"
                        v-model="appConfig.appId"
                      ></v-text-field>

                      <v-text-field
                        variant="solo-filled"
                        flat
                        density="comfortable"
                        label="App Secret"
                        class="mt-4"
                        placeholder="请输入App Secret"
                        hint="App Secret为App注册的密钥"
                        persistent-placeholder
                        persistent-hint
                        :rules="nonEmptyRules"
                        v-model="appConfig.appSecret"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-divider />
                  <v-card-actions>
                    <v-spacer />
                    <v-btn size="small" @click="cancel" color="indigo"
                      >取消</v-btn
                    >
                    <v-btn size="small" @click="updateApp" color="indigo">
                      保存
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-tabs-window-item>
              <v-tabs-window-item value="two">
                <v-card variant="flat">
                  <v-card-title class="text-caption">支付</v-card-title>
                  <v-card-text>
                    <v-select
                      label="微信支付"
                      hint="选择APP绑定的微信支付配置"
                      variant="solo-filled"
                      flat
                      placeholder="绑定微信支付"
                      density="comfortable"
                      persistent-hint
                      persistent-placeholder
                      max-width="400"
                      :items="pays"
                      v-model="bindWechatPayId"
                      item-title="appId"
                      item-value="id"
                    >
                    </v-select>

                    <v-select
                      class="mt-4"
                      label="支付宝支付"
                      hint="选择APP绑定的支付宝支付配置"
                      variant="solo-filled"
                      flat
                      disabled
                      placeholder="绑定支付宝支付"
                      density="comfortable"
                      persistent-hint
                      persistent-placeholder
                      max-width="400"
                      v-model="bindAliPayId"
                      item-title="appId"
                      item-value="id"
                    >
                    </v-select>
                  </v-card-text>

                  <v-divider />
                  <v-card-actions>
                    <v-spacer />
                    <v-btn size="small" color="indigo">取消</v-btn>
                    <v-btn
                      size="small"
                      color="indigo"
                      @click="bindWechatPay"
                      :disabled="!bindWechatPayId"
                      >保存</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-tabs-window-item>
              <v-tabs-window-item value="three">
                <v-card> </v-card>
              </v-tabs-window-item>
              <v-tabs-window-item value="four">
                <v-card> </v-card>
              </v-tabs-window-item>
            </v-tabs-window>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="12">
        <v-btn size="small" color="red">删除应用</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { App } from "@/interfaces/apps";
import { WechatPay } from "@/interfaces/pay";

const tab = ref();

const route = useRoute();
const id = (route.params as { id: number }).id;

const appConfig = reactive<App>({
  id: 0,
  name: "",
  uid: "",
  appId: "",
  appSecret: "",
  wechatPayId: 0,
  alipayPayId: 0,
  appType: AppType.Wechat,
  env: EnvType.DevelopmentEnv,
});

const bindWechatPayId = ref<number | null>(null);
const bindAliPayId = ref<number | null>(null);

const pays = ref<WechatPay[]>([]);

const fetchApp = async () => {
  const { success, data } = await BFSDK.getAppById(id);
  if (!success) return;
  Object.assign(appConfig, data);
  if (appConfig.wechatPayId > 0) {
    bindWechatPayId.value = appConfig.wechatPayId;
  }

  if (appConfig.alipayPayId > 0) {
    bindAliPayId.value = appConfig.alipayPayId;
  }
};

const updateApp = async () => {
  if (!appConfig.id) return;
  const { success } = await BFSDK.updateApp(appConfig.id, appConfig);
  if (!success) {
    useSnackbar("更新APP失败")
  } else {
    useSnackbar("更新APP成功")
  }
};

const cancel = () => {};

const fetchWechatPays = async () => {
  const { success, data } = await BFSDK.getWechatPays();
  if (!success) return;
  pays.value = data;
};

const copy = () => {
  return copyToClipboardFormatted(appConfig.uid);
};

const bindWechatPay = async () => {
  if (!bindWechatPayId.value || !appConfig.id) return;
  const { success } = await BFSDK.bindWechatPay(appConfig.id, {
    wechatPayId: bindWechatPayId.value,
  });
  if (!success) {
    useSnackbar("绑定微信支付失败");
  } else {
    useSnackbar("绑定微信支付成功");
  }
};

onMounted(async () => {
  await Promise.all([fetchApp(), fetchWechatPays()]);
});
</script>

<route lang="yaml">
meta:
  title: "应用设置"
  breadcrumb: 应用设置
</route>
