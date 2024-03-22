<template>
  <v-sheet
    height="100px"
    @drop.prevent="onDrop($event)"
    @dragover.prevent="state.dragover = true"
    @dragenter.prevent="state.dragover = true"
    @dragleave.prevent="state.dragover = false"
    class="dot-border rounded-lg d-flex align-center justify-center flex-column text-center"
  >
    <div>
      <v-btn class="mr-2" @click.stop="onClick" size="small"> 上传文件 </v-btn>
      <input
        ref="uploader"
        class="d-none"
        type="file"
        accept="image/*"
        @change="onFileChanged"
      />
      <v-dialog width="500">
        <template v-slot:activator="{ props }">
          <v-btn variant="tonal" v-bind="props" text="图片URL网址" size="small"></v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar>
              <v-toolbar-title class="text-subtitle-2 font-weight-bold">
                图片URL网址
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                icon="fas fa-close"
                size="small"
                @click="isActive.value = false"
              ></v-btn>
            </v-toolbar>
            <v-card-text class="pt-1">
              <div class="text-overline font-weight-bold">
                输入有效的图片URL地址
              </div>
              <v-text-field
                placeholder="https://"
                autofocus
                v-model="url"
              ></v-text-field>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text="取消"
                variant="tonal"
                size="small"
                @click="cancel(isActive)"
              ></v-btn>
              <v-btn
                text="提交图片URL"
                variant="elevated"
                size="small"
                @click="commit(isActive)"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
    <div class="text-caption font-weight-bold text-center text-grey mt-2">
      上传的文件会持久化到OSS
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";

interface State {
  uploadFile: File | null;
  dragover: boolean;
}

const state: State = {
  uploadFile: null,
  dragover: false,
};

const url = ref("");
const emit = defineEmits(["change"]);

const cancel = (isActive: { value: boolean }) => {
  isActive.value = false;
  url.value = "";
  emit("change", "");
};

const commit = (isActive: { value: boolean }) => {
  isActive.value = false;
  emit("change", url.value);
  nextTick(() => {
    url.value = "";
  });
};

function onDrop(e: DragEvent) {
  state.dragover = false;
  if (e.dataTransfer!.files.length > 0) {
    Array.from(e.dataTransfer!.files).forEach((element) => {
      state.uploadFile = element;
    });
  }
}

function onFileChanged(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files!.length === 0) return;
  Array.from(target.files!).forEach((_, idx) => {
    state.uploadFile = target.files![idx];
  });

  emit("change", "https://cdn.vuetifyjs.com/images/parallax/material.jpg");
}

const uploader = ref<HTMLInputElement>();

const onClick = () => {
  window.addEventListener("focus", () => {}, { once: true });
  uploader.value?.click();
};
</script>

<style scoped>
.dot-border {
  border-width: thin !important;
  border-style: dashed !important;
  border-color: rgba(var(--v-border-color), var(--v-border-opacity)) !important;
}
</style>
