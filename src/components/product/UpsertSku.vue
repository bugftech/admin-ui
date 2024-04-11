<template>
  <v-card class="mt-4">
    <v-toolbar color="transparent" density="compact">
      <v-toolbar-title class="text-caption font-weight-bold">
        变体
      </v-toolbar-title>
    </v-toolbar>
    <v-divider />
    <v-card-text>
      <v-sheet class="border rounded-lg mb-2" v-if="variants.length">
        <div v-for="(item, i) in variants" :key="i">
          <div v-if="!item.lock" class="ma-2">
            <v-form :ref="formRefs[i]">
              <AppLabel class="ml-12">变体名称</AppLabel>
              <v-combobox
                variant="solo-filled"
                flat
                prepend-icon="mdi-rename-box"
                density="compact"
                :rules="nonEmptyRules"
                v-model="item.title"
                :items="['颜色', '尺寸', '样式', '材料']"
                hide-details="auto"
                @click:append="onDeleteVariant(i)"
                append-icon="mdi-trash-can-outline"
              >
              </v-combobox>

              <AppLabel class="mt-4 ml-12">变体值</AppLabel>
              <div v-for="(val, idx) in item.values" :key="idx">
                <v-text-field
                  variant="solo-filled"
                  flat
                  class="mb-1"
                  prepend-icon="mdi-dots-grid"
                  @update:modelValue="onChange(i, idx)"
                  v-model="item.values[idx]"
                  placeholder="请输入变体值"
                  @click:append="onDeleteVariantItem(i, idx)"
                  :rules="
                    idx + 1 < item.values.length || idx === 0
                      ? nonEmptyRules
                      : undefined
                  "
                  :append-icon="
                    item.values.length > 2 && idx + 1 < item.values.length
                      ? 'mdi-delete'
                      : ''
                  "
                >
                </v-text-field>
              </div>
              <v-btn
                size="small"
                class="mt-2 ml-12"
                @click="onLockVariant(i)"
                variant="tonal"
                >完成</v-btn
              >
            </v-form>
          </div>

          <v-list-item v-else prepend-icon="mdi-dots-grid">
            <v-list-item-title class="text-caption font-weight-bold">
              {{ item.title }}
            </v-list-item-title>

            <v-chip-group>
              <template v-for="(val, i) in item.values" :key="i">
                <v-chip size="small" v-if="val">
                  {{ val }}
                </v-chip>
              </template>
            </v-chip-group>

            <template v-slot:append>
              <VBtn @click="item.lock = false" size="small" variant="tonal"
                >编辑</VBtn
              >
            </template>
          </v-list-item>
          <v-divider />
        </div>
      </v-sheet>
      <v-btn
        color="indigo"
        prepend-icon="mdi-plus"
        size="small"
        variant="text"
        @click="addVariant"
      >
        添加SKU属性
      </v-btn>
    </v-card-text>
    <v-divider />
    <v-data-table
      hide-no-data
      :items="items"
      :headers="headers"
      class="text-caption"
    >
      <template v-slot:[`item.skuAttributes`]="{ item }">
        <v-list-item class="pa-0">
          <template v-slot:prepend>
            <v-avatar class="rounded-lg border">
              <v-img :src="item.pic" v-if="item.pic" />
              <v-icon icon="mdi-image" v-else />
            </v-avatar>
          </template>
          <v-list-item-title class="text-caption font-weight-bold">
            {{ convertToString(item.skuAttributes) }}
          </v-list-item-title>
        </v-list-item>
      </template>
      <template v-slot:[`item.skuCode`]="{ item }">
        {{ item.skuCode }}
      </template>
      <template v-slot:[`item.price`]="{ item }">
        {{ item.price }}
      </template>
      <template v-slot:[`item.stock`]="{ item }">
        {{ item.stock }}
      </template>
      <template v-slot:bottom> </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          icon="mdi-pencil"
          size="x-small"
          color="indigo"
          @click="editItem(item)"
        />
      </template>
    </v-data-table>
    <v-dialog max-width="800" v-model="skuDialog">
      <v-card>
        <v-toolbar color="transparent">
          <v-toolbar-title class="text-subtitle-2 font-weight-bold"
            >编辑
            {{ convertToString(editedSku.skuAttributes) }}</v-toolbar-title
          >
          <v-spacer />
          <v-btn icon="mdi-close" variant="text" @click="close" />
        </v-toolbar>
        <v-divider />
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <AppLabel>图片</AppLabel>
              <v-row>
                <v-col cols="12" md="6" v-if="editedSku.pic">
                  <v-sheet
                    class="border rounded-lg overflow-hidden"
                    height="100px"
                    style="position: relative"
                  >
                    <v-img
                      :src="editedSku.pic"
                      cover
                      style="top: 0; left: 0; position: absolute; right: 0"
                    ></v-img>
                    <div class="d-flex">
                      <v-spacer />
                      <v-btn
                        icon="mdi-close"
                        size="x-small"
                        variant="flat"
                        @click="editedSku.pic = ''"
                        color="orange-accent-2"
                      ></v-btn>
                    </div>
                  </v-sheet>
                </v-col>
                <v-col cols="12" :md="editedSku.pic ? 6 : 12">
                  <UploadImage @change="onChangePic"></UploadImage>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="12">
              <AppLabel>SKU编号</AppLabel>
              <v-text-field
                variant="solo-filled"
                flat
                v-model="editedSku.skuCode"
              />
            </v-col>
            <v-col cols="12" md="4">
              <AppLabel>价格</AppLabel>
              <v-text-field
                variant="solo-filled"
                flat
                prefix="¥"
                suffix="元"
                persistent-placeholder
                type="number"
                step="0.01"
                min="0"
                v-model.number="editedSku.price"
              />
            </v-col>
            <v-col cols="12" md="4">
              <AppLabel>促销价格</AppLabel>
              <v-text-field
                variant="solo-filled"
                flat
                prefix="¥"
                suffix="元"
                persistent-placeholder
                type="number"
                step="0.01"
                min="0"
                v-model.number="editedSku.promotionPrice"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <AppLabel>库存</AppLabel>
              <v-text-field
                variant="solo-filled"
                flat
                type="number"
                step="1"
                min="0"
                v-model.number="editedSku.stock"
              />
            </v-col>
            <v-col cols="12" md="4">
              <AppLabel>最低库存</AppLabel>
              <v-text-field
                variant="solo-filled"
                flat
                type="number"
                step="1"
                min="0"
                v-model.number="editedSku.lowStock"
              />
            </v-col>
            <v-col cols="12" md="4">
              <AppLabel>锁定库存</AppLabel>
              <v-text-field
                variant="solo-filled"
                flat
                type="number"
                step="1"
                min="0"
                v-model.number="editedSku.lockStock"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn size="small" color="indigo" @click="save"> 保存 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { nonEmptyRules } from "@/composables/formRules";
