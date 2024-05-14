<template>
  <v-snackbar
    v-if="isVisible && current"
    v-model="isActive"
    :timeout="current.event ? 1000 : current.timeout"
    location="right top"
    :color="current.color ? current.color : 'grey-darken-4'"
    vertical
    @after-leave="onAfterLeave"
  >
    <div class="text-subtitle-2 pb-2" v-if="current.title">
      <v-icon start v-if="current.icon" color="green">{{
        current.icon
      }}</v-icon>
      {{ current.title }}
    </div>
    <div class="text-caption">
      {{ current.message }}
    </div>
    <template v-slot:actions>
      <v-btn variant="tonal" v-if="current.event" size="small" @click="toggle">
        去查看
      </v-btn>

      <v-btn variant="tonal" size="small" @click="isActive = false">
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
// Composables
import { ref, shallowRef, watch, nextTick } from "vue";
import { useAppStore } from "@/store/app";

// Types
import type { Notification } from "@/store/app";
import { useRouter } from "vue-router";

const store = useAppStore();
const isActive = ref(false);
const isVisible = ref(false);
const current = shallowRef<Notification>();

watch(
  () => store.notifications.length,
  (val, oldVal) => {
    if (!isVisible.value && val > oldVal) {
      showNext();
    }
  }
);

watch(isActive, (val) => {
  if (val) isVisible.value = true;
});

function onAfterLeave() {
  if (store.notifications.length) {
    showNext();
  } else {
    current.value = undefined;
    isVisible.value = false;
  }
}

function showNext() {
  current.value = store.notifications[0];
  store.notifications.splice(0, 1);
  nextTick(() => {
    isActive.value = true;
  });
}

const router = useRouter();

const toggle = () => {
  if (current.value?.event) {
    isActive.value = false;
    router.push(`/${current.value?.event}`).then(() => {
      onAfterLeave();
    });
  }
};
</script>
