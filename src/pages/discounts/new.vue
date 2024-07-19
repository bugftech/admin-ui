<template>
  <v-toolbar density="comfortable" class="pe-2">
    <v-toolbar-title>
      <AppBackBtn />
      <span class="text-subtitle-2 ms-2"
        >创建{{ FormTitle[discountType as SupportedTypes] }}
      </span>
    </v-toolbar-title>
    <v-spacer />
    <v-btn size="small" class="me-2" variant="tonal">取消</v-btn>
    <v-btn size="small" variant="flat" @click="save" color="indigo"
      >保存数据</v-btn
    >
  </v-toolbar>
  <v-divider />
  <v-container>
    <component
      :is="getComponentName(discountType as SupportedTypes)"
      ref="formRef"
    />
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

const formRef = ref();

const save = async () => {
  if (!formRef.value.save) return;
  await formRef.value.save();
};

onMounted(() => {
  if (!isSupportedType(discountType)) {
    router.push("/discounts/new?type=product");
    return;
  }
});
</script>
