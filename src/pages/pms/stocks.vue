<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <!--面包屑-->
        <AppBreadcrumb>
          <v-btn variant="tonal" size="small"> 导入 </v-btn>
          <v-btn variant="tonal" size="small" class="mx-2"> 导出 </v-btn>
          <v-btn variant="flat" size="small" color="grey-darken-4">
            查看商品
          </v-btn>
        </AppBreadcrumb>

        <v-card class="mt-4">
          <v-toolbar color="transparent">
            <v-responsive max-width="344">
              <v-text-field
                flat
                density="compact"
                variant="solo-filled"
                placeholder="检索"
                class="me-2"
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
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon icon="mdi-dots-vertical" size="x-large"> </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import BFSDK from "@/api/sdk";
const skus = ref([]);
const search = ref("");

const headers = [
  {
    title: "变体",
    value: "variant",
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

onMounted(async () => {
  const { data, success } = await BFSDK.getSkus();
  if (success) {
    data.forEach(element => {
      if (!element.skuAttributes) return;
      element.skuAttributes = JSON.parse(element.skuAttributes)
    });

    skus.value = data;
  }
});

</script>

<route lang="yaml">
meta:
  breadcrumb: 库存
</route>
