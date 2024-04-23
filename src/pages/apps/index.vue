<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <AppBreadcrumb />

        <v-row class="mt-2">
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
                  <v-card-item>
                    <v-card-title class="text-subtitle-2">
                      {{ item.name }}
                      <v-chip variant="flat" color="green" size="x-small">
                        微信
                      </v-chip>
                    </v-card-title>
                    <v-card-subtitle class="text-caption">
                      {{ item.uid ? item.uid : "1111" }}
                    </v-card-subtitle>
                  </v-card-item>

                  <v-card-item>
                    <v-icon>mdi-code-tags</v-icon>
                  </v-card-item>
                </div>
              </v-card>
            </v-col>
          </template>
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
  if (!item.uid) return;
  router.push({
    name: "/apps/[id]/",
    params: {
      id: item.uid,
    },
    query: {
      appId: item.id,
      appType: item.appType,
    },
  });
};
</script>

<route lang="yaml">
meta:
  title: "应用看板"
  breadcrumb: "您的应用集合"
</route>
