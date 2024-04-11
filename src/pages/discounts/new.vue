<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <v-toolbar color="transparent">
          <AppBackBtn />
          <v-toolbar-title class="text-body-1 font-weight-bold">
            创建{{ FormTitle[discountType as SupportedTypes] }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn size="small" class="me-2" variant="tonal">取消</v-btn>
          <v-btn size="small" variant="elevated">保存</v-btn>
        </v-toolbar>
      </v-col>
    </v-row>

    <component :is="getComponentName(discountType as SupportedTypes)" />
  </v-container>
</template>

<script setup lang="ts">
import DiscountProductForm from "@/components/discount/ProductForm.vue";
import DiscountOrderForm from "@/components/discount/OrderForm.vue";
import DiscountShippingForm from "@/components/discount/ShippingForm.vue";

const route = useRoute();
const router = useRouter();

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

function isSupportedType(value: string | null): value is SupportedTypes {
  return Object.values(SupportedTypes).includes(value as SupportedTypes);
}

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

onMounted(() => {
  if (!isSupportedType(discountType)) {
    router.push("/discounts/new?type=product");
    return;
  }
});
</script>
