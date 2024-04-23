<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <v-toolbar color="transparent">
          <AppBackBtn />
          <v-toolbar-title class="text-body-1 font-weight-bold">
            {{ item.name }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn size="small" class="me-2" variant="tonal">复制</v-btn>
          <v-btn size="small" variant="elevated" @click="update">更新</v-btn>
        </v-toolbar>
      </v-col>
    </v-row>

    <component
      :is="getComponentName(discountType as SupportedTypes)"
      :item="item"
    />
  </v-container>
</template>

<script setup lang="ts">
import DiscountProductForm from "@/components/discount/ProductForm.vue";
import DiscountOrderForm from "@/components/discount/OrderForm.vue";
import DiscountShippingForm from "@/components/discount/ShippingForm.vue";
import BFSDK from "@/api/sdk";
import { Discount } from "@/interfaces/discount";

const route = useRoute();
const uid = (route.params as { id: string }).id;

const discountType = Array.isArray(route.query.type)
  ? route.query.type[0]
  : route.query.type ?? "";

enum SupportedTypes {
  product = "product",
  order = "order",
  shipping = "shipping",
}

const FormTitle = {
  product: "商品折扣",
  order: "订单折扣",
  shipping: "运费折扣",
};

const getComponentName = (type: string): any => {
  switch (type) {
    case SupportedTypes.product:
      return DiscountProductForm;
    case SupportedTypes.order:
      return DiscountOrderForm;
    case SupportedTypes.shipping:
      return DiscountShippingForm;
    default:
      return DiscountProductForm; // 默认使用商品折扣组件
  }
};

const item = reactive<Discount>({
  id: 0,
  uid: "",
  name: "",
  type: "moneyOffProduct",
  way: "automatic",
  code: "",
  description: "",
  priceStrategy: "percentage_amount", // 默认百分比
  priceStrategyValue: 0,
  priceStrategyPercent: 0,
  minPurchaseStrategy: "none",
  minPurchaseValue: 0,
  maxUsageCount: 0,
  oncePerCustomer: false,
  oncePerOrder: false,
  customerStrategy: "all",
  published: false,
  products: [],
  startDate: new Date().getTime(),
  endDate: undefined,
  customers: [],
});

const update = () => {};

onMounted(async () => {
  const { success, data } = await BFSDK.getDiscountByUid(uid);
  if (success) {
    Object.assign(item, data);
  }
});
</script>
