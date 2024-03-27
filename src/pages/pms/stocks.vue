<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-btn variant="tonal" size="small"> 导入 </v-btn>
          <v-btn variant="tonal" size="small" class="mx-2"> 导出 </v-btn>
        </AppBreadcrumb>

        <v-card class="mt-4">
          <v-toolbar color="transparent">
            <v-responsive max-width="344">
              <v-text-field
                flat
                density="compact"
                variant="solo-filled"
                placeholder="检索"
                class="ms-2"
                prepend-inner-icon="mdi-magnify"
                v-model="search"
              >
              </v-text-field>
            </v-responsive>
            <v-spacer />
          </v-toolbar>
          <v-divider />
          <v-data-table
            :headers="headers"
            class="text-caption"
            hover
            :search="search"
            :items="skus"
          >
            <template v-slot:[`item.variant`]="{ item }">
              <v-list-item class="pa-0">
                <template v-slot:prepend>
                  <v-avatar class="rounded-lg border">
                    <v-img :src="item.pic" v-if="item.pic" />
                    <v-icon icon="mdi-image" v-else />
                  </v-avatar>

                  <v-list-item-title class="text-caption font-weight-bold ms-2">
                    {{ item.skuAttributes[0]?.value }}
                  </v-list-item-title>
                </template>
              </v-list-item>
            </template>
            <template v-slot:[`item.skuCode`]="{ item }">
              <div>WG-A-001-BLACK</div>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-icon
                    icon="mdi-dots-vertical"
                    size="x-large"
                    v-bind="props"
                  >
                  </v-icon>
                </template>
                <v-list>
                  <v-list-item>
                    <v-btn
                      @click="edit(item)"
                      size="small"
                      prepend-icon="mdi-pencil"
                      >编辑</v-btn
                    >
                  </v-list-item>

                  <v-list-item>
                    <v-btn
                      @click="remove(item)"
                      size="small"
                      prepend-icon="mdi-delete"
                      >删除</v-btn
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </v-card>
        <AppConfirmDialog ref="confirm"> </AppConfirmDialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { SkuStock } from "@/interfaces/skuStock";
const skus = ref([]);
const search = ref("");
const confirm = ref();
const headers = [
  {
    title: "变体",
    value: "variant",
  },
  {
    title: "商品ID",
    value: "productId",
  },
  {
    title: "SKU编号",
    value: "skuCode",
  },
  {
    title: "锁定库存",
    value: "lock",
  },
  {
    title: "现货",
    value: "stock",
  },
  {
    title: "操作",
    value: "actions",
    align: "end",
  },
];

const router = useRouter();

const edit = (item: SkuStock) => {
  router.push({ name: "/pms/products/[id]/", params: { id: item.productId } });
};

const remove = (item: SkuStock) => {
  if (!item) return;
  confirm.value
    .open(
      `删除分类 ${item.skuAttributes} ?`,
      "删除之后则会将永久永久抹除。请确认后再删除！",
      { color: "red" }
    )
    .then((ok: boolean) => {
      if (ok) {
        alert(ok);
      }
    });
};

onMounted(async () => {
  const { data, success } = await BFSDK.getSkus();
  if (success) {
    data.forEach((element: SkuStock) => {
      if (!element.skuAttributes) return;
      element.skuAttributes = JSON.parse(element.skuAttributes);
    });

    skus.value = data;
  }
});
</script>

<route lang="yaml">
meta:
  breadcrumb: 库存
</route>
