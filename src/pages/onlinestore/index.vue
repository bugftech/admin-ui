<template>
  <v-container>
    <v-row>
      <template v-for="(item, i) in items" :key="i">
        <v-col cols="12" md="3">
          <v-card>
            <v-img
              :src="item.variant ? item.skuPic : item.productPic"
              height="100px"
              contain
            />
            <v-card-text class="d-flex justify-content-between align-end">
              <div class="flex-grow-1">
                <div class="text-subtitle-2">{{ item.productName }}</div>
                <div class="text-caption v-label">
                  {{
                    item.skuAttributes
                      ? convertToString(item.skuAttributes)
                      : ""
                  }}
                </div>
                <div class="d-flex mt-2">
                  <div class="text-subtitle mr-2 font-weight-bold text-red">
                    ¥ {{ item.productPrice / 100 }}
                  </div>
                  <div
                    class="text-subtitle mr-2 font-weight-bold text-decoration-line-through"
                  >
                    ¥ {{ item.productPrice / 100 }}
                  </div>
                </div>
              </div>
              <div class="d-flex flex-column">
                <v-btn
                  icon="mdi-plus"
                  size="x-small"
                  rounded="lg"
                  variant="tonal"
                  color="green"
                ></v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import BFSDK from "@/api/sdk";
import { ProductOrSkuDTO } from "@/interfaces/product";

const items = ref<ProductOrSkuDTO[]>([]);
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
  const { success, data } = await BFSDK.getProductsAndSkus();
  if (success) items.value = data;
});
</script>

<route lang="yaml">
meta: 
  title: "预览商店"
  breadcrumb: "预览商店"
</route>