import { ref, computed, toRefs } from "vue";
const props = defineProps({
  skus: Array,
});

const variants = ref([]);
const formRefs = ref([]);

const headers = [
  {
    title: "变体",
    value: "skuAttributes",
  },
  {
    title: "SKU",
    value: "skuCode",
  },
  {
    title: "价格",
    value: "price",
  },
  {
    title: "可售",
    value: "stock",
  },
  {
    title: "编辑",
    value: "actions",
    align: "end",
  },
];

const skuDialog = ref(false);
const editedSku = ref({});
const editedIndex = ref(-1);
const { skus } = toRefs(props);
const items = ref([]);
const addVariant = () => {
  // 创建一个新的 ref，并将其推入 formRefs 数组
  const formRef = ref(null);
  formRefs.value.push(formRef);
  variants.value.push({
    title: "",
    lock: false,
    values: [""],
  });
};

const onChange = (i, idx) => {
  // Ensure the array exists before pushing to it
  if (!variants.value[i]?.values) {
    variants.value[i].values = [];
  }

  // 已经输入过值。则不新增
  if (variants.value[i].values.length > idx + 1) return;
  // 数组新增一个元素
  variants.value[i].values.push("");
};

const onLockVariant = async (i) => {
  console.log("idx", variants.value[i]);
  if (!variants.value[i]) return;

  // 获取表单引用并验证
  const formRef = formRefs.value[i]?.value;
  if (!formRef) return;
  const res = await formRef[0].validate();
  if (res.valid) {
    variants.value[i].lock = true;
  }
};

