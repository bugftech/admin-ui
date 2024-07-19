<template>
  <v-toolbar extended density="comfortable" class="pe-2" color="transparent">
    <v-toolbar-title>
      <AppBackBtn /><span class="text-subtitle-2 ms-2">编辑 {{ id }}</span>
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      variant="flat"
      size="small"
      color="orange-accent-2"
      append-icon="mdi-content-copy"
      >订阅ID: {{ id }}</v-btn
    >
    <template v-slot:extension>
      <v-tabs density="compact" v-model="tab" @update:model-value="onUpdateTab">
        <v-tab class="text-caption" value="1"> 数据 </v-tab>
        <v-tab class="text-caption" value="2"> 表元数据 </v-tab>
        <v-tab class="text-caption" value="3"> 列元数据 </v-tab>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              class="align-self-center me-4"
              height="100%"
              rounded="0"
              variant="plain"
              v-bind="props"
              size="small"
            >
              更多的操作
              <v-icon icon="mdi-menu-down" end></v-icon>
            </v-btn>
          </template>

          <v-list class="bg-grey-lighten-3" nav slim>
            <v-list-item
              prepend-icon="mdi-trash-can"
              title="删除表"
              @click="dropTable"
            ></v-list-item>
          </v-list>
        </v-menu>
      </v-tabs>
    </template>
  </v-toolbar>
  <v-divider />
  <v-alert
    class="text-caption"
    icon="mdi-alert"
    density="compact"
    text="CMS AirTable正在开发中。功能尚未开发完全。"
    color="red"
    variant="tonal"
  ></v-alert>
  <v-tabs-window v-model="tab">
    <v-tabs-window-item value="1">
      <v-sheet class="elevation-3 rounded-lg px-4 ma-2">
        <v-toolbar density="compact" color="transparent">
          <v-btn
            append-icon="mdi-plus"
            size="small"
            class="border"
            theme="dark"
            variant="flat"
            @click="onAddRow"
            >添加数据</v-btn
          >
          <v-divider class="my-3 mx-2" vertical></v-divider>

          <v-btn
            prepend-icon="mdi-sync"
            @click="fetchRows"
            size="small"
            class="border"
            >刷新数据</v-btn
          >
          <v-divider class="my-3 mx-2" vertical></v-divider>
          <v-btn
            prepend-icon="mdi-flask-empty-minus-outline"
            size="small"
            class="border"
            @click="fetchCols"
            >重置表头</v-btn
          >
        </v-toolbar>
        <v-divider />

        <v-container v-if="headers.length > 0">
          <v-row align="center" justify="start">
            <v-col
              v-for="(header, i) in headers"
              :key="header.key"
              class="py-1 pe-0"
              cols="auto"
            >
              <v-chip
                closable
                @click:close="headers.splice(i, 1)"
                size="x-small"
              >
                {{ header.title }}
              </v-chip>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
      <v-data-table
        :items="rows"
        class="text-caption"
        :headers="headers"
        density="comfortable"
        :loading="loading"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td v-for="(header, i) in headers" :key="i">
              <v-avatar v-if="header.contentType === 'image'" size="32">
                <v-img :src="item[header.key]"></v-img>
              </v-avatar>
              <div v-else-if="header.contentType === 'array'" class="d-flex">
                <v-chip
                  v-for="(arr, i) in item[header.key].split(',')"
                  :key="i"
                  size="x-small"
                  class="me-1"
                >
                  {{ arr }}
                </v-chip>
              </div>
              <div v-else-if="header.key === 'actions'" class="d-flex">
                <v-icon class="me-2" @click="onEditRow(item)"
                  >mdi-pencil</v-icon
                >
                <v-icon @click="deleteRow(item)">mdi-delete</v-icon>
              </div>
              <div v-else>
                {{ item[header.key] }}
              </div>
            </td>
          </tr>
        </template>
        <template v-slot:no-data> </template>
        <template v-slot:loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>
      </v-data-table>
    </v-tabs-window-item>
    <v-tabs-window-item value="2">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="mb-1">
            <v-card-text>
              <v-text-field
                v-model="editTableMeta.name"
                placeholder="医生列表"
                hide-details="auto"
                density="comfortable"
                variant="solo-filled"
                flat
                label="名称"
                hint="air table名称"
                persistent-hint
                required
                persistent-placeholder
                :rules="nonEmptyRules"
              >
              </v-text-field>
              <v-text-field
                v-model="editTableMeta.pic"
                class="mt-4"
                label="banner"
                hint="图片地址（可选）"
                placeholder="请输入图片地址"
                hide-details="auto"
                density="comfortable"
                variant="solo-filled"
                flat
                persistent-hint
                persistent-placeholder
              >
              </v-text-field>
              <v-textarea
                placeholder="医生列表用于存放医生的基本信息"
                hide-details="auto"
                density="comfortable"
                variant="solo-filled"
                flat
                label="描述"
                hint="air table的描述"
                persistent-hint
                persistent-placeholder
                single-line
                auto-grow
                v-model="editTableMeta.description"
                class="mt-4"
              >
              </v-textarea>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn size="small" class="me-2" color="indigo" @click="closeTab"
                >取消</v-btn
              >
              <v-btn size="small" color="indigo" @click="updateTab">更新</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-tabs-window-item>
    <v-tabs-window-item value="3">
      <v-row justify="center">
        <v-col cols="12" md="12">
          <AirtableColumnTable :id="id" />
        </v-col>
      </v-row>
    </v-tabs-window-item>
  </v-tabs-window>

  <v-dialog v-model="editRowDialog" scrollable min-width="500">
    <v-card>
      <v-toolbar theme="dark">
        <v-toolbar-title class="text-subtitle-2">
          {{ editedRow["id"] ? "编辑" + editedRow["uuid"] : "新增" }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-close" @click="editRowDialog = false"></v-btn>
      </v-toolbar>
      <v-card-text style="height: 400px">
        <template v-for="(rowMeta, i) in filteRowMeta" :key="i">
          <v-row dense>
            <v-col cols="12" v-if="rowMeta.contentType === 'text'">
              <v-text-field
                :label="rowMeta.name"
                :placeholder="rowMeta.name"
                v-if="rowMeta.contentType === 'text'"
                v-model="editedRow[rowMeta.key]"
                variant="solo-filled"
                flat
                hide-details="auto"
                persistent-placeholder
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" v-if="rowMeta.contentType === 'array'">
              <v-combobox
                class="mt-4"
                :label="rowMeta.name"
                :placeholder="rowMeta.name"
                variant="solo-filled"
                flat
                chips
                multiple
                hide-details="auto"
                density="comfortable"
                v-model="editedRow[rowMeta.key]"
                hint="按回车键即可生成一个文本"
                persistent-hint
                persistent-placeholder
              ></v-combobox>
            </v-col>
            <template v-if="rowMeta.contentType === 'image'">
              <v-col cols="12">
                <AppLabel>{{ rowMeta.name }}</AppLabel>
                <div class="d-flex">
                  <div class="flex-1 mr-1">
                    <v-sheet
                      class="border rounded-lg overflow-hidden"
                      height="100px"
                      style="position: relative"
                    >
                      <v-img
                        :src="editedRow[rowMeta.key]"
                        cover
                        style="top: 0; left: 0; position: absolute; right: 0"
                      ></v-img>
                      <div class="d-flex">
                        <v-spacer />
                        <v-btn
                          prepend-icon="mdi-close"
                          size="x-small"
                          variant="flat"
                          class="rounded-0 rounded-bs-lg"
                          @click="() => (editedRow[rowMeta.key] = '')"
                          color="orange-accent-2"
                          >删除</v-btn
                        >
                      </div>
                    </v-sheet>
                  </div>
                  <div class="flex-1 ml-1">
                    <UploadImage
                      v-model="editedRow[rowMeta.key]"
                      variant="solo-filled"
                      flat
                      density="compact"
                    >
                    </UploadImage>
                  </div>
                </div>
              </v-col>
            </template>
            <template v-if="rowMeta.contentType === 'richText'">
              <v-col cols="12">
                <v-card class="mt-3 border" flat>
                  <AppLabel class="ml-4">{{ rowMeta.name }}</AppLabel>
                  <RichEditor v-model="editedRow[rowMeta.key]"></RichEditor>
                </v-card>
              </v-col>
            </template>

            <template v-if="rowMeta.contentType === 'images'">
              <v-col
                cols="12"
                md="3"
                v-for="(pic, i) in editedRow[rowMeta.key]"
                :key="i"
              >
                <v-sheet
                  class="border rounded-lg overflow-hidden"
                  height="100px"
                  style="position: relative"
                >
                  <v-img
                    :src="pic"
                    cover
                    style="top: 0; left: 0; position: absolute; right: 0"
                  ></v-img>
                  <div class="d-flex">
                    <v-spacer />
                    <v-btn
                      prepend-icon="mdi-close"
                      size="x-small"
                      variant="flat"
                      class="rounded-0 rounded-bs-lg"
                      @click="() => editedRow[rowMeta.key].splice(i, 1)"
                      color="orange-accent-2"
                      >删除</v-btn
                    >
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12" md="4">
                <UploadImage
                  :model-value="pic"
                  @change="(e) => onAddPics(e, rowMeta.key)"
                />
              </v-col>
            </template>
          </v-row>
        </template>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn size="small" @click="closeRow" variant="tonal">取消</v-btn>
        <v-btn size="small" color="indigo" @click="upsertRow" variant="flat"
          >提交数据</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <AppConfirmDialog ref="confirm" />
</template>

<script setup lang="ts">
import { ColumnMeta, TableMeta } from "@/sdk/airtable/types";
import { Airtable } from "@/sdk/airtable/airtable";
import bugfreed from "@/sdk";
const pic = ref();
const airtable = new Airtable({ bugfreed });

const columns = ref<ColumnMeta[]>([]);
const rows = ref<any[]>([]);
const headers = ref<any[]>([]);
const route = useRoute();
const id = (route.params as { id: string }).id;
const loading = ref(false);
const tab = ref(0);
// 编辑行的dialog
const editRowDialog = ref(false);

const fetchCols = async () => {
  const { success, data } = await airtable.getColumns(id);
  if (!success) return;
  columns.value = data;
  let filter: any[] = [];
  data.forEach((col) => {
    if (col.visible) {
      filter.push({
        title: col.name,
        key: col.key,
        contentType: col.contentType,
      });
    }
  });
  filter.push({ title: "操作", key: "actions" });
  headers.value = [...filter];
};

const fetchRows = async () => {
  if (loading.value) return;
  loading.value = true;
  const { success, data } = await airtable.getRows(id);
  loading.value = false;
  if (!success) return;
  rows.value = data ? data : [];
};

const fetchTable = async () => {
  const { success, data } = await airtable.getTable(id);
  if (!success) return;
  Object.assign(defaultTableMeta, data);
  Object.assign(editTableMeta, data);
};

const defaultTableMeta: TableMeta = {
  id: 0,
  name: "",
  pic: "",
  description: "",
};

const editTableMeta = reactive<TableMeta>({ ...defaultTableMeta });
const closeTab = () => {
  Object.assign(editTableMeta, defaultTableMeta);
};

const updateTab = async () => {
  const { success } = await airtable.updateTable(id, editTableMeta);
  if (!success) {
    useSnackbar("更新失败");
  } else {
    useSnackbar("更新成功");
  }
  await fetchTable();
  closeTab();
};

const editedRow = reactive<Record<string, any>>({});

const closeRow = () => {
  editRowDialog.value = false;
  Object.assign(editedRow, {});
};

const upsertRow = async () => {
  let obj: Record<string, any> = {};
  for (const key in editedRow) {
    if (Array.isArray(editedRow[key])) {
      obj[key] = editedRow[key].join(",");
    } else {
      obj[key] = editedRow[key];
    }
  }

  try {
    let success;

    // 更新行逻辑
    if (editedRow.uuid && editedRow.id) {
      ({ success } = await airtable.updateRow(id, obj.uuid, obj));
      if (success) {
        useSnackbar("更新行成功");
        await fetchRows();
      } else {
        useSnackbar("更新行失败");
      }
    }
    // 添加行逻辑
    else {
      ({ success } = await airtable.addRow(id, obj));
      if (success) {
        useSnackbar("添加行成功");
        await fetchRows();
      } else {
        useSnackbar("添加行失败");
      }
    }

    closeRow();
  } catch (error) {
    console.error("操作失败:", error);
    useSnackbar("操作失败");
  }
};

const onEditRow = async (item: any) => {
  let obj: Record<string, any> = {};
  for (const key in item) {
    // 查找对应的 header
    const header = headers.value.find((header) => header.key === key);
    if (
      header &&
      (header.contentType === "array" || header.contentType === "images")
    ) {
      obj[key] = item[key] ? item[key].split(",") : [];
    } else {
      obj[key] = item[key];
    }
  }

  Object.assign(editedRow, obj);
  editRowDialog.value = true;
};

const onAddRow = async () => {
  editRowDialog.value = true;
  Object.assign(editedRow, {});
};

const confirm = ref();
const dropTable = async () => {
  const ok = await confirm.value.open(
    "删除表？",
    "删除表则会将对挺的Meta和数据删除,请谨慎操作。"
  );

  if (!ok) return;
  const { success } = await airtable.deleteTable(id);
  if (!success) {
    useSnackbar("删除表失败");
  } else {
    useSnackbar("删除表成功");
  }
};

const filteRowMeta = computed(() => {
  if (columns.value.length === 0) return [];
  return columns.value.filter((item) => {
    return item.editable;
  });
});

const deleteRow = async (item: any) => {
  if (!item.uuid) return;
  const { success } = await airtable.deleteRow(id, item.uuid);
  if (!success) {
    useSnackbar("删除行失败");
  } else {
    useSnackbar("删除行成功");
    await fetchRows();
  }
};

const onUpdateTab = async () => {
  try {
    switch (Number(tab.value)) {
      case 1:
        // 当 tab.value 为 1 时，同时获取列和表格数据
        await Promise.all([fetchCols(), fetchTable()]);
        console.log("Columns and table data fetched successfully.");
        break;

      case 3:
        // 当 tab.value 为 3 时，仅获取列数据
        await fetchCols();
        console.log("Columns data fetched successfully.");
        break;

      default:
        console.log(`No specific action for tab value: ${tab.value}`);
        break;
    }
  } catch (error) {
    console.error("Error in onUpdateTab:", error);
    // 这里可以添加适当的错误处理，例如显示错误提示或回滚操作
  }
};

const onAddPics = (e: any, key: string) => {
  console.log(editedRow[key]);
  editedRow[key].push(e);
};

onMounted(() => {
  if (!id || !id.trim()) return;
  Promise.all([fetchCols(), fetchRows(), fetchTable()]);
});
</script>

<style>
.flex-1 {
  flex: 1;
}
</style>
