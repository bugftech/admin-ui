<template>
  <v-menu
    :close-on-content-click="false"
    :open-on-hover="false"
    theme="light"
    max-width="520"
  >
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-bell-ring" v-bind="props" size="small" />
    </template>
    <v-card>
      <v-toolbar density="compact">
        <v-toolbar-title class="text-subtitle-2 font-weight-bold"
          >通知</v-toolbar-title
        >
        <v-spacer />
        <v-tooltip text="排序" location="top">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-sort-bool-ascending"
              size="x-small"
              variant="tonal"
              class="me-2"
            ></v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="未读" location="top">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-check"
              size="x-small"
              variant="flat"
              color="black"
            ></v-btn>
          </template>
        </v-tooltip>
      </v-toolbar>
      <v-responsive
        max-height="340"
        min-height="204"
        style="overflow-y: scroll"
      >
        <div
          class="ma-4 pa-4 bg-surface-light text-caption text-center rounded-lg"
          v-if="!notifications.length"
        >
          订单和在线商店信息的提示将会在此处显示
        </div>
        <v-list v-else lines="three">
          <template v-for="(item, i) in notifications" :key="i">
            <v-divider v-if="i !== 0" />
            <v-list-item class="py-2" :value="i">
              <template v-slot:prepend>
                <div class="pe-4 align-self-start mt-1">
                  <v-icon color="indigo" size="24">mdi-circle</v-icon>
                </div>
              </template>
              <template v-slot:append>
                <div class="ps-4 align-self-start">
                  <v-icon size="24" icon="mdi-circle-double" />
                </div>
              </template>
              <v-list-item-title class="text-subtitle-2 font-weight-medium">{{
                item?.title
              }}</v-list-item-title>
              <v-list-item-subtitle class="text-caption font-weight-bold my-1">
                {{ item.createdAt }}
              </v-list-item-subtitle>
              <div class="text-caption v-label mt-2 text-wrap">
                {{ item.metadata.text }}
              </div>
            </v-list-item>
          </template>
        </v-list>
      </v-responsive>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn size="small" color="indigo" variant="flat" @click="TestSendMessage"> 测试信息 </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "@/store/user";
import { useAppStore } from "@/store/app";

// Types
interface Notification {
  metadata: {
    action?: string;
    action_text?: string;
    emoji?: string;
    text: string;
  };
  createdAt: string;
  slug: string;
  title: string;
}

const user = useUserStore();
const app = useAppStore();
// 所有的消息
const all = ref<Notification[]>([]);
// 是否显示归档的信息
const showArchived = ref(false);

const unread = computed(() =>
  all.value.filter(({ slug }) => !user.notifications.read.includes(slug))
);
const read = computed(() =>
  all.value.filter(({ slug }) => user.notifications.read.includes(slug))
);

const notifications = computed(() =>
  showArchived.value ? read.value : unread.value
);

const TestSendMessage = ()=>{
  app.snackbar("您有一笔新订单",{
    icon: "mdi-check-circle",
    event: "orders",
    color: "green"
  })
};

onMounted(async () => {
  if (all.value.length) return;
  all.value = [
    {
      slug: "#sasasda",
      title: "BUGFREED新版本",
      createdAt: "Friday, January 26, 2024",
      metadata: {
        text: "2024 组件路线图就在这里！借助可视化拖拽以及headless CMS等新功能，旨在释放设计和功能的新可能性，并提升您的使用体验，加速产品迭代。"
      }
    },
  ];
});
</script>
