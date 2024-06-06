<script setup lang="ts">
import {
  BaseKit,
  Heading,
  type VuetifyTiptapOnChange,
} from "vuetify-pro-tiptap";

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
const content = ref(
  `<p><img alt="" src="https://test-1308806451.cos.ap-shanghai.myqcloud.com/tmpl/产品-咨询分诊-服务详情.png" style="width:100%" /></p>  <p>&nbsp;</p><br/> <p><img alt="" src="https://test-1308806451.cos.ap-shanghai.myqcloud.com/tmpl/产品-咨询分诊-费用说明.png" style="width:100%" /></p>  <p>&nbsp;</p>`
);
const markdownTheme = ref("");
const outlined = ref(true);
const dense = ref(false);
const hideToolbar = ref(false);
const disableToolbar = ref(false);
const errorMessages = ref(null);
const maxWidth = ref<number>(900);

function onChangeEditor({ editor, output }: VuetifyTiptapOnChange) {
  console.log("output :>> ", output);
  console.log("output[html] :>> ", editor.getHTML());
  console.log("output[json] :>> ", editor.getJSON());
  console.log("output[text] :>> ", editor.getText());
}
</script>

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

<style>
.jse-main {
  max-height: 400px;
}
</style>