const onDeleteVariant = (i) => {
  if (i < 0 || i >= variants.value.length) return;
  variants.value.splice(i, 1);
  formRefs.value.splice(i, 1); // 删除对应的表单引用
};

const onDeleteVariantItem = (i, idx) => {
  if (
    i < 0 ||
    i >= variants.value.length ||
    idx < 0 ||
    idx >= variants.value[i].values.length
  )
    return;
  variants.value[i].values.splice(idx, 1);
};

const convertToString = (list) => {
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

const defaultSku = ref({
  productId: 0,
  skuCode: "",
  stock: 0,
  lowStock: 0,
  lockStock: 0,
  price: 0,
  promotionPrice: 0,
  skuAttributes: [],
  pic: "",
});

const editItem = (item) => {
  const itemId = item.id;
  editedIndex.value = items.value.findIndex((i) => i.id === itemId);
  editedSku.value = Object.assign({}, defaultSku.value, item);
  skuDialog.value = true;
};

const close = () => {
  skuDialog.value = false;
  nextTick(() => {
    editedSku.value = Object.assign({}, defaultSku.value);
    editedIndex.value = -1;
  });
};

watchEffect(() => {
  if (skus.value.length > 0) {
    skus.value.forEach((item) => {
      if (!item.skuAttributes || item.skuAttributes.length === 0) return;
      item.skuAttributes.forEach((sku) => {
        const idx = variants.value.findIndex((vari) => vari.title === sku.key);
        if (idx === -1) {
          const formRef = ref(null);
          formRefs.value.push(formRef);

          variants.value.push({
            title: sku.key,
            lock: true,
            values: [sku.value],
          });
        } else {
          if (!variants.value[idx].values.includes(sku.value)) {
            variants.value[idx].values.push(sku.value);
          }
        }
      });
    });
  }
  const combinations = [];
  const generateCombinations = (arr) => {
    const generate = (index, currentCombination) => {
      if (arr.length === 0) return;
      if (currentCombination.length === arr.length) {
        combinations.push(currentCombination);
        return;
      }
      const currentItem = arr[index];
      if (currentItem) {
        if (currentItem.title == "") return;
        currentItem.values.forEach((value) => {
          if (value !== "") {
            const newCombination = [...currentCombination];
            newCombination.push({ key: currentItem.title, value });
            generate(index + 1, newCombination);
          }
        });
      } else {
        generate(index + 1, currentCombination);
      }
    };

    generate(0, []);

    return combinations.map((combination, idx) => {
      return {
        id: idx,
        skuAttributes: combination,
        skuCode: "",
        price: 0,
        stock: 0,
      };
    });
  };

  const arr = generateCombinations(variants.value);
  if (arr.length === 0) {
    items.value = arr;
    return;
  }

  items.value = arr.map((item) => {
    const idx = skus.value.findIndex(
      (sku) =>
        JSON.stringify(sku.skuAttributes) === JSON.stringify(item.skuAttributes)
    );

    if (idx === -1) return item;
    return { ...item, ...skus.value[idx] };
  });
});

const save = () => {
  if (editedIndex.value > -1) {
    const index = editedIndex.value;
    const itemToUpdate = items.value[index];
    Object.assign(itemToUpdate, {
      skuCode: editedSku.value.skuCode,
      price: editedSku.value.price,
      promotionPrice: editedSku.value.promotionPrice,
      stock: editedSku.value.stock,
      lowStock: editedSku.value.lowStock,
      lockStock: editedSku.value.lockStock,
      pic: editedSku.value.pic,
    });
    // 触发响应式更新
    items.value = [
      ...items.value.slice(0, index),
      itemToUpdate,
      ...items.value.slice(index + 1),
    ];
  }
  close();
};

const onChangePic = (e) => {
  editedSku.value.pic = e;
};

defineExpose({
  items,
});
</script>
