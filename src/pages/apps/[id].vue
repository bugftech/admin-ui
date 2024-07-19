<template>
  <v-toolbar density="compact" color="transparent" extended class="pe-2">
    <v-toolbar-title>
      <AppBackBtn /><span class="text-subtitle-2 ms-2">编辑 {{ appConfig.name }}</span>
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      variant="flat"
      size="small"
      color="orange-accent-1"
      append-icon="mdi-content-copy"
      @click="copyId"
      >{{
        "X-Bugfreed-App-Id: " + appConfig.tenantId + "-" + appConfig.id
      }}</v-btn
    >
    <template v-slot:extension>
      <v-tabs v-model="tab" density="compact" class="text-caption">
        <v-tab value="one" class="text-caption">基础信息</v-tab>
        <v-tab value="two" class="text-caption">支付</v-tab>
        <v-tab value="three" class="text-caption">客服</v-tab>
        <v-tab value="four" class="text-caption">订单通知</v-tab>
      </v-tabs>
    </template>
  </v-toolbar>
  <v-divider />
  <v-tabs-window v-model="tab">
    <v-tabs-window-item value="one">
      <v-card class="ma-4">
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              variant="solo-filled"
              flat
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
                        开发环境(DEV)<v-icon end>mdi-ab-testing</v-icon>
                      </div>
                    </template>
                  </v-radio>
                  <v-radio value="prod">
                    <template v-slot:label>
                      <div class="text-caption font-weight-bold">
                        生产环境(PROD)<v-icon size="24" end color="red"
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
                  <v-alert-title class="text-subtitle-2"> 注意 </v-alert-title>
                  将您的项目标记为生产环境后，系统会在控制台中为此项目添加可视的
                  Prod 标记，以提醒您做出的更改可能会影响您的生产应用
                </v-alert>
              </v-col>
            </v-row>

            <div class="v-card-title text-subtitle-2 mt-4">
              <v-icon icon="mdi-cloud-key" start />APP身份验证密钥
            </div>

            <div class="text-caption v-card-subtitle">
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
              append-icon="mdi-circle-edit-outline"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn size="small" @click="cancel" color="indigo" variant="tonal"
            >取消配置</v-btn
          >
          <v-btn size="small" @click="updateApp" color="indigo" variant="flat">
            更新配置
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-tabs-window-item>
    <v-tabs-window-item value="two">
      <v-card class="ma-4">
        <v-card-item>
          <v-card-title class="text-subtitle-2">支付</v-card-title>
          <v-card-subtitle class="text-caption"
            >给APP添加支付功能</v-card-subtitle
          >
        </v-card-item>
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
          <v-btn size="small" color="indigo" variant="tonal"
            >取消支付配置</v-btn
          >
          <v-btn
            size="small"
            color="indigo"
            @click="bindWechatPay"
            :disabled="!bindWechatPayId"
            variant="flat"
            >保存支付配置</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-tabs-window-item>
    <v-tabs-window-item value="three">
      <v-card rounded="0" variant="flat">
        <v-card-item>
          <v-card-title class="text-subtitle-2 font-weight-bold">
            微信客服
          </v-card-title>
          <v-card-subtitle class="text-caption">
            微信客服可在小程序绑定跳转到制定的企业微信客服。如果未指定。则请使用默认的客服
          </v-card-subtitle>
          <template v-slot:append>
            <v-btn @click="addKF" size="small" color="indigo" variant="flat"
              >添加客服</v-btn
            >
          </template>
        </v-card-item>
        <v-card-text>
          <v-list
            slim
            density="comfortable"
            lines="two"
            class="border rounded-lg"
            v-if="kfs.length > 0"
          >
            <template v-for="(kf, i) in kfs" :key="i">
              <v-list-item @click="onEditKF(i)">
                <v-list-item-title>
                  <div class="text-subtitle-2">
                    {{ kf.name }}
                    <v-chip size="x-small" variant="flat" color="indigo">{{
                      kf.corpId
                    }}</v-chip>
                  </div>
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  {{ kf.url }}
                </v-list-item-subtitle>

                <template v-slot:append>
                  <v-radio hide-details v-model="kf.isDefault">
                    <template v-slot:label>
                      <div class="text-caption font-weight-bold">默认客服</div>
                    </template>
                  </v-radio>
                </template>
              </v-list-item>
              <v-divider v-if="i !== kfs.length - 1" />
            </template>
          </v-list>

          <div v-else class="text-center">
            <v-img
              src="@/assets/product_explainer.svg"
              height="250"
              class="mt-8"
            ></v-img>

            <div class="text-caption mt-8 v-card-subtitle">
              APP尚未配置微信客服
            </div>
            <v-btn
              class="my-4"
              size="small"
              color="indigo"
              variant="flat"
              @click="addKF"
              >添加一个客服</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-tabs-window-item>
    <v-tabs-window-item value="four">
      <v-card rounded="0" variant="flat">
        <v-card-item>
          <v-card-title class="text-subtitle-2 font-weight-bold">
            企业微信机器人
          </v-card-title>
          <v-card-subtitle class="text-caption">
            绑定企业微信机器人，即可推送相关的订单消息
          </v-card-subtitle>
          <template v-slot:append>
            <v-btn
              @click="addWebhook"
              size="small"
              color="indigo"
              variant="flat"
              >添加企业微信机器人</v-btn
            >
          </template>
        </v-card-item>
      </v-card>
      <v-divider />
      <v-card v-for="(hook, i) in hooks" :key="i" class="ma-4 rounded-lg">
        <v-toolbar>
          <v-toolbar-title class="text-subtitle-2">
            {{ hook.name }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn
            rounded="lg"
            variant="outlined"
            size="small"
            @click="onEditHook(i)"
            prepend-icon="mdi-pencil"
            >编辑</v-btn
          >
        </v-toolbar>
        <v-divider />
        <v-card-text>
          <v-text-field
            v-model="hook.name"
            placeholder="请输入hook名称"
            label="名称"
            variant="solo-filled"
            flat
            persistent-hint
            persistent-placeholder
            density="comfortable"
            hint="名称方便管理员识别客服人员。请填入准确的信息。"
          >
          </v-text-field>
          <v-text-field
            v-model="hook.url"
            placeholder="请输入webhook url"
            label="url"
            variant="solo-filled"
            flat
            persistent-hint
            persistent-placeholder
            density="comfortable"
            hint="webhook url地址，用于推送消息的服务地址。"
            class="mt-4"
          >
          </v-text-field>
          <v-text-field
            v-model="hook.contentType"
            placeholder="UTF-8"
            label="content type"
            variant="solo-filled"
            flat
            persistent-hint
            persistent-placeholder
            density="comfortable"
            hint="选择payload发送的类型。"
            class="mt-4"
          >
          </v-text-field>
          <v-textarea
            v-model="hook.template"
            placeholder="请输入hook模版"
            label="模版"
            variant="solo-filled"
            flat
            persistent-hint
            persistent-placeholder
            density="comfortable"
            hint="webhook发送的内容模版"
            class="mt-4"
          >
          </v-textarea>
        </v-card-text>
      </v-card>
    </v-tabs-window-item>
  </v-tabs-window>
  <v-divider class="my-4" />
  <div class="text-center mb-4">
    <v-btn size="small" color="red">删除应用</v-btn>
  </div>

  <v-dialog max-width="800" v-model="kfDialog">
    <v-card>
      <v-toolbar density="compact">
        <v-toolbar-title class="text-subtitle-2 font-weight-bold">
          微信客服
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-close" size="small" @click="cancelKF"> </v-btn>
      </v-toolbar>
      <v-divider />
      <v-card-text>
        <v-text-field
          v-model="editKF.name"
          variant="solo-filled"
          flat
          label="客服名称"
          persistent-hint
          persistent-placeholder
          density="comfortable"
          placeholder="请输入微信客服名称"
          hint="名称方便管理员识别客服人员。请填入准确的信息。"
        >
        </v-text-field>
        <v-text-field
          v-model="editKF.url"
          class="mt-4"
          variant="solo-filled"
          flat
          label="webhoook URL"
          persistent-hint
          persistent-placeholder
          density="comfortable"
          placeholder="webhoook URL"
          hint="企业微信客服绑定的客户URL"
        >
        </v-text-field>
        <v-text-field
          v-model="editKF.corpId"
          class="mt-4"
          variant="solo-filled"
          flat
          label="企业ID"
          persistent-hint
          persistent-placeholder
          density="comfortable"
          placeholder="请输入企业微信的企业ID"
          hint="企业微信的企业ID"
        >
        </v-text-field>
        <v-switch
          v-model="editKF.isDefault"
          hide-details
          color="indigo"
          density="compact"
          class="ml-2"
        >
          <template v-slot:label>
            <div class="text-caption font-weight">默认</div>
          </template>
        </v-switch>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="indigo" size="small" @click="cancelKF"> 取消 </v-btn>
        <v-btn color="indigo" size="small" @click="upsertKF"> 确定 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog max-width="800" v-model="hookDialog">
    <v-card>
      <v-toolbar density="compact">
        <v-toolbar-title class="text-subtitle-2 font-weight-bold">
          webhook
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-close" size="small" @click="cancelHook"> </v-btn>
      </v-toolbar>
      <v-divider />
      <v-card-text>
        <v-text-field
          class="mt-4"
          v-model="editWebhook.name"
          placeholder="请输入hook名称"
          label="名称"
          variant="solo-filled"
          flat
          persistent-hint
          persistent-placeholder
          density="comfortable"
          hint="名称方便管理员识别客服人员。请填入准确的信息。"
        >
        </v-text-field>
        <v-text-field
          v-model="editWebhook.url"
          placeholder="请输入webhook url"
          label="url"
          variant="solo-filled"
          flat
          persistent-hint
          persistent-placeholder
          density="comfortable"
          hint="webhook url地址，用于推送消息的服务地址。"
          class="mt-4"
        >
        </v-text-field>
        <v-text-field
          v-model="editWebhook.contentType"
          placeholder="UTF-8"
          label="content type"
          variant="solo-filled"
          flat
          persistent-hint
          persistent-placeholder
          density="comfortable"
          hint="选择payload发送的类型。"
          class="mt-4"
        >
        </v-text-field>
        <v-textarea
          v-model="editWebhook.template"
          placeholder="请输入hook模版"
          label="模版"
          variant="solo-filled"
          flat
          persistent-hint
          persistent-placeholder
          density="comfortable"
          hint="webhook发送的内容模版"
          class="mt-4"
        >
        </v-textarea>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn size="small" color="indigo" @click="cancelHook">取消</v-btn>
        <v-btn size="small" color="indigo" @click="upsertWebhook"> 确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { App, AppWebhookConfig } from "@/interfaces/apps";
import { WechatPay } from "@/interfaces/pay";
import { AppWechatKF } from "@/interfaces/wechat";

const tab = ref();
const route = useRoute();
const id = (route.params as { id: number }).id;
const kfDialog = ref(false);

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
    useSnackbar("更新APP失败");
  } else {
    useSnackbar("更新APP成功");
  }
};

