<template>
  <v-card class="ma-1">
    <v-toolbar color="transparent">
      <v-spacer />
      <v-btn
        size="small"
        color="indigo"
        variant="flat"
        class="me-2"
        @click="dialog = true"
        >添加列</v-btn
      >
    </v-toolbar>
    <v-divider />
    <v-text-field
      variant="solo"
      flat
      placeholder="检索..."
      color="transparent"
      prepend-inner-icon="mdi-magnify"
    >
    </v-text-field>
    <v-divider />
    <v-data-table :items="items" class="text-caption" :headers="headers">
      <template v-slot:[`item.visible`]="{ item }">
        <v-checkbox-btn v-model="item.visible" readonly />
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="ms-2" @click="deleteColumn(item)" v-if="item.deletable"
          >mdi-trash-can</v-icon
        >
      </template>
    </v-data-table>
  </v-card>

  <v-dialog v-model="dialog" max-width="800">
    <v-card>
      <v-toolbar>
        <v-card-title class="text-subtitle-2">
          {{ editColumn.id > 0 ? "编辑" : "新增" }}
        </v-card-title>
      </v-toolbar>
      <v-divider />
      <v-card-text>
        <v-text-field
          v-model="editColumn.name"
          placeholder="医生列表"
          hide-details="auto"
          density="comfortable"
          variant="solo-filled"
          flat
          label="名称"
          hint="列名称"
          persistent-hint
          required
          persistent-placeholder
          :rules="nonEmptyRules"
        >
        </v-text-field>

        <v-text-field
          v-model="editColumn.subtitle"
          placeholder="副标题"
          hide-details="auto"
          density="comfortable"
          variant="solo-filled"
          flat
          label="副标题"
          hint="副标题用于添加额外的描述信息"
          persistent-hint
          required
          persistent-placeholder
          class="mt-4"
        >
        </v-text-field>

        <v-text-field
          v-model="editColumn.columnName"
          placeholder="doctor"
          hide-details="auto"
          density="comfortable"
          variant="solo-filled"
          flat
          label="key"
          hint="列的英文名称(kebacase)"
          persistent-hint
          required
          persistent-placeholder
          class="mt-4"
        >
        </v-text-field>
        <v-select
          placeholder="doctor"
          hide-details="auto"
          density="comfortable"
          variant="solo-filled"
          flat
          label="类型"
          hint="使用类型字段来标记列的内容类型，并在 JSON 序列化和反序列化时正确处理该字段"
          persistent-hint
          required
          persistent-placeholder
          :items="contentTypes"
          v-model="editColumn.contentType"
          class="mt-4"
        >
        </v-select>

        <v-checkbox v-model="editColumn.editable">
          <template v-slot:label>
            <div class="text-caption font-weight-bold">
              可编辑
            </div>
          </template>
        </v-checkbox>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn size="small" color="indigo" @click="closeCol">取消</v-btn>
        <v-btn size="small" color="indigo" @click="addCol">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <app-confirm-dialog ref="confirm"> </app-confirm-dialog>
</template>

<script setup lang="ts">
import { ColumnMeta } from "@/sdk/airtable/types";
import { nonEmptyRules } from "@/composables/formRules";
import { Airtable } from "@/sdk/airtable/airtable";

import bugfreed from "@/sdk";

const airtable = new Airtable({ bugfreed });
const props = defineProps({
  id: String || undefined,
});

const contentTypes: string[] = [
  "number",
  "text",
  "image",
  "array",
  "richText",
  "images",
];

const headers = [
  {
    title: "名称",
    key: "name",
  },
  {
    title: "key",
    key: "key",
  },
  {
    title: "类型",
    key: "contentType",
  },
  {
    title: "可见",
    key: "visible",
  },
  {
    title: "操作",
    key: "actions",
  },
];

const dialog = ref(false);
const items = ref<ColumnMeta[]>([]);
const tabId = computed(() => {
  return props.id;
});

const confirm = ref();

const defaultColumn: ColumnMeta = {
  id: 0,
  uuid: "",
  parentColumnId: 0,
  name: "",
  subtitle: "",
  key: "",
  type: "",
  length: 255,
  deletable: true,
  visible: true,
  editable: true,
  fixedLength: false,
  sort: 0,
  ordered: true,
  contentType: "text",
  columnType: "string",
  columnLength: 255,
  columnName: "",
};

const editColumn = reactive<ColumnMeta>(defaultColumn);

const fetchColumns = async () => {
  if (!tabId.value) return;
  const { success, data } = await airtable.getColumns(tabId.value);
  if (!success) return;
  items.value = data.filter((item) => item.editable);
};

const addCol = async () => {
  if (!tabId.value) return;
  const { success } = await airtable.addColumn(tabId.value, editColumn);
  if (success) {
    useSnackbar("添加成功");
    await fetchColumns();
  } else {
    useSnackbar("添加列失败");
  }

  closeCol();
};

const closeCol = () => {
  dialog.value = false;
  Object.assign(editColumn, defaultColumn);
};

const deleteColumn = async (item: ColumnMeta) => {
  if (!tabId.value || item.uuid === "") return;
  const ok = await confirm.value.open("删除列", "此操作不可恢复");
  if (!ok) return;
  const { success, message } = await airtable.deleteColumn(
    tabId.value,
    item.uuid
  );
  if (!success) {
    useSnackbar(`删除列错误: ${message}`);
  } else {
    useSnackbar("删除列成功");
    await fetchColumns();
  }
};

onMounted(async () => {
  if (!props.id) return;
  await fetchColumns();
});
</script>
