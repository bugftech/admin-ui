<template>
  <v-card class="mb-2">
    <v-toolbar color="transparent">
      <v-card-title class="text-subtitle-2"> 列COLUMN数据 </v-card-title>
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
    </v-data-table>
  </v-card>

  <v-dialog v-model="dialog" max-width="800">
    <v-card>
      <v-card-title class="text-subtitle-2">
        {{ editColumn.id > 0 ? "编辑" : "新增" }}
      </v-card-title>
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
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn size="small" color="indigo" @click="closeCol">取消</v-btn>
        <v-btn size="small" color="indigo" @click="addCol">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { ColumnMeta } from "@/interfaces/airtable";
import { nonEmptyRules } from "@/composables/formRules";

const props = defineProps({
  id: Number || undefined,
});

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
    title: "type",
    key: "type",
  },
  {
    title: "可见",
    key: "visible",
  },
];

const dialog = ref(false);

const items = ref<ColumnMeta[]>([]);

const tabId = computed(() => {
  return props.id;
});

const defaultColumn: ColumnMeta = {
  id: 0,
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
  columnType: "string",
  columnLength: 255,
  columnName: "",
};

const editColumn = reactive<ColumnMeta>(defaultColumn);

const fetchColumns = async () => {
  if (!tabId.value) return;
  const { success, data } = await BFSDK.getAirTableColumns(tabId.value);
  if (!success) return;
  items.value = data;
};

const addCol = async () => {
  if (!tabId.value) return;
  const { success } = await BFSDK.addAirTableColumn(tabId.value, editColumn);
  if (success) {
    useSnackbar("添加成功");
    await fetchColumns()
  } else {
    useSnackbar("添加列失败");
  }

  closeCol();
};

const closeCol = () => {
  dialog.value = false;
  Object.assign(editColumn, defaultColumn);
};

onMounted(async () => {
  if (!props.id) return;
  await fetchColumns();
});
</script>
