<template>
  <v-sheet style="position: relative; margin-top: -56px" color="transparent">
    <v-container style="padding-top: 56px">
      <v-row align="center" justify="center">
        <v-col cols="12" md="4">
          <v-card
            variant="flat"
            color="transparent"
            style="margin: 50px 0px 50px 0px"
          >
            <v-card-item>
              <v-card-title class="text-subtitle-1 font-weight-bold"
                >CMS AirTable</v-card-title
              >
              <v-card-subtitle class="text-wrap">
                在 Airtable
                中创建一个新的基础表格，用于存储和管理您的内容数据。例如，您可以创建一个名为“内容管理”的基础表格。
              </v-card-subtitle>
            </v-card-item>

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
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-img width="100%" src="@/assets/term_sheet.svg"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
  <v-divider />
  <v-container>
    <v-data-iterator :items="tables" items-per-page="4" item-value="name">
      <template v-slot:default="{ items }">
        <v-row justify="center">
          <v-col
            v-for="item in items"
            :key="item.raw.name"
            cols="8"
            md="3"
            sm="12"
          >
            <v-card>
              <v-img
                :src="item.raw.pic"
                class="ma-3 border rounded-lg"
                height="100"
              ></v-img>

              <v-card-title class="text-subtitle-2">
                {{ item.raw.name }}</v-card-title
              >
              <v-card-subtitle class="text-caption">{{
                item.raw.description
              }}</v-card-subtitle>
              <v-card-actions>
                <v-btn
                  block
                  prepend-icon="mdi-location-enter"
                  variant="tonal"
                  size="small"
                  color="indigo"
                  @click="viewTable(item.raw)"
                >
                  管理表
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
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
import BFSDK from "@/api/sdk";
import { TableMeta } from "@/interfaces/airtable";

const tables = ref<TableMeta[]>([]);
const fetchTables = async () => {
  const { success, data } = await BFSDK.getAirTables();
  if (!success) return;
  tables.value = data;
};

const defaultTableMeta: TableMeta = {
  id: 0,
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
  if (tableLoading.value || editTableMeta.name === "") return;
  tableLoading.value = true;

  const { success } = await BFSDK.addAirTable(editTableMeta);
  tableLoading.value = false;
  if (!success) return;
  await fetchTables();
  closeTableDialog();
};

const router = useRouter();
const viewTable = (item: TableMeta) => {
  router.push({
    name: "/wireless/[id]",
    params: {
      id: item.id,
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
