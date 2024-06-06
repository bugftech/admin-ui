<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12">
        <v-toolbar extended fixed color="transparent">
          <AppBackBtn />
          <v-toolbar-title class="text-body-1 font-weight-bold">
            管理Air Table
          </v-toolbar-title>
          <v-spacer />
          <v-btn
            variant="outlined"
            size="small"
            color="indigo"
            append-icon="mdi-content-copy"
            >订阅ID: {{ id }}</v-btn
          >
          <template v-slot:extension>
            <v-tabs density="compact" v-model="tab">
              <v-tab class="text-caption" value="1"> 数据 </v-tab>
              <v-tab class="text-caption" value="2"> 表元数据 </v-tab>
              <v-tab class="text-caption" value="3"> 列元数据 </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-divider />
        <v-alert
          class="mt-2 text-caption"
          icon="mdi-alert"
          density="compact"
          text="CMS AirTable正在开发中。功能尚未开发完全。"
          color="red"
        ></v-alert>
      </v-col>
      <v-col cols="12">
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="1">
            <v-card>
              <v-toolbar density="comfortable" color="transparent">
                <v-btn icon="mdi-sync" @click="fetchRows" size="small" />
                <v-spacer />
                <v-btn
                  prepend-icon="mdi-flask-empty-minus-outline"
                  size="small"
                  variant="elevated"
                  rounded="lg"
                  class="me-2"
                  @click="fetchCols"
                  >重置表头</v-btn
                >

                <v-btn
                  prepend-icon="mdi-flask-empty-minus-outline"
                  size="small"
                  variant="elevated"
                  rounded="lg"
                  class="me-2"
                  color="indigo"
                  @click="editRowDialog = true"
                  >添加数据</v-btn
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
                      size="small"
                    >
                      {{ header.title }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-container>

              <v-divider />
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
                      <v-avatar v-if="header.key === 'image'" size="48">
                        <v-img :src="item[header.key]"></v-img>
                      </v-avatar>
                      <div v-else-if="header.key === 'actions'" class="d-flex">
                        <v-icon class="me-2" @click="onEditRow(item)" disabled
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
                <template v-slot:loading>
                  <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
                </template>
              </v-data-table>
            </v-card>
          </v-tabs-window-item>
          <v-tabs-window-item value="2">
            <v-row justify="center">
              <v-col cols="12" md="8">
                <v-card class="mb-2">
                  <v-toolbar color="transparent">
                    <v-card-title class="text-subtitle-2">
                      表元数据
                    </v-card-title>
                  </v-toolbar>
                  <v-divider />
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
                    <v-btn
                      size="small"
                      class="me-2"
                      color="indigo"
                      @click="closeTab"
                      >取消</v-btn
                    >
                    <v-btn size="small" color="indigo" @click="updateTab"
                      >更新</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-tabs-window-item>
          <v-tabs-window-item value="3">
            <v-row justify="center">
              <v-col cols="12" md="8">
                <AirtableColumnTable :id="id" />
              </v-col>
            </v-row>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="editRowDialog" max-width="600">
    <v-card>
      <v-toolbar>
        <v-toolbar-title class="text-subtitle-2 font-weight-bold">
          {{ editedRow["id"] ? "编辑" : "新增" }}
        </v-toolbar-title>
      </v-toolbar>
      <v-divider />
      <v-card-text>
        <template v-for="(rowMeta, i) in filteRowMeta" :key="i">
          <AppLabel>
            {{ rowMeta.name }}
          </AppLabel>
          <v-text-field
            v-model="editedRow[rowMeta.key]"
            variant="solo-filled"
            flat
            density="compact"
          >
          </v-text-field>
        </template>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn size="small" color="indigo" @click="closeRow">取消</v-btn>
        <v-btn size="small" color="indigo" @click="addRow">提交</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ColumnMeta, TableMeta } from "@/interfaces/airtable";
import BFSDK from "@/api/sdk";
const columns = ref<ColumnMeta[]>([]);
const rows = ref<any[]>([]);
const route = useRoute();
const id = (route.params as { id: number }).id;
const loading = ref(false);
const tab = ref(0);
const headers = ref<any[]>([]);

// 编辑行的dialog
const editRowDialog = ref(false);

const fetchCols = async () => {
  const { success, data } = await BFSDK.getAirTableColumns(id);
  if (!success) return;
  columns.value = data;
  let filter: any[] = [];
  data.forEach((col) => {
    if (col.visible) {
      filter.push({ title: col.name, key: col.key });
    }
  });
  filter.push({ title: "操作", key: "actions" });
  headers.value = [...filter];
};

const fetchRows = async () => {
  if (loading.value) return;
  loading.value = true;
  const { success, data } = await BFSDK.getAirTableRows(id);
  loading.value = false;
  if (!success) return;
  rows.value = data;
};

const fetchTable = async () => {
  const { success, data } = await BFSDK.getAirTable(id);
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
  const { success } = await BFSDK.updateAirTable(id, editTableMeta);
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

const addRow = async () => {
  const { success } = await BFSDK.addAirTableRow(id, editedRow);
  if (!success) {
    useSnackbar("添加行失败");
  } else {
    useSnackbar("添加行成功");
    await fetchRows();
  }

  closeRow()
};

const onEditRow = async (item: any) => {
  Object.assign(editedRow, item);
};

const editRow = async (item: any) => {
  if (!item.id) return;
  const { success } = await BFSDK.updateAirTableRow(id, item.id, item);
  if (!success) {
    useSnackbar("更新行失败");
  } else {
    useSnackbar("更新行成功");
    await fetchRows();
  }
};


const filteRowMeta = computed(() => {
  if (columns.value.length === 0) return [];
  return columns.value.filter((item) => {
    return item.key !== "id" || item.visible;
  });
});

const deleteRow = async (item: any) => {
  if (!item.id) return;
  const { success } = await BFSDK.deleteAirTableRow(id, item.id);
  if (!success) {
    useSnackbar("删除行失败");
  } else {
    useSnackbar("删除行成功");
    await fetchRows();
  }
};

onMounted(() => {
  if (!id || id === 0) return;
  Promise.all([fetchCols(), fetchRows(), fetchTable()]);
});
</script>
