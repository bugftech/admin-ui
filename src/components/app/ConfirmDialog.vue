<template>
  <v-dialog v-model="dialog" :max-width="options.width" @keydown.esc="cancel">
    <v-card>
      <v-toolbar
        :color="options.color ? options.color : undefined"
        density="compact"
        flat
      >
        <v-toolbar-title class="text-subtitle-2 font-weight-bold"
          ><v-icon start>mdi-alert-circle</v-icon>{{ title }}</v-toolbar-title
        >
        <v-spacer />
        <v-btn
          icon="mdi-window-close"
          @click="cancel"
          size="small"
          variant="text"
          rounded="circle"
        ></v-btn>
      </v-toolbar>
      <v-card-text
        v-show="!!message"
        class="py-6 text-caption font-weight-medium text-wrap text-grey"
      >
        <div v-html="message" />
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancel" size="small" variant="tonal">取消</v-btn>
        <v-btn
          @click="agree"
          variant="flat"
          size="small"
          :color="options.color ? options.color : 'black'"
          >确定</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { reactive, toRefs } from "vue";
const state = reactive({
  dialog: false,
  resolve: null,
  reject: null,
  message: null,
  title: null,
  options: {
    color: undefined,
    width: 500,
  },
});

const { dialog, message, title, options } = toRefs(state);
const open = (title, message, options) => {
  state.dialog = true;
  state.title = title;
  state.message = message;
  state.options = Object.assign(state.options, options);
  return new Promise((resolve, reject) => {
    state.resolve = resolve;
    state.reject = reject;
  });
};

const agree = () => {
  state.resolve(true);
  state.dialog = false;
};

const cancel = () => {
  state.resolve(false);
  state.dialog = false;
};

defineExpose({ open });
</script>

<style></style>
