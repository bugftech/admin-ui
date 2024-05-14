<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
        </AppBreadcrumb>

        <v-card class="mt-4">
          <v-text-field
            flat
            density="compact"
            variant="solo"
            placeholder="检索"
            prepend-inner-icon="mdi-magnify"
            v-model="search"
          >
          </v-text-field>
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
                    {{ convertToString(item.skuAttributes) }}
                  </v-list-item-title>
                </template>
              </v-list-item>
            </template>
            <template v-slot:[`item.skuCode`]="{ item }">
              <div>{{ item.skuCode ? item.skuCode : "WG-A-001-BLACK" }}</div>
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

const skus = ref<SkuStock[]>([]);
const search = ref("");
const confirm = ref();

const headers: any[] = [
  {
    title: "变体",
    key: "variant",
  },
  {
    title: "商品ID",
    key: "productId",
  },
  {
    title: "SKU编号",
    key: "skuCode",
  },
  {
    title: "锁定库存",
    key: "lock",
  },
  {
    title: "现货",
    key: "stock",
  },
  {
    title: "操作",
    key: "actions",
    align: "end",
  },
];

const router = useRouter();

const edit = (item: SkuStock) => {
  router.push({ name: "/pms/products/[id]", params: { id: item.productId } });
};

const convertToString = (list: any) => {
  if (!Array.isArray(list)) {
    return "";
  }

  return list
    .map((item) => {
      if (item && typeof item.value !== "undefined") {
        return item.value;
      } else {
        return "";
      }
    })
    .join("/");
};

onMounted(async () => {
  const { data, success } = await BFSDK.getSkus();
  if (success) {
    skus.value = data;
  }
});
</script>

<route lang="yaml">
meta:
  title: "商品库存"
  breadcrumb: 库存
</route>
