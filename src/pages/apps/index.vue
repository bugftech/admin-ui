<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <AppBreadcrumb />

        <v-row>
          <v-col cols="12" md="4">
            <v-card
              @click="onAddApp"
              height="200"
              class="d-flex align-center justify-center flex-column"
              color="orange-accent-2"
            >
              <v-icon size="48">mdi-plus</v-icon>
              <div class="text-overline">创建一个新应用</div>
            </v-card>
          </v-col>

          <template v-for="(item, i) in items" :key="i">
            <v-col cols="12" md="4">
              <v-card @click="onEditApp(item)" height="200">
                <div class="d-flex flex-column justify-space-between h-100">
                  <div>
                    <v-card-item>
                      <v-card-title class="text-subtitle-2">
                        {{ item.name }}
                        <v-tooltip
                          :text="'项目为' + item.env + '环境'"
                          content-class="custom-tooltip"
                        >
                          <template v-slot:activator="{ props }">
                            <v-icon
                              v-bind="props"
                              :color="item.env === 'dev' ? 'grey' : 'red'"
                            >
                              {{
                                item.env === "dev"
                                  ? "mdi-ab-testing"
                                  : "mdi-fire-circle"
                              }}</v-icon
                            >
                          </template>
                        </v-tooltip>
                      </v-card-title>
                      <v-card-subtitle class="text-caption">
                        {{ item.appId ? item.appId : "尚未设置app id" }}
                      </v-card-subtitle>
                    </v-card-item>
                  </div>

                  <div class="d-flex w-100">
                    <v-tooltip
                      :text="'此项目为' + item.appType + '项目'"
                      location="bottom"
                      content-class="custom-tooltip"
                    >
                      <template v-slot:activator="{ props }">
                        <v-btn
                          rounded="0"
                          variant="flat"
                          size="small"
                          class="rounded-te-lg"
                          :icon="item.appType ? 'mdi-wechat' : 'mdi-code-tags'"
                          v-bind="props"
                        ></v-btn>
                      </template>
                    </v-tooltip>
                  </div>
                </div>
              </v-card>
            </v-col>
          </template>
          <v-col cols="12">
            <v-divider class="my-2" />
          </v-col>
          <v-col cols="12" md="4">
            <v-card height="200" variant="outlined">
              <div class="d-flex flex-column justify-space-between h-100">
                <div>
                  <v-card-item>
                    <v-card-title class="text-subtitle-2">
                      演示项目(开发中)
                    </v-card-title>
                    <v-icon> </v-icon>
                  </v-card-item>
                </div>
                <div class="d-flex w-100">
                  <v-tooltip
                    :text="'此项目为微信小程序项目'"
                    location="bottom"
                    content-class="custom-tooltip"
                  >
                    <template v-slot:activator="{ props }">
                      <v-btn
                        rounded="0"
                        variant="text"
                        size="small"
                        class="rounded-te-lg"
                        icon="mdi-wechat"
                        v-bind="props"
                      ></v-btn>
                    </template>
                  </v-tooltip>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-card height="200" variant="outlined">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-subtitle-2 text-wrap">
                    BUGFREED应用是应用运行时核心
                  </v-card-title>
                  <v-card-subtitle class="text-caption text-wrap">
                    在应用运行时内，部分功能可以通过管理APP配置来动态变更程序的功能。
                  </v-card-subtitle>
                </div>

                <v-img src="@/assets/subscribe.svg" width="200" class="ma-3"></v-img>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { App } from "@/interfaces/apps";

const items = ref<any[]>([]);
const router = useRouter();

onMounted(async () => {
  const { data, success } = await BFSDK.getApps();
  if (success) items.value = data;
});

const onAddApp = () => {
  router.push({ name: "/apps/new" });
};

const onEditApp = (item: App) => {
  if (!item.id) return;
  router.push({
    name: "/apps/[id]",
    params: {
      id: item.id,
    },
  });
};
</script>

<route lang="yaml">
meta:
  title: "应用看板"
  breadcrumb: "您的应用集合"
</route>

<style>
.custom-tooltip {
  font-size: 10px !important;
  opacity: 1 !important;
  background-color: rgba(var(--v-theme-surface-variant), 1) !important;
  padding: 0.3rem 0.3rem !important;
  transform: translate(-0.7rem -0.8rem);
}
</style>
