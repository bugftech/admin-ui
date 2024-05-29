<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-toolbar density="compact" color="transparent" class="mb-2" v-if="id">
          <v-toolbar-title class="text-subtitle-2">
            编辑 <b>{{ title }}</b> 详情
          </v-toolbar-title>
          <v-spacer />
          <v-btn size="small" variant="tonal" class="me-4" width="70"
            >取消</v-btn
          >
          <v-btn size="small" variant="flat" width="70">保存</v-btn>
        </v-toolbar>
        <v-card>
          <v-toolbar density="compact" color="transparent">
            <v-tabs v-model="tab">
              <v-tab value="1" class="text-caption"> 编辑模式 </v-tab>
              <v-tab value="2" class="text-caption"> 代码模式 </v-tab>
            </v-tabs>

            <v-spacer />
            <v-btn icon="mdi-content-copy" size="small" @click="copy"> </v-btn>
          </v-toolbar>
          <v-divider />
          <v-window v-model="tab">
            <v-window-item value="1">
              <v-card min-height="800">
                <v-card-text>
                  <ckeditor
                    v-model="editorData"
                    :editor="editor"
                    :config="editConfig"
                    @ready="onReady"
                  >
                  </ckeditor>
                </v-card-text>
              </v-card>
            </v-window-item>
            <v-window-item value="2">
              <v-card min-height="800">
                <v-card-text>
                  <v-textarea
                    variant="solo-filled"
                    flat
                    v-model="editorData"
                    auto-grow
                  >
                  </v-textarea>
                </v-card-text>
              </v-card>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import CKEditor from "@ckeditor/ckeditor5-vue";
import DocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { copyToClipboardFormatted } from "@/composables/copy";

const editorData = ref("<p>Content of the editor.</p>");

const editor = DocumentEditor
const ckeditor = CKEditor.component;

const tab = ref(1);

const route = useRoute();
const id = (route.query as { productId: string }).productId;

const editConfig = ref({
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "|",
      "link",
      "insertImage",
      "insertTable",
      "mediaEmbed",
      "|",
      "bulletedList",
      "numberedList",
      "outdent",
      "indent",
      "alignment",
      "autoformat",
      "basic-styles",
      "block-quote",
      "ckbox",
      "ckfinder",
      "easy-image",
      "select-all",
      "media-embed"
    ],
  },
  language: "zh-cn",
});

const onReady = (editor: any) => {
  editor.ui
    .getEditableElement()
    .parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
};

const copy = () => {
  copyToClipboardFormatted(editorData.value);
};

const title = ref("");

onMounted(async () => {
  /*
  if (id) {
    const intId = parseInt(id);
    const { data, success } = await BFSDK.getProduct(intId);
    if (success) {
      title.value = data.name;
      editorData.value = data.detailHtml;
    }
  }
  */
});
</script>


<route lang="yaml">
meta:
  title: "富文本"
  breadcrumb: "富文本"
</route>