const cancel = () => {};

const fetchWechatPays = async () => {
  const { success, data } = await BFSDK.getWechatPays();
  if (!success) return;
  pays.value = data;
};

const defaultKF: AppWechatKF = {
  tenantId: 0,
  bfAppId: 0,
  id: 0,
  name: "",
  url: "",
  corpId: "",
  isDefault: false,
};

const editKF = reactive<AppWechatKF>(defaultKF);
const kfs = ref<AppWechatKF[]>([]);
const fetchKFs = async () => {
  const { success, data } = await BFSDK.getWechatKFs(id);
  if (success) {
    kfs.value = data;
  }
};

const addKF = async () => {
  Object.assign(editKF, defaultKF);
  kfDialog.value = true;
};

const onEditKF = (kfIdx: number) => {
  Object.assign(editKF, kfs.value[kfIdx]);
  kfDialog.value = true;
};

const upsertKF = async () => {
  // 不存在id，则为新增
  if (editKF.id === 0) {
    const { success } = await BFSDK.addWechatKF(id, editKF);
    if (!success) {
      useSnackbar("添加客服失败");
    } else {
      useSnackbar("添加客服成功");
    }

    await fetchKFs();
    cancelKF();
  } else {
    const { success } = await BFSDK.updateWechatKF(id, editKF.id, editKF);
    if (!success) {
      useSnackbar("添加客服失败");
    } else {
      useSnackbar("添加客服成功");
    }

    await fetchKFs();
    cancelKF();
  }
};

