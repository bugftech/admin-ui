<template>
  <app-toolkit-bar>
    <v-btn size="small" append-icon="mdi-plus" theme="dark" variant="flat" to="/pms/brands/new"
      >添加品牌</v-btn
    >
    <v-divider class="mx-2 my-3" vertical />
    <v-btn prepend-icon="mdi-sync" size="small" @click="fetch" class="border"
      >刷新数据</v-btn
    >
    <v-spacer />
    <v-text-field
      flat
      max-width="200"
      density="compact"
      variant="solo-filled"
      placeholder="检索"
      prepend-inner-icon="mdi-magnify"
      v-model="search"
    >
    </v-text-field>
  </app-toolkit-bar>

  <v-data-table
    :items="items"
    :headers="headers"
    class="text-caption"
    :loading="loading"
  >
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
    <template v-slot:[`no-data`]>
      <v-sheet>
        <v-img src="@/assets/404.svg" height="200px" class="my-8"> </v-img>
        <div class="text-caption">
          品牌用于整理产品的类别。在程序中可帮助用户快速过滤品牌的归属商品
        </div>
        <v-btn
          size="small"
          class="ma-4"
          color="orange-accent-2"
          variant="flat"
          to="/pms/brands/new"
          >添加品牌</v-btn
        >
      </v-sheet>
    </template>
    <template v-slot:[`item.factoryMade`]="{ item }">
      <v-checkbox-btn
        v-model="item.factoryMade"
        :true-value="true"
        :false-value="false"
        readonly
      >
      </v-checkbox-btn>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon class="me-2" @click="editBrand(item)">mdi-pencil</v-icon>
      <v-icon class="me-2" @click="deleteBrand(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:[`item.logo`]="{ item }">
      <v-avatar class="rounded-lg border">
        <v-img :src="item.logo" v-if="item.logo" />
        <v-icon icon="mdi-image" v-else />
      </v-avatar>
    </template>
    <template v-slot:[`item.banner`]="{ item }">
      <v-avatar class="rounded-lg border">
        <v-img :src="item.banner" v-if="item.banner" />
        <v-icon icon="mdi-image" v-else />
      </v-avatar>
    </template>
  </v-data-table>
  <app-confirm-dialog ref="confirm"> </app-confirm-dialog>
</template>

<script setup lang="ts">
import { Brand } from "@/sdk/pms/brand/types";
import { PMS } from "@/sdk/pms/pms";
import bugfreed from "@/sdk";

const pms = new PMS({ bugfreed });
const search = ref("");
const items = ref<Brand[]>([]);
const loading = ref(false);

const headers: any[] = [
  { title: "名称", key: "name" },
  { title: "首字母", key: "firstLetter" },
  { title: "工厂制造", key: "factoryMade" },
  { title: "品牌LOGO", key: "logo" },
  { title: "专区大图", key: "banner" },
  { title: "操作", key: "actions" },
];

const fetch = async () => {
  if (loading.value) return;
  loading.value = true;
  const { success, data } = await pms.brand().list();
  if (!success) {
    loading.value = false;
    return;
  }

  items.value = data;
  loading.value = false;
};

const router = useRouter();

const editBrand = (item: Brand) => {
  router.push({
    name: "/pms/brands/[id]",
    params: {
      id: item.id,
    },
  });
};

const confirm = ref();
const deleteBrand = async (item: Brand) => {
  confirm.value
    .open(
      "删除品牌",
      `删除品牌为一个不可逆操作，删除后将无法再次回退，请谨慎操作。`
    )
    .then(async (ok: boolean) => {
      if (ok) {
        const { success } = await pms.brand().delete(item.id);
        if (!success) {
          useSnackbar("删除品牌失败");
        } else {
          useSnackbar("删除品牌成功");
          await fetch();
        }
      }
    });
};

onMounted(async () => {
  await fetch();
});
</script>
