<template>
  <VuetifyTiptap
    ref="VuetifyTiptapRef"
    v-model="content"
    v-model:markdown-theme="markdownTheme"
    :output="output"
    :hide-toolbar="hideToolbar"
    :disable-toolbar="disableToolbar"
    :outlined="outlined"
    :dense="dense"
    :error-messages="errorMessages"
    rounded
    :max-width="maxWidth"
    :extensions="extensions"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
  },
});

const emits = defineEmits(["update:modelValue"]);

import {
  BaseKit,
  Heading,
} from "vuetify-pro-tiptap";

const extensions = [
  BaseKit.configure({
    placeholder: {
      placeholder: "编辑你的详情内容",
    },
  }),
  Heading.configure({
    levels: [1, 2, 3, 4],
  }),
];

const VuetifyTiptapRef = ref<null | Record<string, any>>(null);
const output = ref<"html" | "json" | "text">("html");

const content = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  content.value = newValue;
});

watch(content, (newValue) => {
  emits("update:modelValue", newValue);
});

const markdownTheme = ref("github");
const outlined = ref(true);
const dense = ref(false);
const hideToolbar = ref(false);
const disableToolbar = ref(false);
const errorMessages = ref(null);
const maxWidth = ref<number>(900);

/*
function onChangeEditor({ editor, output }: VuetifyTiptapOnChange) {
  const newContent = editor.getHTML();
  emits("update:modelValue", newContent);
  console.log("output[html] :>> ", editor.getHTML());
  console.log("output[json] :>> ", editor.getJSON());
  console.log("output[text] :>> ", editor.getText());
}
*/
</script>

<style>
.jse-main {
  max-height: 400px;
}
</style>
