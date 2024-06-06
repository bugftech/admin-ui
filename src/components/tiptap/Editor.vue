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
    :max-height="465"
    :max-width="maxWidth"
    :extensions="extensions"
    @change="onChangeEditor"
  />
</template>

<script setup lang="ts">
import {
  BaseKit,
  Heading,
  type VuetifyTiptapOnChange,
} from "vuetify-pro-tiptap";

const props = defineProps({
  modelValue: {
    type: String,
    value: "",
  },
});

const emits = defineEmits(["update:modelValue"]);

const extensions = [
  BaseKit.configure({
    placeholder: {
      placeholder: "Placeholder...",
    },
  }),
  Heading.configure({
    levels: [1, 2, 3, 4],
  }),
];

const VuetifyTiptapRef = ref<null | Record<string, any>>(null);
const output = ref<"html" | "json" | "text">("html");
const content = ref(props.modelValue);
const markdownTheme = ref("");
const outlined = ref(true);
const dense = ref(false);
const hideToolbar = ref(false);
const disableToolbar = ref(false);
const errorMessages = ref(null);
const maxWidth = ref<number>(900);

function onChangeEditor({ editor, output }: VuetifyTiptapOnChange) {
  /*
  console.log("output :>> ", output);
  console.log("output[html] :>> ", editor.getHTML());
  console.log("output[json] :>> ", editor.getJSON());
  */
  emits("update:modelValue", editor.getHTML());
  console.log("output[text] :>> ", editor.getHTML());
}
</script>