const cancelKF = () => {
  Object.assign(editKF, defaultKF);
  kfDialog.value = false;
};

const copy = () => {
  return copyToClipboardFormatted(appConfig.uid);
};

const copyId = () => {
  const str =
    '"X-Bugfreed-App-Id": ' +
    '"' +
    appConfig.tenantId +
    "-" +
    appConfig.id +
    '"';
  copyToClipboardFormatted(str);
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

const hookDialog = ref(false);

const defaultHook: AppWebhookConfig = {
  tenantId: 0,
  bfAppId: 0,
  id: 0,
  name: "",
  url: "",
  contentType: "application/json",
  template: "",
};
const editWebhook = reactive<AppWebhookConfig>(defaultHook);
const hooks = ref<AppWebhookConfig[]>([]);

// qywechat webhhok
const addWebhook = async () => {
  Object.assign(editWebhook, defaultHook);
  hookDialog.value = true;
};

const upsertWebhook = async () => {
  if (editWebhook.id > 0) {
    const { success } = await BFSDK.updateWebookById(
      id,
      editWebhook.id,
      editWebhook
    );
    if (!success) {
      useSnackbar("更新webhook失败");
    } else {
      useSnackbar("更新webhook成功");
      await fetchHooks();
      cancelHook();
    }
  } else {
    const { success } = await BFSDK.addAppWebook(id, editWebhook);
    if (!success) {
      useSnackbar("添加webhook失败");
    } else {
      useSnackbar("添加webhook成功");
      await fetchHooks();
      cancelHook();
    }
  }
};

const fetchHooks = async () => {
  const { success, data } = await BFSDK.getWebooksByAppId(id);
  if (!success) return;
  hooks.value = data;
};

const onEditHook = (hookIdx: number) => {
  Object.assign(editWebhook, hooks.value[hookIdx]);
  hookDialog.value = true;
};

const cancelHook = () => {
  Object.assign(editWebhook, defaultHook);
  hookDialog.value = false;
};

onMounted(() => {
  Promise.all([fetchApp(), fetchWechatPays(), fetchKFs(), fetchHooks()]);
});
</script>

<route lang="yaml">
meta:
  title: 编辑
  breadcrumb: 应用设置
</route>
