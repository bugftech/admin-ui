<template>
  <AppLabel>单位</AppLabel>
  <v-select
    variant="solo-filled"
    flat
    hide-details
    density="compact"
    v-model="unit"
    :items="packageOptions"
  >
  </v-select>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: String,
});

const unit = ref(props.modelValue);
// 监听 props 的变化，同步更新内部的 items
watchEffect(() => {
  unit.value = props.modelValue;
});

const packageOptions = ["件", "包", "箱", "袋", "条", "打"];
</script>
