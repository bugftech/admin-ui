<template>
  <v-menu :open-on-hover="false">
    <template v-slot:activator="{ props }">
      <v-avatar v-bind="props">
        <v-icon>mdi-account</v-icon>
      </v-avatar>
    </template>
    <v-card min-width="300" class="mt-2" theme="light">
      <div class="text-center">
        <v-avatar color="indigo" size="large" class="my-3" variant="elevated">
          <v-img :src="profile.avatar" />
        </v-avatar>
        <v-list-item-title class="font-weight-bold">{{
          profile.name
        }}</v-list-item-title>
        <v-list-item-subtitle class="text-caption font-weight-bold">{{
          profile.email
        }}</v-list-item-subtitle>
        <v-btn rounded prepend-icon="mdi-cog" variant="tonal" class="my-4"
          >设置账号</v-btn
        >
      </div>
      <v-divider></v-divider>
      <v-list nav density="compact" class="mx-0">
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
          <template v-slot:prepend>
            <v-icon :icon="item.icon" size="18"></v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

const defaultAvatar = "";

interface Item {
  icon: string;
  title: string;
  to: string;
}

const items: Item[] = [
  {
    icon: "mdi-account-switch",
    title: "切换账号",
    to: "/login",
  },
  {
    icon: "mdi-exit-to-app",
    title: "退出账号",
    to: "/login",
  },
];

const user = useUserStore();
const { profile } = storeToRefs(user);

onMounted(() => {
  user.fetchProfile();
});
</script>
