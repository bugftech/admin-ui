<template>
  <v-select
    hide-details
    density="compact"
    variant="solo-filled"
    flat
    placeholder="选择分类"
    v-model="selectedCategory"
    :items="items"
    item-title="name"
    item-value="id"
    return-object
    clearable
    @click:clear="onClear"
    :disabled="disabled"
  >
    <template v-slot:no-data>
      <div class="text-center">
        <div class="text-body-2 font-weight-bold my-2">尚未添加分类</div>
      </div>
    </template>
  </v-select>
</template>

<script setup lang="ts">
import { AllCategory, Category } from "@/interfaces/category";
import BFSDK from "@/api/sdk";
import { toRefs } from "vue";

const props = defineProps({
  id: {
    type: Number, // 表示类型可以是 number 或 null
    default: 0, // 可选，指定默认值为 null
  },
  name: {
    type: String, // 表示类型可以是 number 或 null
    default: "", // 可选，指定默认值为 null
  },
  // parentId 添加分类时候，选择父级分类设定
  parentId: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  disabled: Boolean,
});

const items = ref<AllCategory[]>([]);
const { id, name, parentId } = toRefs(props);

const selectedCategory = ref<any>({
  id: props.parentId > 0 ? parentId.value : id.value,
  name: name.value,
});

const onClear = () => {
  selectedCategory.value.id = 0;
  selectedCategory.value.name = "";
};

const emit = defineEmits(["update:id", "update:name", "update:parentId"]);

function flattenCategories(
  categories: AllCategory[],
  parentName = ""
): AllCategory[] {
  const result: AllCategory[] = [];
  for (const category of categories) {
    const categoryName = parentName
      ? `${parentName}/${category.name}`
      : category.name;
    if (category.level !== 1) {
      // 复制所有必需的属性到新的 Category 对象中
      const newCategory: Category = {
        id: category.id,
        parentId: category.parentId,
        name: categoryName,
        level: category.level,
        count: category.count,
        unit: category.unit,
        sort: category.sort,
        icon: category.icon,
        image: category.image,
        keywords: category.keywords,
        description: category.description,
      };
      result.push(newCategory);
    }

    if (category.items && category.items.length > 0) {
      result.push(...flattenCategories(category.items, categoryName));
    }
  }
  return result;
}

// 监听 selectedId 和 selectedName 的变化，并在变化时触发相应的事件通知父组件
watch(selectedCategory, (newVal) => {
  emit("update:id", newVal.id);
  emit("update:name", newVal.name);
  emit("update:parentId", newVal.id);
});

watch(props, () => {
  selectedCategory.value.id = parentId.value > 0 ? parentId.value : id.value;
  selectedCategory.value.name = name.value;
});

onMounted(async () => {
  let res = null;
  if (props.parentId > 0) {
    res = await BFSDK.filterCategories("1");
  } else {
    res = await BFSDK.getCategories();
  }

  const { success, data } = res;
  if (!success) return;
  items.value =
    props.parentId > 0 || props.id === 0 ? data : flattenCategories(data);
  let idx = items.value.findIndex((item) => {
    // 编辑模式
    if (props.parentId > 0) {
      return item.id === props.parentId;
    }

    if (props.id > 0) {
      return item.id === props.id;
    }
  });

  if (idx > -1) {
    selectedCategory.value = {
      id: items.value[idx].id,
      name: items.value[idx].name,
    };
  }
});
</script>
