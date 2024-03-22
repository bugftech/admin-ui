<template>
  <v-select
    hide-details
    density="compact"
    variant="solo-filled"
    flat
    placeholder="选择分类"
    v-model="selectedCategory"
    :items="items"
    return-object
    item-title="name"
    item-value="id"
  >
  </v-select>
</template>

<script setup lang="ts">
import { API } from "@/services";
import { AxiosError } from "axios";
import { Category } from "@/interfaces/category";

interface AllCategory extends Category {
  items?: Category[];
}

const items = ref([]);
const props = defineProps({
  id: Number,
  name: String,
});

const emit = defineEmits(["update:id", "update:name"]);

const selectedCategory = ref({ id: 0, name: "" });

function flattenCategories(categories, parentName = "") {
  const result = [];
  for (const category of categories) {
    const categoryName = parentName
      ? `${parentName}/${category.name}`
      : category.name;
    if (category.level !== 1) {
      result.push({ id: category.id, name: categoryName });
    }
    if (category.items && category.items.length > 0) {
      result.push(...flattenCategories(category.items, categoryName));
    }
  }
  return result;
}

// 监听 selectedId 和 selectedName 的变化，并在变化时触发相应的事件通知父组件
watchEffect(() => {
  emit("update:id", selectedCategory.value.id);
  emit("update:name", selectedCategory.value.name);
});

onMounted(async () => {
  try {
    const { data, status } = await API.bugfreed.list<AllCategory>(
      "pms/categories"
    );
    if (status === 200) {
      items.value = flattenCategories(data.data);
    }
  } catch (error) {
    const _error = error as AxiosError<string>;
    console.error(_error);
  }
});
</script>
