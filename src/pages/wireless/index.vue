<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-row>
          <v-col cols="12" md="4">
            <v-card height="200" variant="outlined">
              <div class="d-flex flex-column justify-space-between h-100">
                <div>
                  <v-card-item>
                    <v-card-title class="text-subtitle-2"> DEMO </v-card-title>
                  </v-card-item>
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="8">
            <v-card height="200" variant="outlined">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-subtitle-2 text-wrap">
                    CMS AirTable
                  </v-card-title>
                  <v-card-subtitle class="text-caption text-wrap">
                    在 Airtable
                    中创建一个新的基础表格，用于存储和管理您的内容数据。例如，您可以创建一个名为“内容管理”的基础表格。
                  </v-card-subtitle>

                  <v-card-actions>
                    <v-btn
                      size="small"
                      variant="tonal"
                      class="me-4"
                      @click="tableDialog = true"
                    >
                      创建一个
                    </v-btn>
                    <v-btn
                      size="small"
                      variant="elevated"
                      prepend-icon="mdi-video"
                      color="orange-accent-2"
                    >
                      查看教程
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-img
                  src="@/assets/term_sheet.svg"
                  width="200"
                  height="200"
                  class="ma-3"
                ></v-img>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-divider class="my-2" />
          </v-col>
        </v-row>
        <v-data-iterator :items="tables" items-per-page="4" item-value="name">
          <template v-slot:default="{ items }">
            <v-row>
              <v-col
                v-for="item in items"
                :key="item.raw.name"
                cols="12"
                md="6"
                sm="12"
              >
                <v-card>
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="text-body-2">
                        {{ item.raw.name }}</v-card-title
                      >
                      <v-card-subtitle class="text-caption">{{
                        item.raw.description
                      }}</v-card-subtitle>

                      <v-card-actions>
                        <v-btn
                          class="ms-2"
                          variant="tonal"
                          size="small"
                          @click="viewTable(item.raw)"
                        >
                          管理表
                        </v-btn>
                      </v-card-actions>
                    </div>
                    <v-avatar class="ma-3 border" rounded="lg" size="125">
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
                      ></v-img>
                    </v-avatar>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog max-width="800" v-model="tableDialog">
    <v-card>
      <v-toolbar>
        <v-toolbar-title class="text-subtitle-2 font-weight-bold">
          创建Air Table
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-close" @click="closeTableDialog" />
      </v-toolbar>
      <v-divider> </v-divider>
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
          v-model="editTableMeta.description"
          class="mt-4"
        >
        </v-textarea>
      </v-card-text>
      <v-divider> </v-divider>
      <v-card-actions>
        <v-spacer />
        <v-btn color="indigo" size="small" @click="closeTableDialog">
          取消
        </v-btn>
        <v-btn
          color="indigo"
          size="small"
          @click="addTable"
          :loading="tableLoading"
          :disabled="editTableMeta.name === ''"
        >
          提交
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { TableMeta } from "@/sdk/airtable/types";
import bugfreed from "@/sdk";
import { Airtable } from "@/sdk/airtable/airtable";

const airtable = new Airtable({ bugfreed });

const tables = ref<TableMeta[]>([]);

const fetchTables = async () => {
  const { success, data } = await airtable.getTables();
  if (!success) return;
  tables.value = data;
};

const defaultTableMeta: TableMeta = {
  id: 0,
  uuid: "",
  name: "",
  pic: "",
  description: "",
};

const tableDialog = ref(false);
const editTableMeta = reactive<TableMeta>(defaultTableMeta);
const tableLoading = ref(false);

const closeTableDialog = () => {
  Object.assign(editTableMeta, defaultTableMeta);
  tableDialog.value = false;
};

const addTable = async () => {
  if (tableLoading.value || !editTableMeta.name.trim()) return;
  tableLoading.value = true;

  const { success, message } = await airtable.addTable(editTableMeta);
  tableLoading.value = false;
  if (success) {
    await fetchTables();
    closeTableDialog();
    useSnackbar("添加表成功");
  } else {
    useSnackbar(`添加表失败error: ${message}`);
  }
};

const router = useRouter();
const viewTable = (item: TableMeta) => {
  if (!item.uuid) return;

  router.push({
    name: "/wireless/[id]",
    params: {
      id: item.uuid,
    },
  });
};

onMounted(async () => {
  await fetchTables();
});
</script>

<route lang="yaml">
meta:
  title: "Headless"
  breadcrumb: "CMS"
</route>

<style>
.custom-shape-divider-bottom-1717569587 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-bottom-1717569587 svg {
  position: relative;
  display: block;
  width: calc(112% + 1.3px);
  height: 76px;
  transform: rotateY(180deg);
}

.custom-shape-divider-bottom-1717569587 .shape-fill {
  fill: #f5f5f5;
}
</style>
