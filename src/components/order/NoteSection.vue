<template>
  <v-card>
    <v-toolbar color="transparent" density="compact">
      <v-card-title class="text-caption">备注信息</v-card-title>
    </v-toolbar>
    <v-divider />
    <v-card-text>
      <v-row dense>
        <v-col
          cols="12"
          class="d-flex justify-space-between"
          v-for="(item, i) in filtered"
          :key="i"
        >
          <v-label class="text-caption">{{
            item.name
          }}</v-label>
          <div class="text-caption font-weight-medium" style="max-width: 80%">
            {{ item.value }}
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { NoteTranslation } from "@/composables/order";
const props = defineProps({
  note: {
    type: String,
    default: () =>
      "微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣微辣",
  },
});

const filtered = ref([]);

// 优先解析JSON字符串
if (props.note) {
  let parsedObject = "";
  try {
    parsedObject = JSON.parse(props.note);
  } catch (error) {
    // 解析失败，返回原始字符串
    parsedObject = props.note;
  }

  if (typeof parsedObject === "object") {
    // 遍历对象的所有键
    Object.keys(parsedObject).forEach((key) => {
      // 获取键对应的值
      const value = parsedObject[key];
      const translatedKey = NoteTranslation[key];
      // 构建新的对象并放入新数组中
      filtered.value.push({ title: key, name: translatedKey, value: value });
    });
  } else {
    filtered.value.push({ title: "note", name: "备注文本", value: props.note });
  }
}
</script>
